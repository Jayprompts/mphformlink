import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className ?? ""}`}>
      <Image
        src="/images/logo-dark.png"
        alt="MPH Form Relay"
        width={1276}
        height={496}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}