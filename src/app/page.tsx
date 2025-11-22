import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";

export default function HomePage() {
  return (
    <Shell>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.5fr)", gap: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>Protégez vos enfants en ligne avec KidShade</h1>
          <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 24 }}>
            Tableau de bord parent simple, localisation en temps réel et outils de supervision.
          </p>

          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            <Link
              href="/parent/login"
              style={{
                backgroundColor: "#0ea5e9",
                color: "white",
                padding: "12px 20px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15
              }}
            >
              Accéder à l&apos;espace parent
            </Link>
            <Link
              href="/admin/login"
              style={{
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                fontWeight: 500,
                fontSize: 15
              }}
            >
              Espace administrateur
            </Link>
          </div>

          <ul style={{ paddingLeft: 18, color: "#4b5563", fontSize: 14 }}>
            <li>Suivi de position et historique</li>
            <li>Gestion des enfants et de l&apos;abonnement</li>
            <li>Support dédié via centre d&apos;aide</li>
          </ul>
        </div>

        <Card title="Connexion rapide">
          <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 12 }}>
            Déjà inscrit ? Connectez-vous en tant que parent ou administrateur.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/parent/login"
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 12,
                backgroundColor: "#0ea5e9",
                color: "white",
                textAlign: "center",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              Connexion parent
            </Link>
            <Link
              href="/admin/login"
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 12,
                backgroundColor: "#111827",
                color: "white",
                textAlign: "center",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              Connexion admin
            </Link>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
