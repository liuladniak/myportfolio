import payment from '../assets/screens/api-payment.png';
import schema from '../assets/screens/api-schema.png';
import grafana from '../assets/screens/delivery-grafana.png';
import pipeline from '../assets/screens/delivery-pipeline.png';
import { partsFor } from './parts';
import type { ProjectPage } from './types';

const repo = 'https://github.com/liuladniak/citygo';

export const platform = {
  title: 'CityGo — Platform',
  tagline: 'One API, one queue and one pipeline behind both apps',
  summary:
    'Everything the client app and the admin dashboard share: the API that prices tours and takes payments, the data behind it, the notifications, the pipeline that ships it and the tests that check it. It is one server run by one person, and this page says where it is thin.',
  status: 'Live',
  links: {
    repo,
    actions: [
      { label: 'View API source', href: `${repo}/tree/main/server` },
      { label: 'Read the QA docs', href: `${repo}/tree/main/qa` },
    ],
  },
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'CityGo', href: '/projects/citygo' },
    { label: 'Platform' },
  ],
  parts: partsFor('platform'),
  sections: { screens: { kicker: 'In pictures', heading: 'The platform, drawn' }, story: { kicker: 'API & data' } },
  screens: [
    { title: 'Database schema', image: schema, alt: 'Entity diagram of the booking, tour and staff tables' },
    { title: 'Payment sequence', image: payment, alt: 'Sequence from price quote to payment intent to Stripe webhook to booking creation' },
    { title: 'A deploy run in GitHub Actions', image: pipeline, alt: 'GitHub Actions run showing the staging and production deploy jobs' },
    { title: 'Monitoring in Grafana', image: grafana, alt: 'Grafana dashboard with request and log panels' },
  ],
  story: {
    lede: 'I wrote the API so that two very different apps, a booking site and a staff panel, could trust one set of rules.',
    blocks: [
      { text: 'It is a single Express server, not a fleet of services. **One process owns pricing, payments, bookings and permissions**, so a price is worked out in one place and no client can forget a role check. The cost is a few very large route files. Splitting them by feature is the refactor I would do next.' },
      { text: 'A price never comes from the browser. The cart sends tour ids and guest counts, and **the server looks up the price, applies the rules and quotes it**: children pay half, featured tours get ten percent off, and the total converts to the traveller’s currency at a live exchange rate. Stripe charges exactly that amount.' },
      { flow: { caption: 'Pay once, book on success', steps: [
        { title: 'Quote', note: 'Prices come from the database' },
        { title: 'Payment intent', note: 'Cart details travel as Stripe metadata' },
        { title: 'Stripe', note: 'Charges the card' },
        { title: 'Webhook', note: 'Signature checked' },
        { title: 'Booking', note: 'One transaction writes it all' },
      ] } },
      { text: 'Bookings are created from Stripe’s webhook, not from the page the traveller lands on afterwards. **A booking exists only if the money moved**, even if the tab was closed. The webhook checks Stripe’s signature and writes the whole cart in one database transaction, so a failure halfway leaves nothing behind.' },
      { text: 'The part I trust least is also the most important. The webhook does not check whether it has already handled an event, and the Stripe payment id is saved only in a note. Stripe can deliver an event twice, so **a retry could create duplicate bookings**. Making it idempotent is first on my list.' },
      { text: 'The schema has about thirty tables, and one booking touches six of them. **I split a booking into guests, guest names, payments, assignments and an activity log** rather than one wide row, so each piece can change on its own: staff can add a guide or record a payment later without touching what the traveller entered.' },
      { samples: { caption: 'One booking, six tables', items: [
        { label: 'Written by the webhook', rows: ['bookings', 'booking_guests', 'booking_guest_names', 'booking_payments'] },
        { label: 'Added later by staff', rows: ['booking_assignments', 'booking_activity_log'] },
      ] } },
      { text: 'Sign-in belongs to Supabase Auth. Every request carries a token, **the API verifies it with Supabase and then looks up the role** (admin, manager or associate) in its own table before it touches anything sensitive.' },
    ],
    closing: 'Known gaps: a retried Stripe webhook can create duplicate bookings, several routes check sign-in but not role, blocked dates are not re-checked when a booking is created, and the API has no automated tests.',
    features: [
      { name: 'Tours and availability', color: '#34c759', items: ['Public tour catalogue and detail pages', 'Reviews with rating summaries', 'Tour and company-wide blocked dates', 'Articles and a contact form'] },
      { name: 'Pricing and payments', color: '#007aff', items: ['Cart quotes in several currencies', 'Stripe payment intents', 'Bookings created from the webhook', 'Payments and balance due per booking'] },
      { name: 'Bookings', color: '#ff9500', items: ['Create, edit and cancel', 'Guest lists', 'Guide assignment', 'Activity log per booking'] },
      { name: 'People and access', color: '#af52de', items: ['Token check against Supabase', 'Roles: admin, manager, associate', 'Staff accounts and availability', 'Traveller profiles and their bookings'] },
    ],
  },
  chapters: [
    {
      id: 'notifications',
      kicker: 'Notifications',
      story: {
        lede: 'Nothing a traveller waits on should depend on an email provider answering.',
        blocks: [
          { text: 'The API doesn’t send confirmation and cancellation emails itself. **It drops a job on a Redis queue**, and a separate worker, a small TypeScript service, picks it up and sends the email over SMTP. If mail is slow or down, the booking still succeeds.' },
          { flow: { caption: 'From booking to inbox', steps: [
            { title: 'Booking', note: 'Confirmed or cancelled' },
            { title: 'Queue', note: 'A job on Redis (BullMQ)' },
            { title: 'Worker', note: 'Up to five at a time' },
            { title: 'Email', note: 'Sent over SMTP' },
            { title: 'Traveller', note: 'Gets the message' },
          ] } },
          { text: 'Two kinds of mail skip the queue. A scheduled job in the API sends **reminders every morning at 07:00 Istanbul time**, and guide-assignment emails go straight from the server, both through Brevo. That leaves me with two email paths where one would do, and merging them is on the list.' },
          { text: 'The queue has no retry settings yet, so **a failed email is a lost email**. And since the dashboard fills with seeded customers, I am adding a guard so nothing is ever sent to the seeded addresses, in the reminder job and in the send function itself. That guard is in progress and ships before the seeder runs for real.' },
        ],
        closing: 'Known gaps: no retries for failed jobs, two email paths, and the seeded-address guard is not deployed yet.',
      },
    },
    {
      id: 'delivery',
      kicker: 'Delivery',
      story: {
        lede: 'I run CityGo the way a small team would, only smaller: one server, one command and a checklist I trust more than my memory.',
        blocks: [
          { text: 'Every service is a container, and **one Compose file describes the whole system**: the proxy, the API, the chat service, both web apps, the notifications worker, Redis and the monitoring stack. Staging has its own file and its own settings, so I can break things there without touching what visitors see.' },
          { text: 'A push to develop or main starts a GitHub Actions job on a runner that lives on the server itself. It fetches the branch and rebuilds with Compose, so there is **no registry, no deploy keys to guard and no extra service to run**. The price is that it builds on the live machine, and it deploys without running a single test.' },
          { flow: { caption: 'Push to running', steps: [
            { title: 'Push', note: 'develop or main' },
            { title: 'Runner', note: 'Self-hosted, on the server' },
            { title: 'Checkout', note: 'Reset to the branch tip' },
            { title: 'Build', note: 'docker compose up --build' },
            { title: 'Route', note: 'Proxy Manager with TLS' },
          ] } },
          { text: 'Staging shares the Docker network with production but has its own containers, queue and settings. **I test there first**, then run the smoke checklist after a release ships.' },
          { samples: { caption: 'Two environments', items: [
            { label: 'Staging', rows: [['Branch', 'develop'], ['Settings', '.env.staging'], ['Runs', 'Apps, queue, worker']] },
            { label: 'Production', rows: [['Branch', 'main'], ['Settings', '.env'], ['Runs', 'Apps, queue, worker, proxy, monitoring']] },
          ] } },
          { text: 'I can see the API’s pulse. It exposes request counts and latency, Prometheus scrapes production and staging, Promtail ships container logs to Loki and Grafana sits on top. But **monitoring nobody opens is decoration**: nothing alerts me yet. Other weak spots are unpinned image tags, no health checks or resource limits, and monitoring tools published on host ports. A single server is a single point of failure, and there is no rollback step beyond deploying an older commit.' },
        ],
        closing: 'Known gaps: no alerts, no health checks or rollback step, unpinned image versions, and CI deploys without running tests.',
      },
    },
    {
      id: 'testing',
      kicker: 'Testing & QA',
      story: {
        lede: 'Testing is where I am most honest with myself.',
        blocks: [
          { text: 'The client’s cart logic has **24 automated tests** (Vitest). Everything else is checked by hand against a written test plan and a smoke checklist after each deployment. The README promises more than the repo delivers: tests in CI, a Postman collection and Playwright do not exist yet, and I would rather say so than hide it.' },
          { text: 'The next layer is **Playwright, and I am writing it as an outline first**. Each journey below is a test I intend to write. Three of them describe gaps I already know about, so I expect them to fail the first time they run.' },
          { samples: { caption: 'Playwright outline, journeys to cover', items: [
            { label: 'Traveller', rows: [['Book and pay (Stripe test card)', 'Planned'], ['Webhook creates the booking', 'Planned'], ['A blocked date can’t be booked', 'Planned · fails today']] },
            { label: 'Staff and rules', rows: [['Admin confirms and assigns a guide', 'Planned'], ['Associate can’t change settings', 'Planned · fails today'], ['A repeated webhook makes one booking', 'Planned · fails today']] },
          ] } },
          { text: 'I am writing the plan before the code because **a list I can read is a list someone can challenge**, and because the same list becomes the Playwright files, one journey per spec.' },
        ],
        closing: 'Status: the outline is written and the tests are not. CI does not run any tests yet.',
      },
    },
  ],
  decisions: {
    kicker: 'Decisions',
    heading: 'Five choices, and why',
    items: [
      { considered: 'Creating the booking when the browser returns from Stripe', chose: 'Create it from Stripe’s webhook', why: 'A closed tab or a bad connection can’t lose a paid booking, and nothing is booked without payment.' },
      { considered: 'Trusting prices sent by the browser', chose: 'Prices looked up on the server', why: 'The browser is the one place a customer can edit, so it only sends tour ids and guest counts.' },
      { considered: 'Sending emails inside the request', chose: 'A Redis queue and a separate worker', why: 'A slow mail provider shouldn’t make a traveller wait.' },
      { considered: 'Moving every query to Drizzle at once', chose: 'Knex for queries, Drizzle for the schema', why: 'Knex was already running in production, so the schema moved first and queries can follow route by route.' },
      { considered: 'Managed hosting such as Vercel or Render', chose: 'One VPS with Docker Compose', why: 'I wanted to understand the whole path from a push to running containers, and one server keeps the cost predictable.' },
    ],
  },
  stack: [
    { label: 'Core', items: ['Node.js 20', 'Express 4', 'JavaScript, TypeScript in progress'] },
    { label: 'Data', items: ['PostgreSQL (Supabase)', 'Knex.js queries', 'Drizzle ORM schema'] },
    { label: 'Auth', items: ['Supabase Auth', 'Role table'] },
    { label: 'Payments', items: ['Stripe payment intents', 'Stripe webhooks', 'Live exchange rates'] },
    { label: 'Jobs, mail', items: ['BullMQ', 'Redis', 'node-cron', 'Brevo', 'Nodemailer (SMTP)'] },
    { label: 'Delivery', items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Self-hosted runner'] },
    { label: 'Proxy', items: ['Nginx Proxy Manager', 'Let’s Encrypt'] },
    { label: 'Monitoring', items: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'prom-client'] },
    { label: 'Testing', items: ['Vitest (client cart)', 'Test plan', 'Smoke checklist'] },
  ],
  architecture: {
    caption: 'Both apps call the shared API, which uses Supabase, Stripe and the notifications worker.',
    apps: [
      { title: 'Client app', note: 'React 19 · Vite' },
      { title: 'Admin dashboard', note: 'React · TypeScript' },
    ],
    api: { title: 'Shared API', note: 'Node.js · Express · Knex · role checks · jobs (this part)', highlight: true },
    services: [
      { title: 'Supabase', note: 'Postgres · Auth · Storage', linked: true },
      { title: 'Stripe', note: 'Payments · webhooks', linked: true },
      { title: 'Notifications', note: 'BullMQ · Redis · email', linked: true },
    ],
    observability: 'Prometheus · Grafana · Loki · Promtail',
    note: 'Everything runs as containers in one Compose stack on one server, shipped by a self-hosted GitHub Actions runner. Milo’s chat service sits behind one route of this API.',
  },
  engineering: {
    notes: [
      'The webhook route is mounted before JSON parsing, so Stripe’s signature check sees the raw request body.',
      'A whole cart is written in one transaction: bookings, guests, names and payments land together or not at all.',
      'The pricing rules are written twice, once when quoting and once in the webhook.',
      'Every route file opens its own Knex connection (16 in all), and the controllers folder is empty: the logic lives in the route files.',
      'No migration files are committed, and exchange rates are fetched live for every quote with no cache.',
      'The API runs through tsx in production, so there is no compile step for the server.',
    ],
    testing: {
      count: 24,
      text: 'Automated tests, all for the client’s cart logic. The API, the dashboard and Milo have none, and CI doesn’t run any. npm test on the server calls Jest, which is not installed.',
      manual: ['Written test plan', 'Smoke checklist with a run log', 'Exploratory testing on staging'],
      planned: ['Playwright end-to-end tests, from the outline', 'Pricing rule unit tests', 'Tests and lint in CI', 'Postman API collection'],
    },
    deployment: {
      environments: ['Staging (develop branch)', 'Production (main branch)'],
      text: 'A multi-stage Docker build compiles each web app with Node and serves it from Nginx; the API and worker run on Node 20 Alpine. GitHub Actions on a self-hosted runner hard-resets the checkout to the branch and runs docker compose up --build with that environment’s env file. Every service has a restart policy.',
      hosting: ['Hostinger VPS', 'Supabase Postgres', 'Nginx Proxy Manager'],
    },
  },
  roadmapInProgress: ['Email guard for seeded addresses (reminder job and send function)'],
  roadmap: [
    'Make the Stripe webhook idempotent',
    'Role checks on settings, availability and task routes',
    'Re-check blocked dates when a booking is created',
    'Playwright tests, starting from the outline',
    'Retries for failed notification jobs',
    'Merge the two email paths',
    'Lint and tests in CI before deploying',
    'Alerts, health checks and a rollback step',
    'Commit migrations and finish the Drizzle move',
  ],
  footer: { title: 'Read the code', text: 'Browse the server source, the workflow and the QA documents on GitHub.' },
} satisfies ProjectPage;
