import browse from '../assets/screens/browse.jpg';
import detail from '../assets/screens/detail.jpg';
import checkout from '../assets/screens/checkout.jpg';
import milo from '../assets/screens/milo.png';

import { partsFor } from './parts';
import type { Block, ProjectPage } from './types';

const repo = 'https://github.com/liuladniak/citygo';

export const project = {
  title: 'CityGo — Client App',
  tagline: 'Customer-facing booking app for Istanbul city tours',
  summary:
    'A React single-page app where travellers browse Istanbul tours, check availability, build a multi-tour cart, pay by card and manage their bookings. It is one part of the CityGo platform; the map below shows how the others fit around it.',
  status: 'Live',
  links: {
    repo,
    live: 'https://citygo.liuladniak.com',
    actions: [
      { label: 'Open live site', href: 'https://citygo.liuladniak.com' },
      { label: 'View client source', href: `${repo}/tree/main/client` },
    ],
  },
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'CityGo', href: '/projects/citygo' },
    { label: 'Client app' },
  ],
  parts: partsFor('client'),
  sections: { screens: { kicker: 'App screens', heading: 'See it in action' }, story: { kicker: 'The app' } },
  screens: [
    { title: 'Tour browsing and search', image: browse, alt: 'Tour listing with category filters and a grid of tour cards' },
    { title: 'Tour detail and availability', image: detail, alt: 'Tour page with a photo gallery and a booking form' },
    { title: 'Three-step checkout', image: checkout, alt: 'Checkout with trip, details and payment steps beside a price summary' },
    { title: 'Milo chat helper', image: milo, alt: 'Chat widget with Milo recommending tours', portrait: true },
  ],
  story: {
    lede: 'I built the CityGo client as the part of the platform a traveller actually touches: find an Istanbul tour, pick a day, pay, and manage the booking afterwards.',
    blocks: [
      { text: 'The first decision shaped the rest: **the browser never sets a price.** The cart sends only tour IDs and guest counts, and a server quote returns the totals. That costs an extra request, so the price summary has loading, error and retry states built in. In return, nothing in the browser gets a vote on what Stripe charges.' },
      { figure: 'price' },
      { text: 'Carts get abandoned and revisited, so the cart lives in Redux Toolkit, persists to localStorage and is **sanitised on the way back in**, which keeps stale or malformed data out of checkout. Because it sits next to payments, its reducers and selectors are covered by 24 unit tests.' },
      { text: 'Availability was the fiddly part. Blocked dates, recurring unavailable weekdays and a rolling six-month window all have to disable the right days in the date picker. **The rules arrive from the API as data**, so the admin dashboard can change them without a client release.' },
      { figure: 'details' },
      { text: 'Auth was a deliberate hand-off. I replaced a custom JWT setup with **Supabase Auth**, which brought Google sign-in, password reset and session handling I no longer have to maintain. Review photos follow the same logic: they go from the browser straight to Supabase Storage, and only the URLs reach the API.' },
    ] as Block[],
    closing: 'Next on the list: end-to-end tests with Playwright, and finishing the TypeScript migration.',
    features: [
      { name: 'Discovery', color: '#007aff', items: ['Tour browsing and search', 'Tour detail and availability', 'Interactive map', 'Multi-currency pricing'] },
      { name: 'Booking', color: '#34c759', items: ['Cart and checkout', 'Card payments'] },
      { name: 'Accounts', color: '#ff9500', items: ['Authentication', 'Account and bookings', 'Reviews', 'Wishlist'] },
      { name: 'Content', color: '#af52de', items: ['Travel guide', 'Milo chat helper', 'Contact and help', 'Marketing and content pages'] },
      { name: 'Platform', color: '#8e8e93', items: ['Analytics and cookie consent', 'Responsive UI'] },
    ],
  },
  decisions: {
    kicker: 'Decisions',
    heading: 'Five choices, and why',
    items: [
      { considered: 'Keeping the cart in component state', chose: 'Redux Toolkit, saved to localStorage', why: 'The cart outlives pages and sits next to payments, so its reducers are plain functions I can test (24 tests so far) and sanitise when the cart is loaded back.' },
      { considered: 'Calculating prices in the browser', chose: 'A server quote for every cart', why: 'The browser is the one place a customer can edit, so it only sends tour ids and guest counts. The extra request needs loading, error and retry states.' },
      { considered: 'Maintaining my own JWT and password code', chose: 'Supabase Auth', why: 'Google sign-in, password reset and sessions arrive ready-made, and I no longer maintain security-critical code myself.' },
      { considered: 'Uploading review photos through the API', chose: 'Browser straight to Supabase Storage', why: 'The API never relays large files. It only stores where they live.' },
      { considered: 'Putting a language model behind Milo from day one', chose: 'A rule-based helper over the live tour list', why: 'My first AI version used up the free token allowance before it could answer a question, and the tour data changes too often to keep in a prompt. Matching against the database is cheap and always current; AI can come back later for part of the chat, with retrieval.' },
    ],
  },
  chapters: [
    {
      id: 'milo',
      kicker: 'Milo · early version',
      story: {
        lede: 'Milo is a small chat helper that points visitors to tours we really run. It is rule-based today, and I plan to add AI to part of it later.',
        blocks: [
          { text: 'I first built Milo on a language model, but the free token allowance ran out before it could answer a single question, and the tour data changes too often to keep in a prompt. So the current version is **algorithmic**: the API matches the question against the live tour list by keyword and replies with real tours, prices and links.' },
          { text: 'The next step is AI for part of the conversation only, with retrieval over live tour data so answers stay current without paying for a huge prompt every time.' },
        ],
        closing: 'Known gaps: no automated tests yet, and no scripted check of answer quality.',
      },
    },
  ],
  stack: [
    { label: 'Core', items: ['React 19', 'Vite', 'React Router v6', 'Redux Toolkit'] },
    { label: 'Languages', items: ['JavaScript', 'TypeScript (incremental migration)'] },
    { label: 'Styling', items: ['SCSS (mobile-first, shared design tokens)'] },
    { label: 'Data, auth', items: ['Axios', 'Supabase Auth', 'Supabase Storage'] },
    { label: 'Payments', items: ['Stripe.js', 'React Stripe.js (Payment Element)'] },
    { label: 'Maps', items: ['Leaflet', 'react-leaflet'] },
    { label: 'Chat helper', items: ['Python 3.11', 'FastAPI'] },
    { label: 'Analytics', items: ['Google Tag Manager', 'GA4'] },
    { label: 'Testing', items: ['Vitest'] },
    { label: 'Tooling', items: ['ESLint', 'Docker', 'GitHub Actions'] },
  ],
  architecture: {
    apps: [
      { title: 'Client app', note: 'React 19 · Vite (this project)', highlight: true },
      { title: 'Admin dashboard', note: 'React · TypeScript' },
    ],
    api: { title: 'Shared API', note: 'Node.js · Express · Knex · Stripe · Brevo' },
    services: [
      { title: 'Supabase', note: 'Postgres · Auth · Storage' },
      { title: 'Chat service', note: 'FastAPI' },
      { title: 'Notifications', note: 'BullMQ · Redis' },
    ],
    caption: 'Both apps call the shared API, which uses Supabase, the chat service and notifications.',
    observability: 'Prometheus · Grafana · Loki · Promtail',
  },
  engineering: {
    notes: [
      'Prices are calculated on the server. The cart sends only tour IDs and guest counts, so the browser never decides what is charged.',
      'Cart state lives in Redux Toolkit, is saved to localStorage and is sanitised when it is loaded back. Reducers and selectors are covered by 24 Vitest tests.',
      'Authentication is handled by Supabase Auth, migrated from a custom JWT setup, on both the client and the admin dashboard.',
      'Review photos are uploaded from the browser straight to Supabase Storage, and only the resulting URLs are sent to the API.',
      'Delivery uses a multi-stage Docker build (Node build stage, Nginx serving the static files with a single-page-app fallback) and build-time environment variables.',
    ],
    testing: {
      count: 24,
      text: 'Vitest unit tests on the Redux cart slice: add, remove, update and clear reducers, selectors and edge cases.',
      manual: ['Written test plan', 'Smoke-test checklist after each deployment'],
      planned: ['Playwright end-to-end tests', 'Automated tests in the CI pipeline'],
    },
    deployment: {
      environments: ['Staging (develop branch)', 'Production (main branch)'],
      text: 'GitHub Actions on a self-hosted runner pulls the branch on the VPS and rebuilds the stack with Docker Compose, behind Nginx Proxy Manager.',
      hosting: ['Hostinger VPS'],
    },
  },
  roadmap: ['Playwright end-to-end tests', 'Continue the TypeScript migration', 'Drizzle ORM migration on the server', 'Add AI to part of Milo’s chat, grounded in live tour data (RAG)'],
  footer: { title: 'See it running', text: 'Try the live app with the demo account, or read the code.' },
} satisfies ProjectPage;
