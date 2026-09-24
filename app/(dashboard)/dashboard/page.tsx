import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const endpoints = await prisma.endpoint.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Endpoints</h1>
          <p className="text-sm text-muted-foreground">Manage where your form submissions get relayed.</p>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link href="/dashboard/new">
              <PlusIcon />
              New Endpoint
            </Link>
          }
        />
      </div>

      {endpoints.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm text-muted-foreground">No endpoints yet.</p>
            <Button render={<Link href="/dashboard/new">Create your first endpoint</Link>} nativeButton={false} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {endpoints.map((ep) => (
            <Link key={ep.id} href={`/dashboard/${ep.id}`}>
              <Card className="transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="truncate">{ep.name}</CardTitle>
                    <Badge variant={ep.isActive ? "default" : "secondary"}>
                      {ep.isActive ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  <CardDescription className="truncate">{ep.destinationEmail}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}