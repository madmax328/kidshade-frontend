"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { adminFetch, setAdminToken } from "@/lib/adminApi";

interface AdminLoginResponse {
  token: string;
  admin: {
    _id: string;
    email: string;
  };
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kidshade.net");
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
      const data = await adminFetch<AdminLoginResponse>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      setAdminToken(data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <Card title="Connexion administrateur">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ fontSize: 14 }}>
            E-mail admin
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

          {errorMsg && <p style={{ color: "#b91c1c", fontSize: 13 }}>{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              borderRadius: 999,
              padding: "10px 16px",
              border: "none",
              backgroundColor: loading ? "#9ca3af" : "#0ea5e9",
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
