interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function loginRequest(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Login failed');
  }

  return result;
}