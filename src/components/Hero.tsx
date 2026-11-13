import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "../lib/gsap";
import { site } from "../data/site";
import { Magnetic } from "./ui";

const COUNT = 193; // frames in /public/seq/hero/{d,m}
const SRC = { d: { w: 1280, h: 716 }, m: { w: 572, h: 716 } };
// Where each layer of the exploded latte ends up, as a fraction of the desktop frame.
const CALLOUTS = [
  { y: 0.085, label: "Microfoam" },
  { y: 0.225, label: "Steamed milk" },
  { y: 0.375, label: "Doma espresso" },
  { y: 0.615, label: "Your cup" },
  { y: 0.81, label: "Made by hand" },
];
const STACK_X = 0.79; // right edge of the stack in the desktop frame

const pad = (n: number) => String(n).padStart(4, "0");
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const callouts = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Rebuild the scrubber when the device flips between portrait and landscape.
  const stackedNow = () => typeof window !== "undefined" && (window.innerWidth < 768 || window.innerHeight > window.innerWidth);
  const [stacked, setStacked] = useState(stackedNow);
  useEffect(() => {
    const onResize = () => setStacked(stackedNow());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = section.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const phone = window.innerWidth < 768;
    // Portrait tablets use the stacked phone layout, with the sharper desktop frames.
    const mobile = phone || window.innerHeight > window.innerWidth;
    const set = phone ? "m" : "d";
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    // Phones get every second frame (half the data, still smooth); data-saver gets every fourth.
    const STEP = slow ? 4 : phone ? 2 : 1;
    const src = SRC[set];
    const imgs: (HTMLImageElement | null)[] = new Array(COUNT).fill(null);
    let target = 0;
    let current = 0;
    let drawn = -1;
    let raf = 0;
    let alive = true;

    // Progressive load: a coarse pass first so scrubbing works immediately, then fill the gaps.
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [24, 12, 6, 4, 2, 1].filter((x) => x >= STEP))
      for (let i = 0; i < COUNT; i += step) if (i % STEP === 0 && !seen.has(i)) (seen.add(i), order.push(i));
    if (!seen.has(COUNT - 1)) order.splice(1, 0, COUNT - 1);
    let next = 0;
    const loadNext = () => {
      if (!alive || next >= order.length) return;
      const i = order[next++];
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        imgs[i] = im;
        if (Math.abs(i - Math.round(current)) < 3 || drawn < 0) drawn = -1;
        loadNext();
      };
      im.onerror = loadNext;
      im.src = `seq/hero/${set}/${pad(i + 1)}.webp`;
    };
    for (let k = 0; k < 6; k++) loadNext();

    const nearest = (i: number) => {
      for (let d = 0; d < COUNT; d++) {
        if (imgs[i - d]) return imgs[i - d]!;
        if (imgs[i + d]) return imgs[i + d]!;
      }
      return null;
    };

    // Geometry of the drawn frame, shared with the callout overlay.
    const geo = { x: 0, y: 0, s: 1 };
    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (mobile) {
        // Phone: the frame sits in the upper part of the screen, copy lives underneath.
        const s = Math.max(w / src.w, (h * 0.58) / src.h);
        const focus = set === "m" ? 0.5 : 0.69; // keep the cup centred
        geo.s = s;
        geo.x = Math.min(0, Math.max(w - src.w * s, w / 2 - focus * src.w * s));
        geo.y = Math.max(56, h * 0.07);
      } else {
        // Desktop: cover, but sit the frame below the nav so the top of the stack stays visible.
        const top = Math.max(64, h * 0.08);
        const s = Math.max(w / src.w, (h - top * 0.9) / src.h);
        geo.s = s;
        geo.x = (w - src.w * s) * 0.72;
        geo.y = top;
      }
      drawn = -1;
      // Position the callouts against the exploded stack.
      if (callouts.current && !mobile) {
        const left = geo.x + STACK_X * src.w * geo.s;
        callouts.current.querySelectorAll<HTMLElement>("[data-callout]").forEach((n, k) => {
          n.style.left = `${left}px`;
          n.style.top = `${geo.y + CALLOUTS[k].y * src.h * geo.s}px`;
        });
      }
    };

    const draw = (i: number) => {
      const im = nearest(i);
      if (!im) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = mobile ? "#1a110d" : "#120704";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(im, geo.x, geo.y, src.w * geo.s, src.h * geo.s);
      drawn = i;
    };

    const beats = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]"));
    const applyBeats = (p: number) => {
      for (const b of beats) {
        const [a, z] = (b.dataset.beat ?? "0,1").split(",").map(Number);
        const hold = b.dataset.hold === "1";
        const fade = 0.06;
        let o = Math.min(seg(p, a - fade, a), hold ? 1 : 1 - seg(p, z - fade, z));
        if (a <= 0) o = hold ? 1 : 1 - seg(p, z - fade, z);
        b.style.opacity = String(o);
        b.style.transform = `translate3d(0, ${(1 - o) * (p < a ? 24 : -24)}px, 0)`;
        b.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      if (callouts.current) {
        callouts.current.querySelectorAll<HTMLElement>("[data-callout]").forEach((n, k) => {
          const t = ease(seg(p, 0.74 + k * 0.035, 0.84 + k * 0.035));
          n.style.opacity = String(t);
          n.style.setProperty("--draw", String(t));
        });
      }
    };

    const loop = () => {
      current += (target - current) * (reduce ? 1 : 0.16);
      const i = Math.round(current);
      if (i !== drawn) draw(i);
      raf = requestAnimationFrame(loop);
    };

    layout();
    applyBeats(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Hold the finished stack for the last 12% of the scroll.
        target = Math.min(1, self.progress / 0.88) * (COUNT - 1);
        applyBeats(self.progress);
      },
    });
    raf = requestAnimationFrame(loop);
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reduce, stacked]);

  return (
    <section ref={section} id="top" aria-label="Introduction" className="relative h-[460vh] bg-[#1a110d] md:h-[520vh]">
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 block" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[22vh] bg-gradient-to-b from-[#120704] via-[#120704]/70 to-transparent land:block" />
        {/* Soft darkening so copy always reads */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#1a110d_0%,#1a110d_38%,rgba(26,17,13,0.55)_52%,transparent_68%)] land:bg-none land:bg-gradient-to-r land:from-[#1a110d]/85 land:via-[#1a110d]/25 land:to-transparent" />

        {/* Beat 1: hero copy */}
        <div data-beat="0,0.2" className="absolute inset-x-6 bottom-[9svh] land:inset-x-auto land:bottom-auto land:left-[6vw] land:top-1/2 land:max-w-[40rem] land:-translate-y-1/2">
          <p className="hero-fade eyebrow text-caramel" style={{ animationDelay: "0.1s" }}>
            Specialty coffee · Douglas, Wyoming
          </p>
          <h1 className="display mt-5 text-[3.4rem] text-cream sm:text-7xl land:text-[6.4rem] xl:text-[7.6rem]">
            <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block" style={{ animationDelay: "0.15s" }}>A little more</span></span>
            <span className="block overflow-hidden pb-[0.1em]"><span className="hero-line block italic text-caramel" style={{ animationDelay: "0.28s" }}>than coffee.</span></span>
          </h1>
          <div className="hero-fade" style={{ animationDelay: "0.6s" }}>
            <p className="lede mt-5 max-w-md text-cream/75 land:mt-7">{site.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3 land:mt-10">
              <Magnetic href="#menu" className="btn btn-cream">Explore the Menu</Magnetic>
              <Magnetic href={site.orderUrl} external className="btn btn-line-light">
                Order Online <ArrowUpRight className="h-4 w-4" />
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div data-beat="0,0.08" className="pointer-events-none absolute bottom-7 right-6 hidden items-center gap-3 text-cream/60 land:flex">
          <span className="eyebrow">Scroll to brew</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>

        {/* Beat 2 */}
        <div data-beat="0.28,0.56" className="absolute inset-x-6 bottom-[9svh] land:inset-x-auto land:bottom-auto land:left-[6vw] land:top-1/2 land:max-w-[34rem] land:-translate-y-1/2">
          <p className="eyebrow text-caramel">Every layer, considered</p>
          <h2 className="display mt-5 text-5xl text-cream land:text-7xl">
            Built from <span className="italic text-caramel">scratch,</span> on purpose.
          </h2>
          <p className="lede mt-6 max-w-md text-cream/70">
            Every drink and every bite on our menu was developed by our own team, and every ingredient taste-tested before it made the cut.
          </p>
        </div>

        {/* Beat 3 */}
        <div data-beat="0.64,1" data-hold="1" className="absolute inset-x-6 bottom-[9svh] land:inset-x-auto land:bottom-auto land:left-[6vw] land:top-1/2 land:max-w-[30rem] land:-translate-y-1/2">
          <p className="eyebrow text-caramel">The anatomy of a good day</p>
          <h2 className="display mt-5 text-5xl text-cream land:text-7xl">
            Layer by <span className="italic text-caramel">layer.</span>
          </h2>
          <p className="lede mt-6 max-w-md text-cream/70">
            {site.coffee}, steamed milk, velvet microfoam and a barista who genuinely cares. Mediocrity is never on the menu.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-cream/70 land:hidden">
            {CALLOUTS.slice(0, 4).map((c) => (
              <li key={c.label} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-caramel" />{c.label}</li>
            ))}
          </ul>
        </div>

        {/* Apple-style callouts pinned to the exploded stack (desktop) */}
        <div ref={callouts} className="pointer-events-none absolute inset-0 hidden land:block" aria-hidden>
          {CALLOUTS.map((c) => (
            <div key={c.label} data-callout className="absolute flex -translate-y-1/2 items-center gap-3 opacity-0" style={{ ["--draw" as string]: 0 }}>
              <span className="block h-px w-8 origin-left bg-caramel/70 xl:w-14" style={{ transform: "scaleX(var(--draw))" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.2em] text-cream/85">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
