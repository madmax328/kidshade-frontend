const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kidshade.net";

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

export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    let message = `Erreur API admin (${res.status})`;
    try {
      const data = (await res.json()) as any;
      if (data?.msg) message = data.msg;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
