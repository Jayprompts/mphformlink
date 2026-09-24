import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Something went wrong</CardTitle>
        <CardDescription>{code ? messages[code] ?? "An unknown error occurred." : "An unknown error occurred."}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button render={<Link href="/">Back home</Link>} nativeButton={false} variant="outline" className="w-full" />
      </CardFooter>
    </Card>
  );
}