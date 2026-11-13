import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { ScrollTrigger, scrollToHash, startSmoothScroll } from "./lib/gsap";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Story from "./components/Story";
import MenuSection from "./components/MenuSection";
import Experience from "./components/Experience";
import Visit from "./components/Visit";
import GiftCards from "./components/GiftCards";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll();
    // Route every in-page link through the smooth scroller.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash.length < 2) return;
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    // Re-measure once fonts and images settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      stop();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#story" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-espresso">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Story />
        <MenuSection />
        <Experience />
        <Visit />
        <GiftCards />
      </main>
      <Footer />
    </LazyMotion>
  );
}
