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
    location: "Toronto, Canada",
    setup: "remote / hybrid / open to relocation",
    timezone: "UTC-5",
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
    "Full-stack developer. I build practical web applications, from user-facing interfaces to backend systems, and bring them to production.",
  summary:
    "I'm self-driven, with a ==teaching background== and a ==degree in civil engineering==. I enjoy solving problems, understanding how things work, and turning ideas into ==reliable software==. I care about clean code, thoughtful user experiences, and the details that make applications maintainable and ready for real-world use.",
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
        title: "Teaching & mentoring",
        note: "Mentored 50+ students in BrainStation's Software Engineering program, reviewing code and helping them grow as developers.",
      },
      {
        icon: "globe",
        title: "International collaboration",
        note: "Worked with teams across the US, Canada, and Europe, adapting to different cultures, time zones, and ways of working.",
      },
      {
        icon: "compass",
        title: "Engineering mindset",
        note: "With a degree in civil engineering, I enjoy understanding complex systems, solving practical problems, and thinking things through.",
      },
      {
        icon: "book",
        title: "Always learning",
        note: "I keep expanding my knowledge of software engineering, exploring new technologies and digging deeper into how things work.",
      },
    ],
  },
  work: {
    kicker: "Projects",
    heading: "Selected work",
    intro:
      "A closer look at the applications I've built, starting with one end-to-end project.",
    primary: {
      label: "Main case study",
      title: "CityGo",
      tagline: "Online booking for Istanbul city tours",
      text: "Travellers can browse tours, choose dates, and book online, while agency staff manage bookings, guides, and availability through an admin dashboard. I built both applications, the backend API, a Python script for generating realistic demo data, and the deployment pipeline.",
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
          blurb: "A look at the client application and admin dashboard",
          href: "/case-study#screens",
          color: "#007aff",
        },
        {
          title: "Architecture",
          blurb: "How the application is structured and how its parts connect",
          href: "/case-study#architecture",
          color: "#34c759",
        },
        {
          title: "Client app",
          blurb: "The traveller's journey, from discovering tours to booking",
          href: "/case-study#client",
          color: "#ff9500",
        },
        {
          title: "Admin dashboard",
          blurb: "How staff manage bookings, guides, and availability",
          href: "/case-study#admin",
          color: "#af52de",
        },
        {
          title: "Under the hood",
          blurb: "Technical decisions, implementation details, and deployment",
          href: "/case-study#hood",
          color: "#8e8e93",
        },
        {
          title: "What’s next",
          blurb: "Current limitations, planned improvements, and future ideas",
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
    "My background combines engineering, software development, and teaching. I graduated with a Master's degree with honors in Building and Civil Engineering from Vinnytsia National Technical University in 2018.",
    "I later completed BrainStation's Software Engineering program in Toronto, Canada, and stayed on as a teaching assistant, mentoring more than 50 students and reviewing their work. I also spent several years in the US, taking on freelance work and developing my skills in web development.",
    "I'm now looking for a full-stack developer role where I can contribute to a team, learn from experienced engineers, and keep growing. I work comfortably in English and Ukrainian.",
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
