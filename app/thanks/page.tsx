import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ submission?: string }>;
}) {
  const { submission } = await searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thanks!</CardTitle>
        <CardDescription>Your submission was received{submission ? ` (ref: ${submission})` : ""}.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button render={<Link href="/">Back home</Link>} nativeButton={false} variant="outline" className="w-full" />
      </CardFooter>
    </Card>
  );
}