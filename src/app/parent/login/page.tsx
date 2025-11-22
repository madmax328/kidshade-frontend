"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { apiFetch } from "@/lib/api";

interface LoginResponse {
  token: string;
  parent: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function ParentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Merci de remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiFetch<LoginResponse>("/api/parents/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("parentToken", data.token);
        localStorage.setItem("parentName", data.parent.name);
      }

      router.push("/parent/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <Card title="Connexion parent">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ fontSize: 14 }}>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                marginTop: 4,
                borderRadius: 8,
                border: "1px solid #d1d5db",
                padding: "8px 10px",
                fontSize: 14
              }}
            />
          </label>

          <label style={{ fontSize: 14 }}>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginTop: 4,
                borderRadius: 8,
                border: "1px solid #d1d5db",
                padding: "8px 10px",
                fontSize: 14
              }}
            />
          </label>

          {errorMsg && (
            <p style={{ color: "#b91c1c", fontSize: 13, marginTop: 4 }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              borderRadius: 999,
              padding: "10px 16px",
              border: "none",
              backgroundColor: loading ? "#7dd3fc" : "#0ea5e9",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </Card>
    </Shell>
  );
}
