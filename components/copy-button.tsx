"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button type="button" variant="outline" size="icon-sm" className={cn(className)} onClick={handleCopy}>
      {copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
    </Button>
  );
}