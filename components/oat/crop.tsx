/* eslint-disable @next/next/no-img-element -- app screenshots, cropped by CSS so one picture serves several frames */

/* A region of a 1440×900 app screenshot, in its CSS pixels */
export type Rect = { x: number; y: number; w: number; h: number };

/* One region of a screenshot, scaled to the box: the picture is sized so the region fills it */
export function Crop({ src, rect, alt, className = "", fadeRight = false, eager = false }: { src: string; rect: Rect; alt: string; className?: string; fadeRight?: boolean; eager?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${rect.w} / ${rect.h}` }}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} width={2880} height={1800} className="absolute max-w-none" style={{ width: `${(1440 / rect.w) * 100}%`, left: `${(-rect.x / rect.w) * 100}%`, top: `${(-rect.y / rect.h) * 100}%` }} />
      {/* A crop that cuts through the app's rows fades out, so the cut reads as intended */}
      {fadeRight && <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--o-panel,#fffdf9)] to-transparent sm:w-24" />}
    </div>
  );
}

/* The same view framed twice: the wide region from a tablet up, a narrow one on phones so the words stay readable */
export function Shot({ src, rect, phone, alt, fadeRight = false }: { src: string; rect: Rect; phone: Rect; alt: string; fadeRight?: boolean }) {
  return (
    <>
      <Crop src={src} rect={rect} alt={alt} fadeRight={fadeRight} className="hidden sm:block" />
      <Crop src={src} rect={phone} alt={alt} fadeRight className="sm:hidden" />
    </>
  );
}
