import Link from "next/link";
import { Compass, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-fjord-900 text-fjord-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-white"
          >
            <Compass className="size-6 text-fjord-300" aria-hidden />
            {SITE.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {SITE.description} Small groups, local guides and seats you can see
            before you book.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Account</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/login" className="hover:text-white">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-white">
                Create an account
              </Link>
            </li>
            <li>
              <Link href="/account/bookings" className="hover:text-white">
                My bookings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-fjord-300"
                aria-hidden
              />
              {SITE.address}
            </li>
            <li className="flex gap-2">
              <Phone
                className="mt-0.5 size-4 shrink-0 text-fjord-300"
                aria-hidden
              />
              {SITE.phone}
            </li>
            <li className="flex gap-2">
              <Mail
                className="mt-0.5 size-4 shrink-0 text-fjord-300"
                aria-hidden
              />
              {SITE.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
