
import api from "@/lib/api";
import type { AuthEnvelope,User } from "../types/api";

export async function login(email:string,password:string) {
    const res = await api.post<AuthEnvelope>("/auth/login",{email,password});
          return {
    token: res.data.token,
    user: res.data.data.user,
    }
}

export async function signup(name: string, email: string, password: string) {
  const res = await api.post<AuthEnvelope>("/auth/signup", {
    name,
    email,
    password,
  });
  return { token: res.data.token, user: res.data.data.user };
}

export async function getMe() {
  const res = await api.get<{ data: { user: User } }>("/user/me");
  return res.data.data.user;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const res = await api.patch<AuthEnvelope>("/user/me/password", {
    currentPassword,
    newPassword,
  });
  return res.data.token;
}