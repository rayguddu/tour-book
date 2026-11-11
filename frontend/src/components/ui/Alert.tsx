import { CircleAlert, CircleCheck } from "lucide-react";

type Props = {
  type?: "error" | "success";
  children?: React.ReactNode;
};

export default function Alert({ type = "error", children }: Props) {
  if (!children) return null;
  const isError = type === "error";
  const Icon = isError ? CircleAlert : CircleCheck;
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
        isError ? "bg-danger-50 text-danger" : "bg-success-50 text-success"
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>{children}</p>
    </div>
  );
}
