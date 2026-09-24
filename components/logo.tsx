import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold tracking-tight ${className ?? ""}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
        M
      </span>
      <span>MPHFormLink</span>
    </Link>
  );
}