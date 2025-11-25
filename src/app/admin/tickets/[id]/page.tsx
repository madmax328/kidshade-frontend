// app/admin/tickets/[id]/page.tsx

"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { adminFetch, getAdminToken } from "@/lib/adminApi";

interface Message {
  _id: string;
  sender: "parent" | "support";
  text?: string;
  image?: string;
  createdAt: string;
}

interface TicketDetail {
  _id: string;
  type: "contact" | "bug";
  subject: string;
  name?: string;
  email?: string;
  status: string;
  createdAt: string;
  messages: Message[];
  unreadForAdmin?: boolean;
}

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const ticketId = params?.id;
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [reply, setReply] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token || !ticketId) {
      setErrorMsg("Ticket introuvable ou non autorisé.");
      return;
    }

    adminFetch<TicketDetail>(`/api/admin/tickets/${ticketId}`)
      .then(setTicket)
      .catch((err) => {
        console.error(err);
        setErrorMsg("Impossible de charger le ticket.");
      });
  }, [ticketId]);

  async function handleReply(e: FormEvent) {
    e.preventDefault();
    if (!reply.trim() || !ticketId) return;

    try {
      setSending(true);
      const updated = await adminFetch<TicketDetail>(`/api/admin/tickets/${ticketId}/reply`, {
        method: "POST",
        body: JSON.stringify({ text: reply })
      });
      setTicket(updated);
      setReply("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Impossible d'envoyer la réponse.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Shell>
      <Card title="Détail du ticket">
        {errorMsg && <p style={{ color: "#b91c1c", fontSize: 13 }}>{errorMsg}</p>}
        {ticket ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 14 }}>
              <div>
                <strong>Sujet :</strong> {ticket.subject}
              </div>
              <div>
                <strong>Type :</strong> {ticket.type}
              </div>
              {ticket.email && (
                <div>
                  <strong>Email :</strong> {ticket.email}
                </div>
              )}
              <div>
                <strong>Statut :</strong> {ticket.status}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 15 }}>Messages</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ticket.messages.map((m) => {
                  const isAdmin = m.sender === "support";
                  return (
                    <div
                      key={m._id}
                      style={{
                        alignSelf: isAdmin ? "flex-end" : "flex-start",
                        maxWidth: "75%",
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: isAdmin ? "#0ea5e9" : "#e5e7eb",
                        color: isAdmin ? "white" : "#111827",
                        fontSize: 13
                      }}
                    >
                      <div style={{ marginBottom: 4, opacity: 0.8, fontSize: 11 }}>
                        {isAdmin ? "Admin" : "Utilisateur"} •{" "}
                        {new Date(m.createdAt).toLocaleString("fr-FR")}
                      </div>
                      {m.text && <div>{m.text}</div>}
                      {m.image && (
                        <div style={{ marginTop: 8 }}>
                          {/* Affichage simple de l'image si besoin */}
                          <img
                            src={m.image}
                            alt="Pièce jointe"
                            style={{ maxWidth: "100%", borderRadius: 8 }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleReply}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Répondre à l'utilisateur…"
                style={{
                  minHeight: 80,
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                  padding: 8,
                  fontSize: 13
                }}
              />
              <button
                type="submit"
                disabled={sending || !reply.trim()}
                style={{
                  alignSelf: "flex-end",
                  borderRadius: 999,
                  border: "none",
                  padding: "8px 16px",
                  backgroundColor: sending ? "#9ca3af" : "#0ea5e9",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer"
                }}
              >
                {sending ? "Envoi..." : "Envoyer la réponse"}
              </button>
            </form>
          </div>
        ) : !errorMsg ? (
          <p style={{ fontSize: 14, color: "#6b7280" }}>Chargement du ticket…</p>
        ) : null}
      </Card>
    </Shell>
  );
}
