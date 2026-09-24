import { Logo } from "@/components/logo";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <Link href="/"><Logo /></Link>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">1. What this service is</h2>
          <p className="text-muted-foreground">
            MPH Form Relay lets you create endpoints that relay form submissions from your own website to your email
            inbox. By creating an account or using an endpoint, you agree to these terms.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. Acceptable use</h2>
          <p className="text-muted-foreground">You agree not to use this service to:</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Send spam, unsolicited bulk email, or phishing content</li>
            <li>Relay content that is illegal, harassing, or infringes on others&apos; rights</li>
            <li>Attempt to abuse, overload, or circumvent the rate limits and spam protections in place</li>
            <li>Collect sensitive personal data (passwords, payment card numbers, government IDs) through a relayed form</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            We reserve the right to suspend or terminate any endpoint or account that violates these terms, without
            prior notice, if necessary to protect the service or other users.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. Your responsibilities</h2>
          <p className="text-muted-foreground">
            You&apos;re responsible for the forms you embed and the endpoints you create, including complying with
            applicable privacy laws for the people who submit data through them (for example, disclosing to your own
            site&apos;s visitors that submissions are processed by a third-party relay). Keep your account credentials
            confidential — you&apos;re responsible for activity under your account.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. Service availability</h2>
          <p className="text-muted-foreground">
            This service is provided &quot;as is,&quot; without warranty of any kind, express or implied. We do not
            guarantee uninterrupted availability, and we are not liable for lost, delayed, or undelivered submissions,
            or for any damages arising from use of the service, to the maximum extent permitted by law.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Termination</h2>
          <p className="text-muted-foreground">
            You may stop using the service and delete your endpoints at any time. We may suspend or terminate access
            for violations of these terms or the Acceptable Use section above.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">6. Changes to these terms</h2>
          <p className="text-muted-foreground">
            We may update these terms from time to time. Continued use of the service after changes take effect
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">7. Governing law</h2>
          <p className="text-muted-foreground">
            These terms are governed by the laws of Nigeria.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">8. Contact</h2>
          <p className="text-muted-foreground">
            Questions about these terms can be sent to{" "}
            <a href="mailto:jayspromptworkshop@gmail.com" className="text-primary hover:underline">jayspromptworkshop@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
