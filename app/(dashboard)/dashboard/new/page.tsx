"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewEndpointPage() {
  const [name, setName] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/endpoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, destinationEmail }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error === "VALIDATION_ERROR" ? "Please check the name and email." : "Something went wrong.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Endpoint created</CardTitle>
          <CardDescription>
            We sent a verification link to {destinationEmail}. The endpoint stays inactive until that&apos;s confirmed.{" "}
            <a href="/dashboard" className="text-primary hover:underline">Back to dashboard</a>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>New Endpoint</CardTitle>
        <CardDescription>Create a relay target for one of your sites.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Portfolio contact form" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="destinationEmail">Destination email</Label>
            <Input id="destinationEmail" type="email" value={destinationEmail} onChange={(e) => setDestinationEmail(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2Icon className="animate-spin" />}
            Create Endpoint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}