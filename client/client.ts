const BASE_URL = "http://localhost:4004";

function postData(url: string, data: any) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function fetcher(url: string, body?: any) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  if (body) headers["Content-Type"] = "application/json";

  const response = await fetch(BASE_URL + url, {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 403) throw new Error("FORBIDDEN");
  return response.json();
}

function assert2xx(response: Response) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`POST failed ${response.status} ${response.statusText}`);
  }
}

export const users = {
  async sendOtp(phone: string) {
    const response = await postData(BASE_URL + "/users/send_code", {
      phone,
    });

    assert2xx(response);
  },
  async enter(phone: string, code: string) {
    const response = await postData(BASE_URL + "/users/enter_user", {
      phone,
      code,
    });

    assert2xx(response);
    return await response.json() as { access_token: string };
  },
  logout() {
    localStorage.clear();
  },
};

export const mentors = {};
