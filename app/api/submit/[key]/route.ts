import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseSubmission } from "@/lib/submission-parser";
import { sendRelayEmail } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function isJsonRequest(request: Request) {
  const accept = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";
  return contentType.includes("application/json") || accept.includes("application/json");
}

function errorResponse(request: Request, code: string, status: number, redirectTo?: string | null) {
  if (isJsonRequest(request)) {
    return NextResponse.json({ success: false, error: code }, { status, headers: CORS_HEADERS });
  }
  const target = redirectTo
    ? `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}formrelay_error=${code}`
    : `${process.env.APP_URL}/error?code=${code}`;
  return NextResponse.redirect(target, { status: 303 });
}

function originAllowed(request: Request, allowedOrigins: string[]): boolean {
  if (allowedOrigins.length === 0) return true;
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const candidate = origin || (referer ? new URL(referer).origin : null);
  if (!candidate) return false;
  return allowedOrigins.includes(candidate);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  const endpoint = await prisma.endpoint.findUnique({ where: { key } });
  if (!endpoint) {
    return errorResponse(request, "ENDPOINT_NOT_FOUND", 404);
  }

  if (!endpoint.isActive) {
    return errorResponse(request, "ENDPOINT_INACTIVE", 403);
  }

  const parsed = await parseSubmission(request);

  if (Object.keys(parsed.data).length === 0) {
    return errorResponse(request, "VALIDATION_ERROR", 400, parsed.redirect);
  }

  if (!originAllowed(request, endpoint.allowedOrigins)) {
    return errorResponse(request, "ORIGIN_NOT_ALLOWED", 403, parsed.redirect);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const [ipOk, endpointMinuteOk, endpointDayOk] = await Promise.all([
    checkRateLimit(`ip:${ip}`, "minute", 20),
    checkRateLimit(`endpoint:${endpoint.id}`, "minute", endpoint.rateLimitPerMinute),
    checkRateLimit(`endpoint:${endpoint.id}`, "day", endpoint.rateLimitPerDay),
  ]);

  if (!ipOk || !endpointMinuteOk || !endpointDayOk) {
    return errorResponse(request, "RATE_LIMITED", 429, parsed.redirect);
  }

  const isSpam = !!parsed.honeypotValue;

  const submission = await prisma.submission.create({
    data: {
      endpointId: endpoint.id,
      data: parsed.data,
      senderIp: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
      referer: request.headers.get("referer") ?? undefined,
      isSpam,
      spamReason: isSpam ? "honeypot" : undefined,
    },
  });

  let emailSent = false;
  let emailError: string | undefined;

  if (!isSpam) {
    try {
      await sendRelayEmail({
        to: endpoint.destinationEmail,
        endpointName: endpoint.name,
        subject: parsed.subject,
        replyTo: parsed.replyTo,
        data: parsed.data,
      });
      emailSent = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Unknown error";
    }

    await prisma.submission.update({
      where: { id: submission.id },
      data: { emailSent, emailError },
    });
  }

  // Honeypot hits still get a normal success response — never tip off the bot
  if (parsed.isJsonCaller) {
    return NextResponse.json(
      { success: true, submissionId: submission.id, message: "Submission received." },
      { headers: CORS_HEADERS }
    );
  }

  const redirectTarget =
    parsed.redirect || endpoint.redirectUrlDefault || `${process.env.APP_URL}/thanks?submission=${submission.id}`;
  return NextResponse.redirect(redirectTarget, { status: 303 });
}