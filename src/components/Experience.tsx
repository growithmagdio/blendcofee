import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { site } from "../data/site";
import { Rise, SplitReveal } from "./ui";

const shots = [
  { img: "img/exp-friends", alt: "Friends laughing over coffee at a wooden table", cap: "Where life is mixed with coffee.", w: "md:w-[46vw]", ratio: "aspect-[16/10]" },
  { img: "img/exp-pour", alt: "A barista pouring tulip latte art", cap: "People lovers, turned coffee experts.", w: "md:w-[26vw]", ratio: "aspect-[3/4]" },
  { img: "img/exp-corner", alt: "A cozy corner with vintage chairs and a reclaimed-wood wall", cap: "Rescued wood, second lives, slow mornings.", w: "md:w-[28vw]", ratio: "aspect-[3/4]" },
  { img: "img/exp-hands", alt: "Hands holding a warm coffee cup by a frosted window", cap: "Mediocrity is never on the menu.", w: "md:w-[32vw]", ratio: "aspect-square" },
];

function Marquee() {
  const words = ["Your happy place", "Freshly brewed", "Douglas, Wyoming", "Since 2019"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-espresso/10 py-6 md:py-8" aria-hidden>
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((w, i) => (
              <span key={i} className="display flex items-center whitespace-nowrap px-8 text-5xl italic text-espresso/80 md:text-7xl">
                {w}
                <span className="ml-16 h-2 w-2 rounded-full bg-caramel" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      // Each photo drifts slightly inside its frame as the track moves.
      t.querySelectorAll<HTMLElement>("[data-drift]").forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section aria-labelledby="exp-title" className="relative bg-cream">
      <Marquee />
      <div ref={pin} className="overflow-hidden">
        <div ref={track} className="flex flex-col gap-14 px-6 py-24 md:px-10 lg:h-[100svh] lg:w-max lg:flex-row lg:items-center lg:gap-16 lg:py-0 lg:pr-[10vw]">
          <div className="shrink-0 lg:w-[34vw] lg:pl-[2vw]">
            <Rise>
              <p className="eyebrow text-coffee">The Blend Experience</p>
            </Rise>
            <SplitReveal text="Your happy place." italic={["happy"]} className="display mt-6 text-[3.3rem] text-espresso sm:text-7xl md:text-[6.2rem]" />
            <Rise delay={0.1}>
              <p className="lede mt-8 max-w-md text-espresso/70">{site.origin}</p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-espresso/60">
                Our goal is simple: when you walk through the door, you should feel something a little special.
              </p>
            </Rise>
          </div>
          {shots.map((s, i) => (
            <figure key={s.img} className={`w-full shrink-0 ${s.w} ${i % 2 ? "lg:-translate-y-10" : "lg:translate-y-10"}`}>
              <div className={`relative overflow-hidden rounded-[2px] ${s.ratio}`}>
                <img
                  data-drift
                  src={`${s.img}.webp`}
                  srcSet={`${s.img}-sm.webp 720w, ${s.img}.webp 1344w`}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-[1.15] object-cover"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline gap-4">
                <span className="font-display text-sm italic text-coffee">0{i + 1}</span>
                <span className="display text-2xl text-espresso/85 md:text-[1.7rem]">{s.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
