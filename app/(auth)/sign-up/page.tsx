"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      if (data.error === "EMAIL_IN_USE") {
        setError("An account with this email already exists.");
      } else if (data.error === "VALIDATION_ERROR") {
        setError("Please check your name, email, and password.");
      } else {
        setError("Something went wrong. Try again.");
      }
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Check your email</h1>
        <p>We sent a verification link to {email}. Click it to activate your account.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}