import overview from '../assets/screens/admin-overview.png';
import bookings from '../assets/screens/admin-bookings.png';
import availability from '../assets/screens/admin-availability.png';
import analytics from '../assets/screens/admin-analytics.png';
import { partsFor } from './parts';
import type { ProjectPage } from './types';

const repo = 'https://github.com/liuladniak/citygo';

export const admin = {
  title: 'CityGo — Admin Dashboard',
  tagline: 'The internal panel for running Istanbul city tours',
  summary:
    'A web app for the agency’s staff: they confirm bookings, assign guides, edit tours, work through tasks and decide which days can be booked. What they change here shows up in the client app, and each person’s role decides what they can see and do.',
  status: 'Live',
  links: {
    repo,
    live: 'https://citygo-dashboard.liuladniak.com',
    actions: [
      { label: 'Open live site', href: 'https://citygo-dashboard.liuladniak.com' },
      { label: 'View dashboard source', href: `${repo}/tree/main/dashboard` },
    ],
  },
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'CityGo', href: '/projects/citygo' },
    { label: 'Admin dashboard' },
  ],
  parts: partsFor('admin'),
  sections: { screens: { kicker: 'App screens', heading: 'See it in action' }, story: { kicker: 'The app' } },
  screens: [
    { title: 'Overview: stats, activity, tasks', image: overview, alt: 'Dashboard overview with booking stats, an activity feed and a task list' },
    { title: 'Bookings and booking detail', image: bookings, alt: 'Bookings table with status filters beside a booking detail view' },
    { title: 'Availability and schedule', image: availability, alt: 'Calendar showing blocked dates and scheduled tours' },
    { title: 'Analytics (managers and admins)', image: analytics, alt: 'Analytics charts for bookings and revenue over a chosen date range' },
  ],
  story: {
    lede: 'I built the dashboard for the people behind the booking: the staff who confirm tours, assign guides and decide which days a traveller can pick.',
    blocks: [
      { text: 'It has no backend of its own. **Every change goes through the same API as the client app**, so a booking an agent creates and one a traveller makes end up in the same tables under the same rules. The price is that the API serves two audiences. In return there is one source of truth to secure, test and deploy.' },
      { text: 'The dashboard is where a wrong click costs money, so access is decided in two places. The interface hides what a role shouldn’t use, but **the server is the one that enforces it**: it checks the Supabase token, looks up the role (admin, manager or associate) and gates payments, cancellations, guide assignments, tour edits and analytics. A hidden button is only a courtesy.' },
      { figure: 'roles' },
      { text: 'Availability is the link to the client app, and the part I enjoyed most. Staff block a date or a weekday for a tour and set how far ahead travellers can book. **The client’s date picker reads those rules as data**, so a change here shows up there without a release. Writing this page I also found a gap: company-wide closures are saved and sent to the client, but the tour page’s picker ignores them. Only the change-date dialog uses them.' },
      { figure: 'availability' },
      { text: 'Agents also book by phone, so I split booking creation into five steps: type, tour and date, guests, payment and guide assignment, with a live summary beside the form. **Each step does one job**, so nobody has to remember what comes next while a customer waits on the line.' },
      { text: 'Operations shouldn’t depend on memory either. An hourly job reads upcoming bookings and creates the tasks they imply, such as assigning a guide, setting a meeting point or reviewing a custom tour draft, so **work arrives as tasks, not as someone’s mental list**.' },
    ],
    closing: 'Known gaps: company settings, company-wide availability and task routes check that you are signed in but not your role. That fix is first on the roadmap.',
    features: [
      { name: 'Bookings', color: '#007aff', items: ['Booking list and detail', 'Five-step booking creation', 'Confirm, edit and cancel', 'Payments and balance due', 'Guest lists and vouchers'] },
      { name: 'Tours', color: '#34c759', items: ['Create and edit tours', 'Images, time slots, highlights', 'Itinerary map editor'] },
      { name: 'Planning', color: '#ff9500', items: ['Schedule calendar', 'Tour and company availability', 'Guide assignment: lead, assistant, driver'] },
      { name: 'Team and tasks', color: '#af52de', items: ['Staff directory and roles', 'Tasks with comments', 'Auto-generated tasks'] },
      { name: 'Insight', color: '#8e8e93', items: ['Overview stats and activity feed', 'Analytics', 'Company settings'] },
    ],
  },
  decisions: {
    kicker: 'Decisions',
    heading: 'Five choices, and why',
    items: [
      { considered: 'Redux, as in the client app', chose: 'TanStack Query', why: 'Nearly all dashboard data is server data. Caching and refetching after a change is the job, not a store of my own.' },
      { considered: 'Hiding buttons by role', chose: 'Role checks on the server, plus UI guards', why: 'Anyone can call the API without the interface, so only the server can enforce a permission.' },
      { considered: 'Hand-built components, as in the client’s SCSS', chose: 'shadcn/ui on Radix, with Tailwind', why: 'Dialogs, selects and tabs arrive accessible, and the code lives in the repo, so I can restyle it freely.' },
      { considered: 'Sending tour photos through the API', chose: 'Browser to Supabase Storage, URLs to the API', why: 'The API never relays large files. It only stores where they live.' },
      { considered: 'Screenshots of an empty app, or a one-off SQL dump', chose: 'A Python seeder that can run again', why: 'A dump goes stale. The script tops the dashboard up every week, writes straight to the database one transaction per booking, and gives every fake customer a reserved example-domain address so seeded rows are easy to spot and never emailed.' },
    ],
  },
  chapters: [
    {
      id: 'seeder',
      kicker: 'Spotlight · Demo data',
      story: {
        lede: 'An empty dashboard proves nothing, so I wrote a script that keeps it busy.',
        blocks: [
          { text: 'A dashboard for a booking business only makes sense with bookings in it, and I didn’t want to fake screenshots or click through forms every week. So **a Python seeder fills the database the way an agency’s week would**: tourists, bookings, guests, payments, guide assignments and an activity log. It is still in progress, and I am building it a step at a time, which is also how I am learning Python on a real task.' },
          { flow: { caption: 'One seeded booking', steps: [
            { title: 'Pick', note: 'A live tour and time slot' },
            { title: 'Check', note: 'Blocked dates are respected' },
            { title: 'Create', note: 'A tourist with a fake address' },
            { title: 'Book', note: 'Booking, guests and payment in one transaction' },
            { title: 'Staff it', note: 'Guide assignment and activity log' },
          ] } },
          { text: 'The rule I held to: **seeded data must be obvious and harmless.** Every generated customer gets an address on a reserved example domain, names are in Latin script so they read well on the dashboard, and a dry-run flag runs the whole job and rolls it back, so I can check a change without touching the data.' },
          { text: 'Faking a business means faking only what the app doesn’t already do. The server creates its own tasks for real bookings, so the seeder adds the **agency-style work around them**: preference checks, confirmations, warnings, calls and office tasks. The tours and the active staff are read fresh on every run, so the seeder never drifts from the app.' },
          { samples: { caption: 'Seeded rows are easy to spot', items: [
            { label: 'Always', rows: [['Email', 'example domain'], ['Names', 'Latin script'], ['Each booking', 'One transaction']] },
            { label: 'Never', rows: [['Real customers', 'Not touched'], ['Emails sent', 'None (guard in progress)']] },
          ] } },
          { text: 'The part that isn’t finished matters most: **a seeded address must never receive an email.** The reminder job and the send function both need a guard before the seeder runs for real on the server, and I won’t switch the weekly run on until they are deployed.' },
        ],
        closing: 'Status: in progress. Working and checked with a dry run: the connection, reference data, tourists, bookings, guests, payments, assignments and the activity log. Still to do: tasks, a cleanup script, the email guards and the weekly job on the server.',
      },
    },
  ],
  stack: [
    { label: 'Core', items: ['React 19', 'TypeScript', 'Vite', 'React Router v6'] },
    { label: 'UI', items: ['Tailwind CSS 4', 'shadcn/ui (Radix)', 'lucide icons'] },
    { label: 'Data', items: ['TanStack Query', 'TanStack Table', 'Axios (shared client)'] },
    { label: 'Auth, files', items: ['Supabase Auth', 'Supabase Storage'] },
    { label: 'Views', items: ['FullCalendar', 'Recharts', 'Leaflet', 'date-fns'] },
    { label: 'Demo data', items: ['Python', 'psycopg2', 'Faker'] },
    { label: 'Tooling', items: ['Docker', 'Nginx', 'GitHub Actions'] },
  ],
  architecture: {
    apps: [
      { title: 'Client app', note: 'React 19 · Vite' },
      { title: 'Admin dashboard', note: 'React · TypeScript (this project)', highlight: true },
    ],
    api: { title: 'Shared API', note: 'Node.js · Express · Knex · role checks' },
    services: [
      { title: 'Supabase', note: 'Postgres · Auth · Storage', linked: true },
      { title: 'Chat service', note: 'FastAPI' },
      { title: 'Notifications', note: 'BullMQ · Redis · email', linked: true },
    ],
    caption: 'Both apps call the shared API, which uses Supabase, the chat service and notifications.',
    note: 'The dashboard also talks to Supabase directly for sign-in, the role lookup and image uploads. The chat service serves the client’s Milo only.',
  },
  engineering: {
    notes: [
      'One shared Axios client attaches the Supabase token to every request and signs the user out on a 401.',
      'Roles live in a user_roles table. The API looks the role up per request and gates payments, cancellations, guide assignment, tour and staff edits, and analytics.',
      'Each screen reads through a keyed TanStack Query, and mutations invalidate the queries they affect.',
      'Tour images upload from the browser to Supabase Storage, and only the URLs are saved through the API.',
      'The demo-data seeder lives in its own folder with its own virtual environment and a dry-run flag that rolls everything back.',
      'Gaps I know about: blocked dates are not re-checked on the server when a booking is created, and company settings, company availability and tasks have no role check.',
    ],
    testing: {
      count: 0,
      text: 'Automated tests for the dashboard so far. The one test file in the project covers the client’s cart.',
      manual: ['Written test plan', 'Smoke-test checklist after each deployment'],
      planned: ['Playwright end-to-end tests', 'Dashboard unit tests', 'Lint and tests in CI'],
    },
    deployment: {
      environments: ['Staging (develop branch)', 'Production (main branch)'],
      text: 'A multi-stage Docker build compiles the app with Node and serves the static files from Nginx with a single-page-app fallback. The API and Supabase addresses are build-time variables. GitHub Actions on a self-hosted runner rebuilds the stack with Docker Compose. The pipeline deploys, but does not run tests yet.',
      hosting: ['Hostinger VPS'],
    },
  },
  roadmapInProgress: ['Demo-data seeder: tasks, cleanup script and the weekly job'],
  roadmap: [
    'Role checks on settings, availability and task routes',
    'Apply company-wide closures in the tour date picker',
    'Re-check blocked dates on the server',
    'Dashboard tests and CI checks',
    'Invoices page',
    'Reports page',
  ],
  footer: { title: 'See it running', text: 'Open the live dashboard or read the code. Demo access is explained on my site.' },
} satisfies ProjectPage;
