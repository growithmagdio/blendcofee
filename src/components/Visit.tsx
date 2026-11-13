import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { openStatus, site } from "../data/site";
import { Magnetic, ParallaxImage, Rise, SplitReveal } from "./ui";

export default function Visit() {
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => {
    setStatus(openStatus());
    const t = setInterval(() => setStatus(openStatus()), 60_000);
    return () => clearInterval(t);
  }, []);
  const a = site.address;

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-cream-2 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-none lg:col-span-7">
          <ParallaxImage
            src="img/visit"
            alt="A warm brick coffee shop on a quiet street at golden hour"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[4/3] w-full rounded-[2px] lg:aspect-[16/12]"
          />
          {!import.meta.env.VITE_NO_MAP && (
          <Rise delay={0.1}>
              <div className="mt-6 overflow-hidden rounded-[2px] border border-espresso/10">
                <iframe
                  title="Map to Blend Coffee & Co., 813 East Richards St., Douglas, WY"
                  src={site.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-56 w-full [filter:grayscale(0.85)_sepia(0.25)_contrast(1.05)] md:h-64"
                />
              </div>
            </Rise>
          )}
        </div>

        <div className="order-1 lg:order-none lg:col-span-5 lg:pt-6">
          <Rise>
            <p className="eyebrow text-coffee">Visit Us</p>
          </Rise>
          <SplitReveal text="Come in, slow down." italic={["slow", "down"]} className="display mt-6 text-[3.3rem] text-espresso sm:text-7xl md:text-[5.6rem]" />

          <Rise delay={0.1}>
            <span className={`mt-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[12px] font-medium tracking-[0.08em] ${status?.open ? "border-[#5b7a4a]/40 text-[#3f5a31]" : "border-espresso/20 text-espresso/60"}`}>
              <span className={`relative h-2 w-2 rounded-full ${status?.open ? "bg-[#5b7a4a]" : "bg-espresso/40"}`}>
                {status?.open && <span className="absolute inset-0 animate-ping rounded-full bg-[#5b7a4a]/60" />}
              </span>
              {status?.text ?? "Hours below"}
            </span>
          </Rise>

          <Rise delay={0.15}>
            <dl className="mt-12 divide-y divide-espresso/12 border-y border-espresso/12">
              <div className="py-6">
                <dt className="eyebrow flex items-center gap-3 text-espresso/65"><MapPin className="h-4 w-4 text-coffee" aria-hidden />Location</dt>
                  <dd className="mt-2 pl-7 text-lg text-espresso">
                    {a.street}
                    <br />
                    {a.city}, {a.region} {a.zip}
                  </dd>
              </div>
              <div className="py-6">
                <dt className="eyebrow flex items-center gap-3 text-espresso/65"><Clock className="h-4 w-4 text-coffee" aria-hidden />Opening hours</dt>
                  <dd className="mt-2 pl-7 space-y-1.5 text-lg text-espresso">
                    {site.hours.map((h) => (
                      <p key={h.label} className="flex flex-wrap justify-between gap-x-6">
                        <span>{h.label}</span>
                        <span className="text-espresso/70">{h.time}</span>
                      </p>
                    ))}
                  </dd>
              </div>
              <div className="py-6">
                <dt className="eyebrow flex items-center gap-3 text-espresso/65"><Phone className="h-4 w-4 text-coffee" aria-hidden />Call</dt>
                  <dd className="mt-2 pl-7 text-lg">
                    <a href={site.phoneHref} className="link-line text-espresso">{site.phoneDisplay}</a>
                  </dd>
              </div>
              <div className="py-6">
                <dt className="eyebrow flex items-center gap-3 text-espresso/65"><Mail className="h-4 w-4 text-coffee" aria-hidden />Email</dt>
                  <dd className="mt-2 pl-7 text-lg">
                    <a href={`mailto:${site.email}`} className="link-line break-all text-espresso">{site.email}</a>
                  </dd>
              </div>
            </dl>
          </Rise>

          <Rise delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Magnetic href={site.mapsUrl} external className="btn btn-dark">
              Visit the Café <ArrowUpRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic href={site.mapsUrl} external className="btn btn-line-dark">
              Get Directions
            </Magnetic>
          </Rise>
        </div>
      </div>
    </section>
  );
}
