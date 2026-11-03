import type { ImageMetadata } from 'astro';

export interface Part { title: string; note: string; href?: string; current?: boolean }
export interface ArchNodeData { title: string; note: string; highlight?: boolean; linked?: boolean }
export type FigureKind = 'price' | 'details' | 'roles' | 'availability';
export interface StoryData {
  lede: string;
  blocks: Block[];
  closing: string;
  /** Optional "Everything it does" column. Without it the prose runs on its own. */
  features?: { name: string; color: string; items: string[] }[];
}
export interface DecisionsData { kicker: string; heading: string; items: { considered: string; chose: string; why: string }[] }
export interface Chapter {
  id: string;
  kicker: string;
  featuresTitle?: string;
  story: StoryData;
  decisions?: DecisionsData;
}

export type SampleRow = string | [string, string];
export type Block =
  | { text: string }
  | { figure: FigureKind }
  | { flow: { caption: string; steps: { title: string; note: string }[] } }
  | { samples: { caption: string; items: { label: string; rows: SampleRow[] }[] } };

/** Content model shared by every CityGo part page. Components only render it. */
export interface ProjectPage {
  title: string;
  tagline: string;
  summary: string;
  status: string;
  /** `live` adds a "Live site" link to the hero nav. The first action is the primary button. */
  links: { repo: string; live?: string; actions: { label: string; href: string }[] };
  breadcrumb: { label: string; href?: string }[];
  parts: Part[];
  sections: { screens: { kicker: string; heading: string }; story: { kicker: string } };
  screens: { title: string; image: ImageMetadata; alt: string; portrait?: boolean }[];
  story: StoryData;
  /** Extra chapters, e.g. a spotlight on a feature that lives inside this part. Each one is its own section. */
  chapters?: Chapter[];
  /** Optional: pages without a Decisions section simply omit it. */
  decisions?: DecisionsData;
  stack: { label: string; items: string[] }[];
  architecture: {
    apps: ArchNodeData[];
    api: ArchNodeData;
    services: ArchNodeData[];
    caption: string;
    observability?: string;
    note?: string;
  };
  engineering: {
    notes: string[];
    testing: { count: number | string; text: string; manual: string[]; inProgress?: string[]; planned: string[] };
    deployment: { environments: string[]; text: string; hosting: string[] };
  };
  /** Work that has started but is not finished: shown before the planned chips. */
  roadmapInProgress?: string[];
  roadmap: string[];
  footer: { title: string; text: string };
}

export type PartRow = {
  title: string; href: string; blurb: string; color: string; group: 'apps' | 'platform'; tag: string;
  /** Features that live inside this part, shown as links on the case-study page. */
  extras?: { label: string; href: string }[];
  /** For the platform part: its chapters, linked from the case-study page. */
  chapters?: { title: string; blurb: string; href: string }[];
};
