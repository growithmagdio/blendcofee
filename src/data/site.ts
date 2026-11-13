// Every business detail lives here. All values come from blendcoffeeandco.com.
export const site = {
  name: "Blend Coffee & Co.",
  tagline: "Your happy place, freshly brewed.",
  origin: "Your happy place, where life is mixed with coffee and mediocrity is never on the menu.",
  address: { street: "813 East Richards St.", city: "Douglas", region: "WY", zip: "82633" },
  phoneDisplay: "307-351-4549",
  phoneHref: "tel:+13073514549",
  email: "Blendcoffeeco@gmail.com",
  orderUrl: "https://www.clover.com/online-ordering/blend-coffee-co-douglas",
  giftUrl: "https://blendcoffee.webgiftcardsales.com/",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=813+East+Richards+St,+Douglas,+WY+82633",
  mapEmbed: "https://www.google.com/maps?q=813+East+Richards+St,+Douglas,+WY+82633&z=15&output=embed",
  established: 2019,
  coffee: "Doma Coffee",
  hours: [
    { label: "Monday to Friday", time: "6:30 am to 2 pm", days: [1, 2, 3, 4, 5], open: 6.5, close: 14 },
    { label: "Saturday", time: "7 am to 2 pm", days: [6], open: 7, close: 14 },
  ],
  social: {
    instagram: { handle: "@blendcoffeeco_wyo", url: "https://www.instagram.com/blendcoffeeco_wyo/" },
    facebook: { handle: "Blend Coffee & Co.", url: "https://www.facebook.com/blendcoffeeco" },
    tiktok: { handle: "@blendcoffeeco", url: "https://www.tiktok.com/@blendcoffeeco" },
  },
} as const;

export const nav = [
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Visit Us", href: "#visit" },
  { label: "Gift Cards", href: "#gift" },
] as const;

export const menu = [
  {
    no: "01",
    title: "Coffee",
    copy: "Freshly brewed, honest and dependable. The everyday cup, done properly.",
    img: "img/menu-coffee",
    alt: "A stoneware mug of black coffee beside a glass pour-over brewer",
  },
  {
    no: "02",
    title: "Espresso",
    copy: "Pulled with care by trained baristas, from a straight shot to a velvety latte.",
    img: "img/menu-espresso",
    alt: "An espresso shot with golden crema pouring into a glass",
  },
  {
    no: "03",
    title: "Signature Drinks",
    copy: "Our own recipes, developed and taste-tested in-house. Hot or iced.",
    img: "img/menu-signature",
    alt: "An iced caramel latte swirling in a tall glass",
  },
  {
    no: "04",
    title: "Breakfast & Café",
    copy: "Food made to go with your cup, every item developed by our own team.",
    img: "img/menu-cafe",
    alt: "A croissant, breakfast sandwich and cappuccino on a wooden table",
  },
] as const;

/** Is the café open right now? Uses Douglas, WY local time (America/Denver). */
export function openStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const h = Number(get("hour")) % 24 + Number(get("minute")) / 60;
  const today = site.hours.find((r) => (r.days as readonly number[]).includes(day));
  if (today && h >= today.open && h < today.close) return { open: true, text: "Open now, until 2 pm" };
  return { open: false, text: "Closed now" };
}
