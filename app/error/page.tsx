export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  const messages: Record<string, string> = {
    MISSING_TOKEN: "No verification token was provided.",
    TOKEN_INVALID: "This link is invalid or has expired.",
    MISMATCH: "This link doesn't match the endpoint it was issued for.",
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Something went wrong</h1>
      <p>{code ? messages[code] ?? "An unknown error occurred." : "An unknown error occurred."}</p>
    </main>
  );
}