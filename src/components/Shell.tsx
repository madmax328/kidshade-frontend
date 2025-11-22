import type { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export function Shell({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          backgroundColor: "#0f172a",
          color: "#e5e7eb"
        }}
      >
        <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>
          KidShade
        </Link>
        <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
          <Link href="/parent/login">Espace parent</Link>
          <Link href="/admin/login">Admin</Link>
        </nav>
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: 24
        }}
      >
        <div style={{ width: "100%", maxWidth: 960 }}>{children}</div>
      </main>
      <footer
        style={{
          padding: 16,
          textAlign: "center",
          fontSize: 12,
          color: "#6b7280"
        }}
      >
        © {new Date().getFullYear()} KidShade
      </footer>
    </div>
  );
}
