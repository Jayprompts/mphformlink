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
          <h2 className="text-xl font-semibold">1. Overview</h2>
          <p className="text-muted-foreground">
            MPH Form Relay (&quot;we,&quot; &quot;us,&quot; the &quot;Service&quot;) is a self-hosted contact-form
            relay: account holders create &quot;endpoints&quot; and embed a snippet on their own website, and
            submissions to that form are relayed by email and stored so the account holder can review them. This
            policy explains what data we collect, why, how it&apos;s used, and the choices available to you.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. Who this applies to</h2>
          <p className="text-muted-foreground">
            This policy covers two groups: (a) people who create an MPH Form Relay account (&quot;account
            holders&quot;), and (b) people who submit a form on someone else&apos;s website that happens to be
            relayed through MPH Form Relay (&quot;submitters&quot;). Submitters never sign up for or interact with
            MPH Form Relay directly — their data passes through our service because an account holder embedded our
            endpoint on their own site. Account holders are responsible for informing their own site&apos;s visitors
            that a third-party service processes form submissions.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. What we collect</h2>
          <p className="text-muted-foreground">For account holders, we collect:</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Name and email address, either entered directly at signup or provided by Google when you sign in with Google</li>
            <li>A securely hashed password, if you sign up with email/password (we never store or have access to your plain-text password)</li>
            <li>Email verification status and timestamps</li>
            <li>The endpoints you create: name, destination email address, configuration settings (allowed origins, rate limits, spam-protection settings), and creation/update timestamps</li>
            <li>Basic technical logs (login timestamps, IP address at signup) used for account security and abuse prevention</li>
          </ul>
          <p className="mt-2 text-muted-foreground">For submitters (people filling out a form on an account holder&apos;s site), we collect:</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Whatever fields the form itself asks for (commonly name, email, and a message — determined entirely by the account holder&apos;s form, not by us)</li>
            <li>IP address, user agent, and referring page URL, collected automatically on every submission for spam and abuse prevention</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. How we use it</h2>
          <p className="text-muted-foreground">
            Submitted form data is relayed by email to the destination address the account holder configured, and is
            also stored so the account holder can view submission history in their dashboard. Account data is used to
            authenticate you, operate your endpoints, secure your account, prevent abuse of the Service, and
            communicate with you about your account (for example, email verification and security notices). We do
            not sell personal data to third parties, we do not use submission content or account data for
            advertising, and we do not use the data for any purpose beyond operating and improving the Service.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Use of Google user data</h2>
          <p className="text-muted-foreground">
            If you choose to sign in with Google, we request only the minimal OAuth scopes needed for
            authentication: your name, email address, and basic profile information (<code>openid</code>,{" "}
            <code>email</code>, <code>profile</code>). We do not request access to your Gmail, Google Drive,
            Contacts, Calendar, or any other Google service or data beyond basic sign-in identity. Google user data
            obtained through this Service is used solely to create and authenticate your account — it is never
            sold, never used for advertising, never shared with third parties for their own purposes, and never
            read or used by any human at MPH Form Relay except as strictly necessary to provide customer support you
            request, to maintain the security and proper functioning of the Service, or to comply with applicable
            law. Our use and transfer of information received from Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">6. Cookies and sessions</h2>
          <p className="text-muted-foreground">
            We use a single first-party session cookie to keep you signed in. It is strictly functional — we do not
            use tracking, advertising, or third-party analytics cookies on this Service.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">7. Third parties involved</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li><strong>Google</strong> — if you sign in with Google, used only as described in Section 5</li>
            <li><strong>Email delivery</strong> — outbound relay emails, verification emails, and notifications are sent through a Gmail account we control, solely to deliver the email itself</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            We do not use any third-party analytics, advertising, or tracking services on this Service.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">8. Data retention and deletion</h2>
          <p className="text-muted-foreground">
            We retain account and submission data for as long as your account is active, or as needed to provide the
            Service to you. To request deletion of your account or any data associated with it, contact us at the
            email below — we will delete or anonymize your data within a reasonable time, except where we&apos;re
            required to retain it to comply with legal obligations. We do not currently offer automated self-service
            deletion.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">9. Your rights</h2>
          <p className="text-muted-foreground">
            Depending on where you live, you may have the right to access, correct, export, or delete your personal
            data, and to object to or restrict certain processing. To exercise any of these rights, contact us at
            the email below and we will respond within a reasonable time.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">10. Security</h2>
          <p className="text-muted-foreground">
            Passwords are hashed, never stored in plain text. All traffic to the Service is encrypted in transit
            (HTTPS). We apply rate-limiting and automated spam detection to submissions. No system is perfectly
            secure, however — please don&apos;t submit sensitive information (passwords, financial details,
            government ID numbers) through any form relayed by this Service.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">11. Children&apos;s privacy</h2>
          <p className="text-muted-foreground">
            This Service is not directed at children under 13, and we do not knowingly collect personal data from
            children under 13. If you believe a child has provided us with personal data, contact us and we will
            delete it.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">12. Changes to this policy</h2>
          <p className="text-muted-foreground">
            We may update this policy from time to time. Material changes will be reflected by updating the &quot;Last
            updated&quot; date at the top of this page.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">13. Contact</h2>
          <p className="text-muted-foreground">
            Questions about this policy, or requests regarding your data, can be sent to{" "}
            <a href="mailto:jayspromptworkshop@gmail.com" className="text-primary hover:underline">jayspromptworkshop@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
