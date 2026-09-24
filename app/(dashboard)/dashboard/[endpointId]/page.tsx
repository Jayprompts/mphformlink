import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EndpointDetailPage({
  params,
}: {
  params: Promise<{ endpointId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { endpointId } = await params;

  const endpoint = await prisma.endpoint.findUnique({
    where: { id: endpointId },
  });

  if (!endpoint || endpoint.ownerId !== session.user.id) {
    notFound();
  }

  const submitUrl = `${process.env.APP_URL}/api/submit/${endpoint.key}`;

  return (
    <main style={{ padding: 40, maxWidth: 700 }}>
      <h1>{endpoint.name}</h1>
      <p>
        Status:{" "}
        {endpoint.isActive
          ? "Active"
          : endpoint.destinationVerified
          ? "Verified but inactive"
          : "Pending destination verification"}
      </p>
      <p>Destination: {endpoint.destinationEmail}</p>

      {!endpoint.isActive && (
        <p style={{ color: "#b45309" }}>
          This endpoint won&apos;t relay submissions until the destination email is verified — check that inbox for the link.
        </p>
      )}

      <h2 style={{ marginTop: 32 }}>Embed snippet</h2>
      <p>Paste this into your static site&apos;s HTML:</p>
      <pre style={{ background: "#f4f4f4", padding: 16, overflowX: "auto" }}>
{`<form action="${submitUrl}" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>`}
      </pre>

      <p>Or via fetch():</p>
      <pre style={{ background: "#f4f4f4", padding: 16, overflowX: "auto" }}>
{`fetch("${submitUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});`}
      </pre>
    </main>
  );
}