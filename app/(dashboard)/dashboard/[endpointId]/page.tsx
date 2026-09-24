import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";
import { SettingsIcon, InboxIcon } from "lucide-react";

export default async function EndpointDetailPage({
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

  const submitUrl = `${process.env.APP_URL}/api/submit/${endpoint.key}`;

  const htmlSnippet = `<form action="${submitUrl}" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>`;

  const fetchSnippet = `fetch("${submitUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{endpoint.name}</h1>
            <Badge variant={endpoint.isActive ? "default" : "secondary"}>
              {endpoint.isActive ? "Active" : "Pending"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{endpoint.destinationEmail}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link href={`/dashboard/${endpoint.id}/submissions`}>
                <InboxIcon />
                Submissions
              </Link>
            }
          />
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link href={`/dashboard/${endpoint.id}/settings`}>
                <SettingsIcon />
                Settings
              </Link>
            }
          />
        </div>
      </div>

      {!endpoint.isActive && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="py-4 text-sm text-amber-600 dark:text-amber-400">
            This endpoint won&apos;t relay submissions until the destination email is verified — check that inbox for the link.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Embed snippet</CardTitle>
          <CardDescription>Paste this into your static site&apos;s HTML.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="html">
            <TabsList>
              <TabsTrigger value="html">HTML form</TabsTrigger>
              <TabsTrigger value="fetch">fetch()</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="relative">
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>{htmlSnippet}</code></pre>
              <CopyButton text={htmlSnippet} className="absolute top-2 right-2" />
            </TabsContent>
            <TabsContent value="fetch" className="relative">
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>{fetchSnippet}</code></pre>
              <CopyButton text={fetchSnippet} className="absolute top-2 right-2" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}