import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { createVerificationToken } from "@/lib/tokens";
import { sendEndpointVerificationEmail } from "@/lib/mailer";

const updateEndpointSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  destinationEmail: z.string().email().optional(),
});

async function getOwnedEndpoint(endpointId: string, userId: string) {
  const endpoint = await prisma.endpoint.findUnique({ where: { id: endpointId } });
  if (!endpoint || endpoint.ownerId !== userId) return null;
  return endpoint;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { endpointId } = await params;
  const endpoint = await getOwnedEndpoint(endpointId, session.user.id);
  if (!endpoint) {
    return NextResponse.json({ success: false, error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({ success: true, endpoint });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { endpointId } = await params;
  const existing = await getOwnedEndpoint(endpointId, session.user.id);
  if (!existing) {
    return NextResponse.json({ success: false, error: "NOT_FOUND" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "INVALID_BODY" }, { status: 400 });
  }

  const parsed = updateEndpointSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, destinationEmail } = parsed.data;
  const emailChanged = destinationEmail && destinationEmail !== existing.destinationEmail;

  const updated = await prisma.endpoint.update({
    where: { id: endpointId },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(emailChanged
        ? {
            destinationEmail,
            destinationVerified: false,
            destinationVerifiedAt: null,
            isActive: false,
          }
        : {}),
    },
  });

  if (emailChanged) {
    const token = await createVerificationToken(destinationEmail!);
    const verifyUrl = `${process.env.APP_URL}/api/endpoints/${endpointId}/verify-destination?token=${token}`;
    await sendEndpointVerificationEmail(destinationEmail!, updated.name, verifyUrl);
  }

  return NextResponse.json({ success: true, endpoint: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { endpointId } = await params;
  const existing = await getOwnedEndpoint(endpointId, session.user.id);
  if (!existing) {
    return NextResponse.json({ success: false, error: "NOT_FOUND" }, { status: 404 });
  }

  await prisma.endpoint.delete({ where: { id: endpointId } });

  return NextResponse.json({ success: true });
}