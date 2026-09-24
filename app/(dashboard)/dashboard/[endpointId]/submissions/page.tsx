import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ endpointId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { endpointId } = await params;

  const endpoint = await prisma.endpoint.findUnique({ where: { id: endpointId } });
  if (!endpoint || endpoint.ownerId !== session.user.id) {
    notFound();
  }

  const submissions = await prisma.submission.findMany({
    where: { endpointId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  function statusFor(s: (typeof submissions)[number]) {
    if (s.isSpam) return { label: `Spam (${s.spamReason})`, variant: "destructive" as const };
    if (s.emailSent) return { label: "Sent", variant: "default" as const };
    if (s.emailError) return { label: "Failed", variant: "destructive" as const };
    return { label: "Pending", variant: "secondary" as const };
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Submissions</h1>
        <p className="text-sm text-muted-foreground">{endpoint.name}</p>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">No submissions yet.</CardContent>
        </Card>
      ) : (
        <>
          <Card className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => {
                  const status = statusFor(s);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="whitespace-nowrap align-top text-sm text-muted-foreground">
                        {s.createdAt.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(s.data, null, 2)}</pre>
                      </TableCell>
                      <TableCell className="align-top">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>

          <div className="flex flex-col gap-3 md:hidden">
            {submissions.map((s) => {
              const status = statusFor(s);
              return (
                <Card key={s.id}>
                  <CardContent className="flex flex-col gap-2 py-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{s.createdAt.toLocaleString()}</span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(s.data, null, 2)}</pre>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}