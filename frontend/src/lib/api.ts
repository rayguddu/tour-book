import axios from "axios";

export const TOKEN_KEY = "token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // give up after 10 seconds
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith("/auth");

    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      !isAuthRequest
    ) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Cannot reach the server. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

export default api;