import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createVerificationToken(identifier: string) {
  const token = generateToken();
  const expires = new Date(Date.now() + TOKEN_TTL_MS);

  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  });

  return token;
}

export async function consumeVerificationToken(token: string) {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) return null;

  await prisma.verificationToken.delete({ where: { token } });

  if (record.expires < new Date()) return null;

  return record; // { identifier, token, expires }
}