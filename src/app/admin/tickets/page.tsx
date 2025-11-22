"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { adminFetch, getAdminToken } from "@/lib/adminApi";

interface Ticket {
  _id: string;
  type: "contact" | "bug";
  subject: string;
  status: string;
  createdAt: string;
  name?: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setErrorMsg("Vous devez être connecté en tant qu&apos;admin.");
      return;
    }

    adminFetch<Ticket[]>("/api/admin/tickets")
      .then(setTickets)
      .catch((err) => {
        console.error(err);
        setErrorMsg("Impossible de charger les tickets.");
      });
  }, []);

  return (
    <Shell>
      <Card title="Tickets de support">
        {errorMsg && <p style={{ color: "#b91c1c", fontSize: 13 }}>{errorMsg}</p>}
        {tickets.length ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "6px 4px" }}>Sujet</th>
                <th style={{ padding: "6px 4px" }}>Type</th>
                <th style={{ padding: "6px 4px" }}>Statut</th>
                <th style={{ padding: "6px 4px" }}>Créé</th>
                <th style={{ padding: "6px 4px" }}></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "6px 4px" }}>{t.subject}</td>
                  <td style={{ padding: "6px 4px" }}>{t.type}</td>
                  <td style={{ padding: "6px 4px" }}>{t.status}</td>
                  <td style={{ padding: "6px 4px" }}>
                    {new Date(t.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "6px 4px" }}>
                    <Link href={`/admin/tickets/${t._id}`} style={{ color: "#0ea5e9" }}>
                      Ouvrir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : !errorMsg ? (
          <p style={{ fontSize: 14, color: "#6b7280" }}>Aucun ticket pour le moment.</p>
        ) : null}
      </Card>
    </Shell>
  );
}
