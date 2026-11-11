import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata = { title: "Sign up" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <AuthShell title="Create your account" text="It takes less than a minute.">
      <AuthForm mode="signup" next={next || "/"} />
    </AuthShell>
  );
}
