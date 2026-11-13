import { ArrowUpRight } from "lucide-react";
import { nav, site } from "../data/site";
import { Logo, SocialIcon } from "./Brand";
import { Rise } from "./ui";

export default function Footer() {
  const socials = [
    { name: "instagram" as const, ...site.social.instagram },
    { name: "facebook" as const, ...site.social.facebook },
    { name: "tiktok" as const, ...site.social.tiktok },
  ];
  return (
    <footer className="relative bg-[#170f0c] px-6 pb-10 pt-24 text-cream md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <Rise>
          <p className="display max-w-[16ch] text-5xl md:text-[5.5rem]">
            See you <span className="italic text-caramel">for coffee.</span>
          </p>
        </Rise>

        <div className="mt-20 grid gap-12 border-t border-cream/10 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="w-44 md:w-52" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cream/55">
              Specialty coffee, food and atmosphere in Douglas, Wyoming. Proudly pouring {site.coffee}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow text-cream/60">Explore</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line text-cream/80 hover:text-cream">{n.label}</a>
                </li>
              ))}
              <li>
                <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1 text-cream/80 hover:text-cream">
                  Order Online <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cream/60">Contact</p>
            <address className="mt-5 space-y-3 text-[15px] not-italic text-cream/80">
              <p>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.zip}
              </p>
              <p><a href={site.phoneHref} className="link-line">{site.phoneDisplay}</a></p>
              <p><a href={`mailto:${site.email}`} className="link-line break-all">{site.email}</a></p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cream/60">Hours</p>
            <ul className="mt-5 space-y-3 text-[15px] text-cream/80">
              {site.hours.map((h) => (
                <li key={h.label}>{h.label}<br /><span className="text-cream/55">{h.time}</span></li>
              ))}
            </ul>
            <ul className="mt-8 flex gap-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.name} ${s.handle}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/80 transition-colors duration-500 hover:border-caramel hover:bg-caramel hover:text-espresso"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-cream/10 pt-8 text-[13px] text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Blend Coffee &amp; Co. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            <a href="https://www.magdio.com/" target="_blank" rel="noopener noreferrer" className="link-line text-cream/70">Magdio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
