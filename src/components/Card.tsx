import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        border: "1px solid #e5e7eb"
      }}
    >
      {title && (
        <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 18, fontWeight: 700 }}>{title}</h2>
      )}
      {children}
    </div>
  );
}
