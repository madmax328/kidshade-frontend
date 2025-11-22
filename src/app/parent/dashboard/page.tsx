"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { apiFetch } from "@/lib/api";

interface Child {
  _id: string;
  name: string;
}

interface DashboardData {
  parent: {
    name: string;
    email: string;
  };
  children: Child[];
}

export default function ParentDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("parentToken") : null;
    if (!token) {
      router.push("/parent/login");
      return;
    }

    apiFetch<DashboardData>("/api/parents/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setData)
      .catch((err) => {
        console.error(err);
        setErrorMsg("Impossible de charger le tableau de bord.");
      });
  }, [router]);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("parentToken");
      localStorage.removeItem("parentName");
    }
    router.push("/parent/login");
  }

  return (
    <Shell>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24 }}>Tableau de bord parent</h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
              Vue d&apos;ensemble de vos enfants et de votre abonnement.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              padding: "8px 14px",
              backgroundColor: "#fff",
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Se déconnecter
          </button>
        </div>

        {errorMsg && <p style={{ color: "#b91c1c", fontSize: 13 }}>{errorMsg}</p>}

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 16 }}>
          <Card title="Mes enfants">
            {data?.children?.length ? (
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
                {data.children.map((child) => (
                  <li key={child._id}>{child.name}</li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: 14, color: "#6b7280" }}>Aucun enfant lié pour le moment.</p>
            )}
          </Card>

          <Card title="Abonnement">
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
              Gère ton offre KidShade et tes options.
            </p>
            <button
              onClick={() => router.push("/parent/subscription")}
              style={{
                borderRadius: 999,
                border: "none",
                padding: "10px 16px",
                backgroundColor: "#0ea5e9",
                color: "white",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              Voir les offres
            </button>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
