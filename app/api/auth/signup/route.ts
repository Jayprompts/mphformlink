import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { signupSchema } from "@/lib/validation";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { success: false, error: "INVALID_BODY" },
      { status: 400 }
    );
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { success: false, error: "EMAIL_IN_USE" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const token = await createVerificationToken(email);
  const verifyUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  await sendVerificationEmail(email, verifyUrl);

  return NextResponse.json({ success: true });
}