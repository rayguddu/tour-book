import { Loader2 } from "lucide-react";

// A spinner with a short text, shown while data loads.
export default function Loading({ text = "Loading…" }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-muted">
      <Loader2 className="size-5 animate-spin" aria-hidden />
      <span>{text}</span>
    </div>
  );
}
