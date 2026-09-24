import { prisma } from "@/lib/db";
import { consumeVerificationToken } from "@/lib/tokens";
import Link from "next/link";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Invalid link</h1>
        <p>No verification token was provided.</p>
      </main>
    );
  }

  const record = await consumeVerificationToken(token);

  if (!record) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Link expired or invalid</h1>
        <p>This verification link is no longer valid. Try signing up again, or request a new one.</p>
      </main>
    );
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  return (
    <main style={{ padding: 40 }}>
      <h1>Email verified</h1>
      <p>Your account is now active.</p>
      <p><Link href="/sign-in">Go to sign in</Link></p>
    </main>
  );
}