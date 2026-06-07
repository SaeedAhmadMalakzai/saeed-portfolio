"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/data";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full border-b border-zinc-200 bg-white p-4 shadow-sm">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-zinc-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
