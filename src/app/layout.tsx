import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "KidShade",
  description: "KidShade – espace parental & administration"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: "#f3f4f6" }}>
        {children}
      </body>
    </html>
  );
}
