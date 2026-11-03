import type { Part } from './types';

export type PartId = 'client' | 'admin' | 'platform';

export const citygoHub = '/projects/citygo';
const base = citygoHub;
const all: { id: PartId; title: string; note: string; currentNote?: string; href: string }[] = [
  { id: 'client', title: 'Client app', note: 'Booking app · ← back to Part 1', currentNote: 'Booking app · this page', href: `${base}/client-app` },
  { id: 'admin', title: 'Admin dashboard', note: 'Bookings, tours, availability, staff', href: `${base}/admin-dashboard` },
  { id: 'platform', title: 'Platform', note: 'API, data, notifications, delivery, tests', href: `${base}/platform` },
];

/** The three-part system map, with `current` marked. Every page links to every other. */
export const partsFor = (current?: PartId): Part[] =>
  all.map(({ id, title, note, currentNote, href }) => ({
    title,
    note: id === current && currentNote ? currentNote : note,
    href,
    ...(id === current && { current: true }),
  }));
