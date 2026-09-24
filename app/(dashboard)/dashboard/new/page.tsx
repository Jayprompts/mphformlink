"use client";

import { useState } from "react";

export default function NewEndpointPage() {
  const [name, setName] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/endpoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, destinationEmail }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error === "VALIDATION_ERROR" ? "Please check the name and email." : "Something went wrong.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Endpoint created</h1>
        <p>We sent a verification link to {destinationEmail}. The endpoint stays inactive until that's confirmed.</p>
        <p><a href="/dashboard">Back to dashboard</a></p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>
      <h1>New Endpoint</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Endpoint name (e.g. Portfolio contact form)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Destination email"
          value={destinationEmail}
          onChange={(e) => setDestinationEmail(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Endpoint"}
        </button>
      </form>
    </main>
  );
}