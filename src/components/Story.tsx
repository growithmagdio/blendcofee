import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { site } from "../data/site";
import { ParallaxImage, Rise, SplitReveal } from "./ui";

/** The roundel logo as a stamp that turns slowly as you scroll past. */
function Stamp({ className = "" }: { className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!el.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.fromTo(el.current, { rotate: -18 }, { rotate: 14, ease: "none", scrollTrigger: { trigger: el.current, start: "top bottom", end: "bottom top", scrub: true } });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
  return (
    <div ref={el} className={`grid aspect-square place-items-center rounded-full bg-cream p-3 shadow-[0_20px_50px_-25px_rgba(33,23,19,0.5)] ${className}`}>
      <img src="brand/logo-dark.svg" alt="" aria-hidden width={440} height={400} loading="lazy" className="w-full" />
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-cream px-6 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1320px]">
        <Rise>
          <p className="eyebrow text-coffee">Our Story · Est. {site.established}</p>
        </Rise>
        <SplitReveal
          text="Made for your everyday pause."
          italic={["everyday", "pause"]}
          className="display mt-6 max-w-[14ch] text-[3.3rem] text-espresso sm:text-7xl md:text-[7.5rem]"
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 md:pt-24">
            <Rise>
              <p className="display text-3xl leading-[1.15] text-espresso md:text-[2.6rem]">
                Blend opened its doors in {site.established}, but it was a dream years in the making.
              </p>
            </Rise>
            <Rise delay={0.1}>
              <p className="lede mt-8 text-espresso/70">
                Sally, the visionary behind Blend, wanted a great coffee spot in Douglas for years. After waiting around fifteen of them, she decided to build it herself, with her husband Steve bringing his business and construction know-how.
              </p>
              <p className="lede mt-5 text-espresso/70">
                The space is full of hidden beauty: materials rescued from auctions, Craigslist and junkyards, given a second life as your favourite corner of town.
              </p>
            </Rise>
            <Rise delay={0.2}>
              <blockquote className="mt-12 border-l border-caramel pl-6">
                <p className="display text-2xl italic leading-snug text-coffee md:text-3xl">
                  “We hire people lovers and repurpose them into coffee experts.”
                </p>
              </blockquote>
            </Rise>
            <Rise delay={0.25}>
              <dl className="mt-14 grid grid-cols-3 border-t border-espresso/15 pt-8">
                {[
                  ["Since", String(site.established)],
                  ["Home", "Douglas, WY"],
                  ["Pouring", site.coffee],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-espresso/65">{k}</dt>
                    <dd className="display mt-2 text-2xl text-espresso md:text-3xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>

          <div className="relative md:col-span-6 md:col-start-7">
            <ParallaxImage
              src="img/intro"
              alt="Inside Blend: a reclaimed-wood counter and a barista steaming milk in morning light"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2px]"
            />
            <div className="absolute -bottom-10 -left-6 hidden w-[42%] md:block lg:-left-16">
              <ParallaxImage
                src="img/exp-pour"
                alt="A barista pouring latte art"
                sizes="20vw"
                strength={16}
                className="aspect-[3/4] w-full border-[10px] border-cream"
              />
            </div>
            <Stamp className="absolute -right-2 -top-12 w-32 md:-right-4 md:-top-16 md:w-40 xl:-right-8 xl:w-44" />
          </div>
        </div>
      </div>
    </section>
  );
}
