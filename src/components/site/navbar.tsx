"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-4 md:pt-4">
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300",
          scrolled
            ? "border-ink/10 bg-paper/95 shadow-card backdrop-blur-md"
            : "border-transparent bg-paper/60 backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          aria-label="Rofsan Sir — home"
          className="flex shrink-0 items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand-logo.png"
            alt="Rofsan Sir"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#admission"
            className={cn(
              buttonVariants({ variant: "dark", size: "sm" }),
              "group hidden sm:inline-flex",
            )}
          >
            Book a Free Class
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-3 top-[4.5rem] z-40 rounded-3xl border border-ink/10 bg-paper p-3 shadow-luxe lg:hidden"
          >
            <div className="flex flex-col">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/5"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#admission"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-2")}
              >
                Book a Free Class
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
