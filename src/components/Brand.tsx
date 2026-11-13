/** The Blend Coffee & Co. logo, drawn as vector files in /public/brand. */
const WORD_RATIO = 2.463; // compact wordmark width / height

/** Compact wordmark for the nav. Pass `solid` to cross-fade from the light to the dark version. */
export function Wordmark({ solid = false, className = "h-11" }: { solid?: boolean; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: WORD_RATIO }}>
      <img
        src="brand/wordmark-light.svg"
        alt="Blend Coffee & Co."
        fetchPriority="high"
        width={108}
        height={44}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${solid ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src="brand/wordmark-dark.svg"
        alt=""
        aria-hidden
        width={108}
        height={44}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${solid ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

/** Full roundel logo with the coffee ring and "mixing life with coffee". */
export function Logo({ tone = "light", className = "w-56" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={`brand/logo-${tone}.svg`}
      alt="Blend Coffee & Co. — mixing life with coffee"
      width={440}
      height={400}
      loading="lazy"
      decoding="async"
      className={`h-auto ${className}`}
    />
  );
}

const paths = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8zm5.4-9.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  facebook:
    "M13.5 21.9v-7.4H16l.4-2.9h-2.9V9.8c0-.8.2-1.4 1.4-1.4h1.6V5.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H7.8v2.9h2.6v7.4c.5.1 1 .1 1.6.1s1 0 1.5-.2z",
  tiktok:
    "M16.6 2h-3.2v13.2a2.8 2.8 0 1 1-2-2.7V9.2a6 6 0 1 0 5.2 5.9V8.4a7.6 7.6 0 0 0 4.4 1.4V6.6a4.4 4.4 0 0 1-4.4-4.6z",
} as const;

export function SocialIcon({ name, className = "h-4 w-4" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}
