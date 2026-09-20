/** Clubhouse Almanac content model: focused coaching problems, clear tiers, and shareable update notes. */
export type Tier = "starter" | "deep";
export type Article = { slug: string; tier: Tier; tags: string[]; title: string; description: string; date: string; readTime: string; intro: string; sections: { heading: string; copy: string[] }[] };
export type Update = { slug: string; type: "product update" | "development note"; date: string; title: string; summary: string; details: string[]; published_at?: string; meta_description?: string };

export const topicTags = [
  "Coaching as a Profession",
  "Running a Coaching Business That Lasts",
  "The Coach-Parent Relationship, Done Properly",
  "Player Development With a System Behind It",
];

export const topicDescriptions: Record<string, string> = {
  "Coaching as a Profession": "For coaches still developing their judgement, reflective practice and standards, not looking for a quick drill.",
  "Running a Coaching Business That Lasts": "For coaches thinking in seasons and years, where structure and continuity matter more than short-term volume.",
  "The Coach-Parent Relationship, Done Properly": "For coaches who believe parents deserve a clear, professional account of progress and trust.",
  "Player Development With a System Behind It": "For coaches who know development needs a record, a next step and enough structure to prove what happened.",
};
