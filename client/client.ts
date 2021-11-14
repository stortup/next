export const BASE_URL = process.env.BASE_URL ?? "http://localhost:4004";

export async function fetcher(url: `/${string}`, body?: any) {
  const accessToken = localStorage.getItem("access_token");
  const headers: Record<string, string> = {};

  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  if (body) headers["Content-Type"] = "application/json";

  const response = await fetch(BASE_URL + url, {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log(url, `${response.status} ${response.statusText}`);

  if (response.status === 401) throw new Error("UNAUTHORIZED");
  if (response.status === 403) throw new Error("FORBIDDEN");
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  // if response body is empty return null

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    return response.json();
  }

  return null;
}

export function logout() {
  localStorage.clear();
}

export async function upload(form: FormData) {
  const accessToken = localStorage.getItem("access_token");
  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const response = await fetch(BASE_URL + "/files/upload", {
    method: "POST",
    headers,
    body: form,
  });

  assertOk(response);

  const body = await response.json();
  return body as { id: string };
}

function assertOk(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
}
