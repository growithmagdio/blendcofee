import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "../data/site";
import { Logo, Wordmark } from "./Brand";
import { Magnetic } from "./ui";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("top");
      const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6 : 600;
      setSolid(y > heroEnd);
      // Tuck the bar away while scrolling down through content, bring it back on scroll up.
      setHidden(y > heroEnd + 200 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = solid && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,transform,border-color,color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
          dark ? "border-b border-espresso/10 bg-cream/90 text-espresso backdrop-blur-md" : "border-b border-transparent bg-transparent text-cream"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-6 md:px-10">
          <a href="#top" aria-label="Blend Coffee & Co. home" className="relative z-10">
            <Wordmark solid={dark} className="h-10 md:h-11" />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-line pb-1 text-[13px] font-medium tracking-[0.06em]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic href={site.orderUrl} external className={`btn hidden !h-11 !px-6 sm:inline-flex ${dark ? "btn-dark" : "btn-cream"}`}>
              Order Online <ArrowUpRight className="h-3.5 w-3.5" />
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-current/25 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-espresso px-6 pb-10 pt-28 text-cream lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo tone="light" className="pointer-events-none absolute -right-10 bottom-24 w-56 rotate-[-8deg] opacity-[0.08]" />
            <ul className="relative space-y-2">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <m.a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="display block py-1 text-6xl"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {n.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <m.div className="mt-auto space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="btn btn-caramel w-full">
                Order Online <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="text-sm text-cream/60">
                {site.address.street}, {site.address.city}, {site.address.region} · {site.phoneDisplay}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
