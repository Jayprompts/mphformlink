import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const endpoints = await prisma.endpoint.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Signed in as: {session.user.email}</p>

      <p style={{ marginTop: 24 }}>
        <Link href="/dashboard/new">+ New Endpoint</Link>
      </p>

      {endpoints.length === 0 ? (
        <p>No endpoints yet.</p>
      ) : (
        <ul style={{ marginTop: 16 }}>
          {endpoints.map((ep) => (
            <li key={ep.id} style={{ marginBottom: 8 }}>
              <Link href={`/dashboard/${ep.id}`}>{ep.name}</Link>
              {" — "}
              {ep.isActive ? "active" : "pending verification"}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}