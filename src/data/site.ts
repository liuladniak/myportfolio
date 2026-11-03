import { partsFor } from "./parts";

// TODO: replace the placeholder contact details before publishing.
export const site = {
  name: "Liu Ladniak",
  nav: [
    { label: "Work", href: "/case-study" },
    { label: "About & contact", href: "/about" },
  ],
  contact: {
    email: "liuladniak@gnail.com",
    github: "https://github.com/liuladniak",
    linkedin: "https://www.linkedin.com/in/liuladniak/",
  },
  status: "Open to junior full-stack roles",
  statusShort: "Open to work",
  // TODO: replace the placeholders below; they are shown in the homepage hero and on the About page.
  cv: "/Liu-Ladniak-CV.pdf",
  availability: {
    location: "İstanbul, Türkiye",
    setup: "remote / hybrid / open to relocation",
    timezone: "UTC+3",
  },
  footer: {
    title: "Get in touch",
    text: "Hiring a junior full-stack developer? Email is the quickest way to reach me.",
  },
};

const partBlurbs = [
  "What travellers see: browse tours, pick a date, pay.",
  "What staff use: bookings, tours, availability and roles.",
  "What keeps both running: API, payments, notifications, delivery and tests.",
];

const partColors = ["#007aff", "#34c759", "#ff9500"];
// The two apps are what people use; the other three are the platform that holds them together.
const partMeta = [
  {
    group: "apps",
    tag: "For travellers",
    extras: [
      {
        label: "Includes Milo, a chat helper",
        href: "/projects/citygo/client-app#milo",
      },
    ],
  },
  {
    group: "apps",
    tag: "For staff",
    extras: [
      {
        label: "Includes the demo-data seeder",
        href: "/projects/citygo/admin-dashboard#seeder",
      },
    ],
  },
  {
    group: "platform",
    tag: "Shared by both apps",
    chapters: [
      {
        title: "API & data",
        blurb: "Pricing, payments, bookings, roles",
        href: "/projects/citygo/platform#api",
      },
      {
        title: "Notifications",
        blurb: "Queue, worker and reminder emails",
        href: "/projects/citygo/platform#notifications",
      },
      {
        title: "Delivery",
        blurb: "Compose, CI and monitoring",
        href: "/projects/citygo/platform#delivery",
      },
      {
        title: "Testing & QA",
        blurb: "What exists and what is planned",
        href: "/projects/citygo/platform#testing",
      },
    ],
  },
] as const;

// Parts list for the older three-part hub at /projects/citygo (kept as a backup).
export const hubParts = partsFor().map((part, i) => ({
  title: part.title,
  href: part.href as string,
  blurb: partBlurbs[i],
  color: partColors[i],
  ...partMeta[i],
}));

// Secondary projects on the homepage. Each card links straight to the live app.
// TODO: replace the placeholder live URL with the real Sunset Pizza site.
export const otherProjects = [
  {
    title: "Sunset Pizza & Grill Shop",
    text: "A freelance website for a pizza and grill shop in Pittsburgh.",
    note: "Freelance · live site",
    href: "https://sunset-pizza-shop.netlify.app/",
    external: true,
    imageAlt: "Home page of the Sunset Pizza & Grill Shop website",
  },
];

