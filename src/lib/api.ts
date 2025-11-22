const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kidshade.net";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    let message = `Erreur API (${res.status})`;
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
