import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createEndpointSchema } from "@/lib/validation";
import { createVerificationToken } from "@/lib/tokens";
import { sendEndpointVerificationEmail } from "@/lib/mailer";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const endpoints = await prisma.endpoint.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, endpoints });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "INVALID_BODY" }, { status: 400 });
  }

  const parsed = createEndpointSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, destinationEmail } = parsed.data;

  const endpoint = await prisma.endpoint.create({
    data: { name, destinationEmail, ownerId: session.user.id },
  });

  const token = await createVerificationToken(destinationEmail);
  const verifyUrl = `${process.env.APP_URL}/api/endpoints/${endpoint.id}/verify-destination?token=${token}`;

  await sendEndpointVerificationEmail(destinationEmail, name, verifyUrl);

  return NextResponse.json({ success: true, endpoint });
}