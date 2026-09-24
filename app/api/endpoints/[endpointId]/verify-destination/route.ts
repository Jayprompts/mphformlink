import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { consumeVerificationToken } from "@/lib/tokens";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const { endpointId } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/error?code=MISSING_TOKEN", process.env.APP_URL));
  }

  const record = await consumeVerificationToken(token);
  if (!record) {
    return NextResponse.redirect(new URL("/error?code=TOKEN_INVALID", process.env.APP_URL));
  }

  const endpoint = await prisma.endpoint.findUnique({ where: { id: endpointId } });
  if (!endpoint || endpoint.destinationEmail !== record.identifier) {
    return NextResponse.redirect(new URL("/error?code=MISMATCH", process.env.APP_URL));
  }

  await prisma.endpoint.update({
    where: { id: endpointId },
    data: {
      destinationVerified: true,
      destinationVerifiedAt: new Date(),
      isActive: true,
    },
  });

  return NextResponse.redirect(new URL(`/dashboard/${endpointId}?verified=1`, process.env.APP_URL));
}