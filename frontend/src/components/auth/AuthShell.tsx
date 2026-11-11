import { Compass } from "lucide-react";
type Props = { title: string; text: string; children: React.ReactNode };

export default function AuthShell({ title, text, children }: Props) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative isolate hidden overflow-hidden bg-fjord-900 p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <Compass className="size-10 text-fjord-300" aria-hidden />
        <p className="mt-6 max-w-sm font-display text-4xl leading-tight font-bold">
          Every seat counted, every date clear.
        </p>
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-fjord-900">{title}</h1>
          <p className="mt-2 mb-8 text-muted">{text}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
