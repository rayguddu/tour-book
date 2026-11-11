"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS, SITE } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const close = () => setOpen(false);

  const accountLinks = user ? (
    <>
      {user.role === "admin" && (
        <Link href="/admin" onClick={close} className="hover:text-white">
          Admin
        </Link>
      )}
      <Link
        href="/account/bookings"
        onClick={close}
        className="hover:text-white"
      >
        My bookings
      </Link>
      <Link href="/account" onClick={close} className="hover:text-white">
        {user.name.split(" ")[0]}
      </Link>
      <button
        onClick={() => {
          logout();
          close();
        }}
        className="rounded-full border border-white/30 px-4 py-2 text-white hover:bg-white/10"
      >
        Log out
      </button>
    </>
  ) : (
    <>
      <Link href="/login" onClick={close} className="hover:text-white">
        Log in
      </Link>
      <Link
        href="/signup"
        onClick={close}
        className="rounded-full bg-white px-5 py-2 font-semibold text-fjord-900 hover:bg-fjord-50"
      >
        Sign up
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-fjord-900 text-fjord-100">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-white"
        >
          <Compass className="size-6 text-fjord-300" aria-hidden />
          {SITE.name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 text-sm lg:flex">
          {/* Wait until we know if someone is logged in, so buttons don't flash */}
          {!loading && accountLinks}
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4 text-base">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-lg px-3 py-2.5 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-white/10 px-3 pt-4 text-sm">
              {!loading && accountLinks}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
