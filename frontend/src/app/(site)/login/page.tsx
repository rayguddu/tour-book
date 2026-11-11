import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <AuthShell
      title="Welcome back"
      text="Log in to book tours and manage your trips."
    >
      <AuthForm mode="login" next={next || "/"} />
    </AuthShell>
  );
}
