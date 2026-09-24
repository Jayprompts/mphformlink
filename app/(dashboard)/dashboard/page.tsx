import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Signed in as: {session?.user?.email}</p>
    </main>
  );
}