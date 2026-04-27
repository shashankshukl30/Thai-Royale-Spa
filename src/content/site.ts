/**
 * Single source of truth for brand-level content: identity, contact, hours,
 * navigation, footer, social. Per-treatment / programme content lives in
 * `treatments.ts` (Phase B onwards).
 *
 * Content anchored to the North EDSA Quezon City Branch's Facebook page
 * (https://www.facebook.com/profile.php?id=61584876023609) and the parent
 * Thai Royale Spa group. Anything marked `// TODO confirm` should be
 * verified with the client before launch.
 */

export const site = {
  brand: {
    name: "Thai Royale Spa",
    tagline: "Quezon City",
    branch: "North EDSA, Quezon City",
    legalName: "Thai Royale Spa — North EDSA Quezon City Branch",
    tagPhrase: "An hour, restored.",
    description:
      "A traditional Thai spa on North EDSA, Quezon City. Therapists trained in Bangkok, oils warmed for the body, hours that meet the city after dark.",
  },

  contact: {
    // The North EDSA branch hasn't yet shared a direct phone or WhatsApp
    // line. Empty strings here cause every phone / WhatsApp UI affordance
    // to gracefully hide — guests are routed to Facebook + email instead.
    // Once the client confirms the real number, populate `phone`,
    // `phoneDisplay`, `whatsapp`, `whatsappDisplay` and the channels
    // re-appear automatically.
    whatsapp: "",
    whatsappDisplay: "",
    phone: "",
    phoneDisplay: "",
    email: "thairoyalespa.northedsa@gmail.com", // TODO confirm with client
    facebook: "https://www.facebook.com/profile.php?id=61584876023609",
    address: {
      // TODO confirm full street address with client
      line1: "North EDSA Branch",
      line2: "Quezon City, Metro Manila",
      country: "Philippines",
    },
    // Hours follow the parent group standard for Metro Manila branches —
    // confirm with client for North EDSA specifics.
    hours: {
      label: "Daily, 2:00 PM — 2:00 AM",
      open: "14:00",
      close: "02:00",
      // For JSON-LD (overnight closure handled by spec)
      openSpec: ["Mo-Su 14:00-26:00"],
    },
  },

  // Anchored on the parent group's credentials (validated via Facebook + Tripadvisor)
  credentials: [
    {
      title: "Trained in Bangkok",
      detail:
        "Therapists certified by The Union of Thai Traditional Medicine Society — the oldest body-work training centre in Thailand.",
    },
    {
      title: "35+ branches, one standard",
      detail:
        "A national group with two decades of practice. Same protocols, same hospitality, in every room.",
    },
    {
      title: "Wellness Organization Worldwide",
      detail:
        "A proud member, held to international standards for hygiene, ethics, and continuing education.",
    },
  ],

  // Editorial nav — under-promised; we'll wire each route in Phases B/C/D.
  nav: [
    { href: "/treatments", label: "Treatments" },
    { href: "/the-house", label: "The House" },
    { href: "/journal", label: "Journal" },
    { href: "/visit", label: "Visit" },
  ],

  // Footer — three column structure
  footerNav: {
    visit: [
      { href: "/visit", label: "Find us" },
      { href: "/visit#hours", label: "Hours" },
      { href: "/visit#parking", label: "Parking & transit" },
      { href: "/gift-cards", label: "Gift cards" },
    ],
    treatments: [
      { href: "/treatments/thai-traditional", label: "Traditional Thai" },
      { href: "/treatments/swedish", label: "Swedish" },
      { href: "/treatments/aromatherapy", label: "Aromatherapy" },
      { href: "/treatments/couples", label: "Couples ritual" },
    ],
    house: [
      { href: "/the-house", label: "Our story" },
      { href: "/the-house/therapists", label: "Therapists" },
      { href: "/journal", label: "Journal" },
      { href: "/policies", label: "Policies" },
    ],
  },

  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61584876023609",
    },
    // TODO confirm Instagram handle
  ],

  // Anchored, deterministic stats. Will replace one with real PostHog count
  // after 30 days of traffic per the playbook P1 list.
  stats: [
    { value: "20+", label: "Years in practice" },
    { value: "35", label: "Branches nationwide" },
    { value: "2 AM", label: "Last booking" },
    { value: "4.1★", label: "Tripadvisor average" },
  ],
};

export type Site = typeof site;
