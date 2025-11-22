const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.kidshade.net";

// Stockage token admin (mémoire + localStorage)
let adminToken: string | null = null;

export function setAdminToken(token: string | null) {
  adminToken = token;

  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("adminToken", token);
    else localStorage.removeItem("adminToken");
  }
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return adminToken;
  return localStorage.getItem("adminToken");
}

/**
 * Fetch API admin sécurisé et typé
 */
export async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();

  // ✅ FIX Typescript : remplacer HeadersInit par un objet strictement typé
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Si l’utilisateur a ajouté des headers dans options, on les ajoute
  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  // Ajout du token admin
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `Erreur API admin (${res.status})`;

    try {
      const data = (await res.json()) as any;
      if (data?.msg) message = data.msg;
    } catch {
      // ignore parse error
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