export const home = {
  title: "Liu Ladniak — Full-stack developer",
  description:
    "Portfolio of Liu Ladniak, a bootcamp-trained, self-driven full-stack developer: projects and background.",
  tagline:
    "Full-stack developer. I build web apps from the interface to the server, and deploy them myself.",
  summary:
    "I’m bootcamp-trained and self-driven, with a teaching background and a civil engineering degree behind me. I like work that runs from the interface to the server, and I care about the parts that keep it running: tests, deployment and honest documentation.",
  actions: [
    { label: "See my work", href: "/case-study" },
    { label: "View CV", href: site.cv, external: true },
    { label: "About & contact", href: "/about" },
  ],
  tags: ["Portfolio", "Field Notes — Vol. 06"],
  skills: {
    label: "Stack",
    text: "React, TypeScript, Node.js, Python, SQL, Docker, Stripe, Claude",
  },
  heroImage: {
    alt: "Line illustration of a woman with long wavy hair, round glasses and a striped sweater, resting her chin on her hand",
  },
  facts: {
    kicker: "Overview",
    heading: "A little about me",
    items: [
      {
        icon: "users",
        title: "Teaching assistant at BrainStation",
        note: "Mentored 50+ students on the Software Engineering program and reviewed their code.",
      },
      {
        icon: "globe",
        title: "International teams",
        note: "I have worked across countries, languages and time zones, with teams in the US, Canada and several EU countries.",
      },
      {
        icon: "book",
        title: "Always going deeper",
        note: "Still studying programming and computer science, one layer at a time.",
      },
      {
        icon: "compass",
        title: "Love to travel",
        note: "Always curious about new places and how people live in them.",
      },
    ],
  },
  work: {
    kicker: "Projects",
    heading: "Selected work",
    intro: "One project built end to end, with a few smaller ones beside it.",
    primary: {
      label: "Main case study",
      title: "CityGo",
      tagline: "Online booking for Istanbul city tours",
      text: "Travellers browse tours, pick a date and pay online. The agency’s staff run bookings, guides and availability from an admin dashboard. I built both sides, the API behind them, a Python demo-data seeder and the deployment pipeline.",
      tech: [
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "Stripe",
        "Docker",
      ],
      actions: [
        { label: "Read the case study", href: "/case-study" },
        { label: "Live site", href: "https://citygo.liuladniak.com" },
      ],
      sectionsLabel: "On the page · 6 sections",
      sections: [
        {
          title: "App screens",
          blurb: "The client app and the dashboard in six screens",
          href: "/case-study#screens",
          color: "#007aff",
        },
        {
          title: "Architecture",
          blurb: "How the whole system fits together, as a diagram",
          href: "/case-study#architecture",
          color: "#34c759",
        },
        {
          title: "Client app",
          blurb: "What a traveller can do, from search to payment",
          href: "/case-study#client",
          color: "#ff9500",
        },
        {
          title: "Admin dashboard",
          blurb: "How staff run bookings, guides and availability",
          href: "/case-study#admin",
          color: "#af52de",
        },
        {
          title: "Under the hood",
          blurb: "What is in place and what to watch",
          href: "/case-study#hood",
          color: "#8e8e93",
        },
        {
          title: "What’s next",
          blurb: "In progress and planned, stated plainly",
          href: "/case-study#next",
          color: "#5ac8fa",
        },
      ],
    },
    moreLabel: "More projects",
  },
  contact: {
    kicker: "Contact",
    heading: "Get in touch",
    lead: "Hiring a junior full-stack developer?",
    emphasis: "I’d be glad to talk.",
    text: "Email is the quickest way to reach me. I reply in English or Ukrainian.",
    imageAlt: "A paper plane flying along a dotted trail",
  },
};

export const about = {
  title: "About & contact — Liu Ladniak",
  description:
    "About Liu Ladniak, a bootcamp-trained, self-driven full-stack developer and former BrainStation teaching assistant, and how to get in touch.",
  heading: "My journey",
  kicker: "About & contact",
  story: [
    "I started in construction. I studied building and civil engineering in Vinnytsia, and it taught me to check the foundations before anything is built on top of them. I still work that way: write the decisions down and say what isn’t finished.",
    "I moved into software through the BrainStation bootcamp in Toronto, finished the Software Engineering diploma, won first place in its Industry Project Competition, and then stayed on as a teaching assistant. I mentored 50+ students and reviewed their code, which taught me that explaining a decision to someone else is the fastest way to find out whether it was a good one. I have also built a website for Sunset Pizza & Grill Shop in Pittsburgh.",
    "Today I’m looking for a junior full-stack role on a team where code review is part of the week. My main project, CityGo, is live and documented, gaps included. I work in English and Ukrainian.",
  ],
  portrait: {
    alt: "Liu Ladniak walking through a greenhouse entrance, seen from behind",
  },
};

export const citygo = {
  title: "CityGo",
  description:
    "CityGo: a tour-booking platform for Istanbul city tours, built and documented in three parts.",
  crumbs: [{ label: "Home", href: "/" }, { label: "CityGo" }],
  tagline: "Built end to end, run in production, documented in three parts",
  text: "Travellers browse tours, pick a date and pay online. The agency’s staff run bookings, guides and availability from an admin dashboard. I built both sides, the platform behind them and the deployment pipeline. Each part has its own page.",
  actions: [
    { label: "Start with the client app", href: "/projects/citygo/client-app" },
    { label: "Visit the live site", href: "https://citygo.liuladniak.com" },
  ],
  parts: {
    kicker: "The system",
    heading: "Two apps on a shared platform",
    intro:
      "People use two apps. Everything else exists to make them work. Open a part for its story, decisions and gaps.",
    appsLabel: "The apps · what people use",
    platformLabel: "The platform · what holds them together",
    bridge: "built on",
  },
};
