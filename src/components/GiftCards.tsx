import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { Magnetic, ParallaxImage, Rise, SplitReveal } from "./ui";

/** A gift card that tilts toward the cursor with a moving sheen. */
function TiltCard() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 150, damping: 18 });
  const sheen = useTransform(mx, [0, 1], ["0%", "100%"]);
  return (
    <div
      className="[perspective:1200px]"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <m.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.586] w-full max-w-[440px] overflow-hidden rounded-[18px] bg-[radial-gradient(120%_140%_at_0%_0%,#3a2a22_0%,#211713_55%,#160e0b_100%)] p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-caramel/30"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cream/12 to-transparent"
          style={{ left: sheen, x: "-50%" }}
        />
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <img src="brand/logo-light.svg" alt="Blend Coffee & Co." width={440} height={400} className="-ml-2 -mt-3 w-[42%] max-w-[150px]" />
            <span className="eyebrow text-cream/50">Gift Card</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-display text-lg italic text-cream/80 md:text-xl">Your happy place, freshly brewed.</p>
            <span className="h-9 w-12 rounded-md bg-gradient-to-br from-[#d8b58c] to-caramel opacity-90" />
          </div>
        </div>
      </m.div>
    </div>
  );
}

export default function GiftCards() {
  return (
    <section id="gift" aria-labelledby="gift-title" className="grain relative overflow-hidden bg-espresso px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 lg:order-1">
          <ParallaxImage
            src="img/gift"
            alt="A kraft envelope gift card tied with twine beside a latte"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] w-full rounded-[2px] lg:w-[82%]"
          />
          <div className="absolute -bottom-12 right-0 w-[78%] sm:w-[60%] lg:-right-10 lg:bottom-16 lg:w-[62%]">
            <TiltCard />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Rise>
            <p className="eyebrow text-caramel">Gift Cards</p>
          </Rise>
          <SplitReveal text="Give someone their happy place." italic={["happy", "place"]} className="display mt-6 text-[3.3rem] sm:text-7xl md:text-[5.8rem]" />
          <Rise delay={0.1}>
            <p className="lede mt-8 max-w-md text-cream/65">
              For birthdays, thank-yous and the friend who runs on lattes. Buy a Blend gift card online and let them choose their own perfect cup.
            </p>
          </Rise>
          <Rise delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Magnetic href={site.giftUrl} external className="btn btn-caramel">
              Buy a Gift Card <ArrowUpRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic href={site.orderUrl} external className="btn btn-line-light">
              Order Online
            </Magnetic>
          </Rise>
        </div>
      </div>
    </section>
  );
}
