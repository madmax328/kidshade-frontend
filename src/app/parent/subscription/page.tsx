"use client";

import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";

export default function SubscriptionPage() {
  return (
    <Shell>
      <Card title="Offres KidShade">
        <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 16 }}>
          Compare l&apos;offre gratuite et l&apos;abonnement Premium.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              padding: 16
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 16 }}>Gratuit</h3>
            <p style={{ fontSize: 13, color: "#6b7280" }}>Suivi de base pour une famille.</p>
            <p style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>0 €/mois</p>
          </div>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid #0ea5e9",
              padding: 16,
              backgroundColor: "#f0f9ff"
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 16 }}>Premium</h3>
            <p style={{ fontSize: 13, color: "#0f172a" }}>Localisation illimitée, historique prolongé, support prioritaire…</p>
            <p style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>4,99 €/mois</p>
          </div>
        </div>
      </Card>
    </Shell>
  );
}
