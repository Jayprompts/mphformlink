"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Endpoint = {
  id: string;
  name: string;
  destinationEmail: string;
  destinationVerified: boolean;
  isActive: boolean;
};

export default function EndpointSettingsPage() {
  const router = useRouter();
  const params = useParams<{ endpointId: string }>();
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [name, setName] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/endpoints/${params.endpointId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.endpoint) {
          setEndpoint(data.endpoint);
          setName(data.endpoint.name);
          setDestinationEmail(data.endpoint.destinationEmail);
        }
      });
  }, [params.endpointId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/endpoints/${params.endpointId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, destinationEmail }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      toast.error("Failed to save changes.");
      return;
    }

    if (endpoint && destinationEmail !== endpoint.destinationEmail) {
      toast.success("Saved. A new verification email was sent since the destination changed — the endpoint is inactive until it's confirmed.");
    } else {
      toast.success("Saved.");
    }
    setEndpoint(data.endpoint);
  }

  async function handleResend() {
    setResending(true);
    const res = await fetch(`/api/endpoints/${params.endpointId}/resend-verification`, { method: "POST" });
    setResending(false);

    if (!res.ok) {
      toast.error("Failed to resend verification email.");
      return;
    }

    toast.success("Verification email resent.");
  }

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/endpoints/${params.endpointId}`, { method: "DELETE" });

    if (!res.ok) {
      setDeleting(false);
      toast.error("Failed to delete endpoint.");
      return;
    }

    router.push("/dashboard");
  }

  if (!endpoint) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="flex max-w-lg flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Update this endpoint&apos;s name and destination.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="destinationEmail">Destination email</Label>
              <Input id="destinationEmail" type="email" value={destinationEmail} onChange={(e) => setDestinationEmail(e.target.value)} required />
            </div>
            <Button type="submit" disabled={saving} className="w-full">
              {saving && <Loader2Icon className="animate-spin" />}
              Save changes
            </Button>
          </form>

          {!endpoint.destinationVerified && (
            <Button variant="outline" className="mt-3 w-full" onClick={handleResend} disabled={resending}>
              {resending && <Loader2Icon className="animate-spin" />}
              Resend verification email
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Deleting an endpoint permanently removes it and all its submissions.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Dialog>
            <DialogTrigger render={<Button variant="destructive"><TrashIcon />Delete endpoint</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this endpoint?</DialogTitle>
                <DialogDescription>
                  This permanently deletes &quot;{endpoint.name}&quot; and every submission it has received. This cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
                  {deleting && <Loader2Icon className="animate-spin" />}
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}