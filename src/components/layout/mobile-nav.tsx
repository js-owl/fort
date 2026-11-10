"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navigation } from "@/content/home";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid size-11 cursor-pointer place-items-center"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">
          {open ? "Закрыть меню" : "Открыть меню"}
        </span>
        <span className="flex w-6 flex-col gap-1.5" aria-hidden>
          <span className="h-0.5 bg-white" />
          <span className="h-0.5 bg-white" />
          <span className="h-0.5 bg-white" />
        </span>
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          className="fixed inset-0 z-50 flex flex-col bg-ink px-page py-8"
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="cursor-pointer px-2 py-2 text-xl"
              onClick={() => setOpen(false)}
            >
              Закрыть
            </button>
          </div>
          <ul className="mt-10 flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-2xl font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center justify-center bg-brand px-8 py-5 text-xl font-medium"
            onClick={() => setOpen(false)}
          >
            Связаться с нами
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
