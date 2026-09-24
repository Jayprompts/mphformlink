import { prisma } from "@/lib/db";

type WindowType = "minute" | "day";

function windowStartFor(type: WindowType, now: Date): Date {
  const d = new Date(now);
  if (type === "minute") {
    d.setSeconds(0, 0);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d;
}

export async function checkRateLimit(
  bucketKey: string,
  windowType: WindowType,
  limit: number
): Promise<boolean> {
  const now = new Date();
  const windowStart = windowStartFor(windowType, now);

  const result = await prisma.rateLimitHit.upsert({
    where: {
      bucketKey_windowType_windowStart: { bucketKey, windowType, windowStart },
    },
    create: { bucketKey, windowType, windowStart, count: 1 },
    update: { count: { increment: 1 } },
  });

  return result.count <= limit;
}