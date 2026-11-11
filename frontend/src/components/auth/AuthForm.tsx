"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { getErrorMessage } from "@/lib/api";

type Props = { mode: "login" | "signup"; next: string };

export default function AuthForm({ mode, next }: Props) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (isSignup && password.length < 8) {
      return setError("Your password needs at least 8 characters.");
    }
    setSubmitting(true);
    try {
      const user = isSignup
        ? await signup(name.trim(), email.trim(), password)
        : await login(email.trim(), password);

      const goTo = next === "/" && user.role === "admin" ? "/admin" : next;
      router.push(goTo);
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  }
  const otherHref = `${isSignup ? "/login" : "/signup"}${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignup && (
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      )}
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        hint={isSignup ? "At least 8 characters" : undefined}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={isSignup ? "new-password" : "current-password"}
        required
      />

      <Alert>{error}</Alert>

      <Button type="submit" loading={submitting} className="w-full">
        {isSignup ? "Create account" : "Log in"}
      </Button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Link
          href={otherHref}
          className="font-semibold text-fjord-700 underline"
        >
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
