import { Logo } from "@/components/logo";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <Link href="/"><Logo /></Link>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">1. Who this applies to</h2>
          <p className="text-muted-foreground">
            This policy covers two groups: (a) people who create an MPHFormLink account (&quot;account holders&quot;), and
            (b) people who submit a form on someone else&apos;s website that happens to be relayed through MPHFormLink
            (&quot;submitters&quot;). Submitters never sign up for or interact with MPHFormLink directly — their data
            passes through our service because an account holder embedded our endpoint on their own site.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. What we collect</h2>
          <p className="text-muted-foreground">For account holders:</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Name and email address (provided directly, or via Google Sign-In)</li>
            <li>A securely hashed password, if you sign up with email/password (we never store your plain-text password)</li>
            <li>The endpoints you create: name, destination email address, and configuration settings</li>
          </ul>
          <p className="mt-2 text-muted-foreground">For submitters (people filling out a form on an account holder&apos;s site):</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Whatever fields the form itself collects (commonly name, email, and a message)</li>
            <li>IP address, user agent, and referring page — collected for spam and abuse prevention</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. How we use it</h2>
          <p className="text-muted-foreground">
            Submitted form data is relayed by email to the destination address the account holder configured, and is
            also stored so the account holder can view submission history in their dashboard. Account data is used to
            authenticate you, operate your endpoints, and communicate with you about your account. We do not sell
            personal data to third parties, and we do not use submission content for advertising.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. Third parties involved</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li><strong>Google</strong> — if you sign in with Google, we receive your name, email, and profile info per Google&apos;s OAuth flow</li>
            <li><strong>Email delivery</strong> — outbound relay emails and verification emails are sent through a Gmail account we control</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Data retention and deletion</h2>
          <p className="text-muted-foreground">
            We retain account and submission data for as long as your account is active. To request deletion of your
            account or any data associated with it, contact us at the email below — we do not currently offer
            automated self-service deletion.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">6. Security</h2>
          <p className="text-muted-foreground">
            Passwords are hashed, not stored in plain text. Traffic to the service is encrypted (HTTPS). We apply
            rate-limiting and automated spam detection to submissions, but no system is perfectly secure — please
            don&apos;t submit sensitive information (passwords, financial details, government ID numbers) through
            any form relayed by this service.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">7. Contact</h2>
          <p className="text-muted-foreground">
            Questions about this policy, or requests regarding your data, can be sent to{" "}
            <a href="mailto:jayspromptworkshop@gmail.com" className="text-primary hover:underline">jayspromptworkshop@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
