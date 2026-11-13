import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { menu, site } from "../data/site";
import { Magnetic, Rise, SplitReveal } from "./ui";

export default function MenuSection() {
  const reduce = useReducedMotion();
  return (
    <section id="menu" aria-labelledby="menu-title" className="grain relative overflow-hidden bg-espresso px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Rise>
              <p className="eyebrow text-caramel">The Menu</p>
            </Rise>
            <SplitReveal text="Poured with intention." italic={["intention"]} className="display mt-6 text-[3.3rem] sm:text-7xl md:text-[6.5rem]" />
          </div>
          <Rise delay={0.1} className="max-w-sm">
            <p className="lede text-cream/65">
              Coffee, espresso, our own signature drinks and food to go with them. Every recipe developed in-house by the Blend team.
            </p>
          </Rise>
        </div>

        <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-0 md:mt-24 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
          {menu.map((item, i) => (
            <m.li
              key={item.title}
              className={`w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-auto ${i % 2 === 1 ? "xl:mt-20" : ""}`}
              initial={{ opacity: 0, y: reduce ? 0 : 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${item.title}: order online`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-espresso-2">
                  <img
                    src={`${item.img}.webp`}
                    srcSet={`${item.img}-sm.webp 720w, ${item.img}.webp 896w`}
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 78vw"
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="absolute left-5 top-5 font-display text-lg italic text-cream/80">{item.no}</span>
                  <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-cream text-espresso opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-cream/15 pb-5">
                  <h3 className="display text-[2.1rem] transition-colors duration-500 group-hover:text-caramel">{item.title}</h3>
                </div>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-cream/60">{item.copy}</p>
              </a>
            </m.li>
          ))}
        </ul>

        <Rise className="mt-20 flex flex-col items-start gap-6 border-t border-cream/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="display text-3xl md:text-4xl">
            See today’s full menu <span className="italic text-caramel">and order ahead.</span>
          </p>
          <Magnetic href={site.orderUrl} external className="btn btn-caramel">
            View Menu & Order <ArrowUpRight className="h-4 w-4" />
          </Magnetic>
        </Rise>
      </div>
    </section>
  );
}
