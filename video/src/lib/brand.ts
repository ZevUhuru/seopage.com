/**
 * Facts the video states. The price mirrors seopage.com lib/config.ts and
 * create.seopage.com lib/config.ts; a rendered video can't read them, so
 * change both there first, then here, then re-render every cut.
 */
export const PRICE = "$199";
export const PRICE_AFTER = "$249";
export const SITE = "seopage.com";

/** The homepage replay's example shop (components/home/Personalize.tsx). */
export const DEMO = { name: "Lind Plumbing", service: "Plumbing", city: "Denver", slug: "lind-plumbing" };

export const FPS = 30;
export const s = (sec: number) => Math.round(sec * FPS);
