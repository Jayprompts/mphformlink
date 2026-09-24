import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ServerIcon, ShieldCheckIcon, CodeIcon, MailIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-6 py-4 md:px-10">
        <Logo />
        <nav className="flex items-center gap-3">
          <Button variant="ghost" nativeButton={false} render={<Link href="/sign-in">Sign in</Link>} />
          <Button nativeButton={false} render={<Link href="/sign-up">Sign up</Link>} />
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28">
          <Badge variant="secondary" className="text-xs uppercase tracking-wide">
            Self-hosted form relay
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Contact forms that just work — on infrastructure you own.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-balance">
            Paste one snippet into any static site. We validate, store, and relay every submission straight to your inbox — no vendor lock-in, no monthly fee, no third party reading your data.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/sign-up">Get started free</Link>} />
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/sign-in">Sign in</Link>} />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
          <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Create an endpoint", desc: "Sign up, name it, and set the inbox you want submissions relayed to." },
              { step: "2", title: "Paste the snippet", desc: "Drop a plain HTML form or a fetch() call into your site. No JS framework required." },
              { step: "3", title: "Get emails", desc: "Every submission lands in your inbox and shows up in your dashboard, instantly." },
            ].map((s) => (
              <Card key={s.step}>
                <CardHeader>
                  <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.step}
                  </span>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { icon: ServerIcon, title: "Self-hosted", desc: "Runs on your own infrastructure — your data never touches a third party." },
              { icon: ShieldCheckIcon, title: "No vendor lock-in", desc: "Own the code, own the data. Migrate or self-manage whenever you want." },
              { icon: CodeIcon, title: "Works with plain HTML", desc: "No SDK, no build step. A single <form> or fetch() call is all it takes." },
              { icon: MailIcon, title: "Straight to your inbox", desc: "Submissions relay by email instantly, and stay logged in your dashboard too." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <Logo className="mx-auto mb-3 justify-center" />
        <p>&copy; {new Date().getFullYear()} MPH Form Relay. All rights reserved.</p>
        <p className="mt-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground hover:underline">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}