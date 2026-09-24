import { prisma } from "@/lib/db";
import { consumeVerificationToken } from "@/lib/tokens";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invalid link</CardTitle>
          <CardDescription>No verification token was provided.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const record = await consumeVerificationToken(token);

  if (!record) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Link expired or invalid</CardTitle>
          <CardDescription>This verification link is no longer valid. Try signing up again, or request a new one.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email verified</CardTitle>
        <CardDescription>Your account is now active.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button render={<Link href="/sign-in">Go to sign in</Link>} nativeButton={false} className="w-full" />
      </CardFooter>
    </Card>
  );
}