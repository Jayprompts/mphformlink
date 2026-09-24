import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createVerificationToken } from "@/lib/tokens";
import { sendEndpointVerificationEmail } from "@/lib/mailer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { endpointId } = await params;
  const endpoint = await prisma.endpoint.findUnique({ where: { id: endpointId } });

  if (!endpoint || endpoint.ownerId !== session.user.id) {
    return NextResponse.json({ success: false, error: "NOT_FOUND" }, { status: 404 });
  }

  if (endpoint.destinationVerified) {
    return NextResponse.json({ success: false, error: "ALREADY_VERIFIED" }, { status: 400 });
  }

  const token = await createVerificationToken(endpoint.destinationEmail);
  const verifyUrl = `${process.env.APP_URL}/api/endpoints/${endpointId}/verify-destination?token=${token}`;
  await sendEndpointVerificationEmail(endpoint.destinationEmail, endpoint.name, verifyUrl);

  return NextResponse.json({ success: true });
}