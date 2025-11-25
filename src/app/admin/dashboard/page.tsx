
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { adminFetch, getAdminToken, setAdminToken } from "@/lib/adminApi";

interface Ticket {
  _id: string;
  type: "contact" | "bug";
  subject: string;
  status: string;
  createdAt: string;
  unreadForAdmin?: boolean;
}

interface DashboardData {
  stats: {
    openTickets: number;
    pendingTickets: number;
    unreadTickets: number;
  };
  latestTickets: Ticket[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    adminFetch<DashboardData>("/api/admin/dashboard")
      .then(setData)
      .catch((err) => {
        console.error(err);
        setErrorMsg("Impossible de charger le tableau de bord admin.");
      });
  }, [router]);

  function handleLogout() {
    setAdminToken(null);
    router.push("/admin/login");
  }

  return (
    <Shell>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24 }}>Dashboard administrateur</h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
              Suivi des tickets de support et des bugs.
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
            Déconnexion
          </button>
        </div>

        {errorMsg && <p style={{ color: "#b91c1c", fontSize: 13 }}>{errorMsg}</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
          <Card title="Statistiques">
  <div style={{ display: "flex", gap: 24 }}>
    <div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>Tickets ouverts</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>
        {data?.stats.openTickets ?? "—"}
      </div>
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>En attente</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>
        {data?.stats.pendingTickets ?? "—"}
      </div>
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>Nouveaux messages</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>
        {data?.stats.unreadTickets ?? "—"}
      </div>
    </div>
  </div>
</Card>


          <Card title="Raccourcis">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/admin/tickets" style={{ fontSize: 14, color: "#0ea5e9" }}>
                Gérer les tickets de support →
              </Link>
            </div>
          </Card>
        </div>

        <Card title="Derniers tickets">
          {data?.latestTickets?.length ? (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "6px 4px" }}>Type</th>
                  <th style={{ padding: "6px 4px" }}>Sujet</th>
                  <th style={{ padding: "6px 4px" }}>Statut</th>
                  <th style={{ padding: "6px 4px" }}>Créé</th>
                </tr>
              </thead>
              <tbody>
  {data.latestTickets.map((t) => (
    <tr
      key={t._id}
      style={{
        borderBottom: "1px solid #f3f4f6",
        backgroundColor: t.unreadForAdmin ? "#fee2e2" : "transparent", // 👈 ligne rosée si nouveau
      }}
    >
      <td style={{ padding: "6px 4px" }}>{t.type}</td>
      <td style={{ padding: "6px 4px" }}>{t.subject}</td>
      <td style={{ padding: "6px 4px" }}>
        {t.status}
        {t.unreadForAdmin && (
          <span
            style={{
              marginLeft: 8,
              padding: "2px 6px",
              borderRadius: 999,
              backgroundColor: "#ef4444",
              color: "white",
              fontSize: 11,
            }}
          >
            Nouveau
          </span>
        )}
      </td>
      <td style={{ padding: "6px 4px" }}>
        {new Date(t.createdAt).toLocaleDateString("fr-FR")}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          ) : (
            <p style={{ fontSize: 14, color: "#6b7280" }}>Aucun ticket pour le moment.</p>
          )}
        </Card>
      </div>
    </Shell>
  );
}
