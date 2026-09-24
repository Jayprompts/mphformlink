export interface ParsedSubmission {
  data: Record<string, string>;
  redirect?: string;
  subject?: string;
  replyTo?: string;
  honeypotValue?: string;
  turnstileToken?: string;
  isJsonCaller: boolean;
}

export async function parseSubmission(request: Request): Promise<ParsedSubmission> {
  const contentType = request.headers.get("content-type") || "";
  const accept = request.headers.get("accept") || "";
  const isJsonCaller = contentType.includes("application/json") || accept.includes("application/json");

  let raw: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    raw = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v)]));
  } else if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    raw = Object.fromEntries(Array.from(formData.entries()).map(([k, v]) => [k, String(v)]));
  }

  const data: Record<string, string> = {};
  let redirect: string | undefined;
  let subject: string | undefined;
  let replyTo: string | undefined;
  let honeypotValue: string | undefined;
  let turnstileToken: string | undefined;

  for (const [key, value] of Object.entries(raw)) {
    if (key === "_redirect" || key === "_next") {
      redirect = value;
    } else if (key === "_subject") {
      subject = value;
    } else if (key === "_replyto") {
      replyTo = value;
    } else if (key === "_gotcha") {
      honeypotValue = value;
    } else if (key === "cf-turnstile-response") {
      turnstileToken = value;
    } else {
      data[key] = value;
      if (key === "email" && !replyTo) {
        replyTo = value;
      }
    }
  }

  return { data, redirect, subject, replyTo, honeypotValue, turnstileToken, isJsonCaller };
}