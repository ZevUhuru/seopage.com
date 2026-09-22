"use client";

import { useState } from "react";

export const CHECKS = [
  { t: "Title fits on Google", why: "Titles past about 60 characters get cut off. A title that fits, with the search in it, is the first thing Google and AI read." },
  { t: "Description that earns the click", why: "The meta description is your ad in the results. The right length, with the search and the city, gets shown instead of a random snippet." },
  { t: "One clear headline", why: "One H1 tells search engines what the page is about. Two or none makes them guess." },
  { t: "Your search in all three", why: "The search you want to win belongs in the title, the headline, and the description. Live research picks it; the builder places it." },
  { t: "Your city up front", why: "Local searches match pages that name the place. A city in the title and headline makes the page local." },
  { t: "Four or more direct answers", why: "AI answers quote short, self-contained answers. An FAQ written that way is what gets lifted into an answer." },
  { t: "The questions people ask, covered", why: "We pull the questions Google shows under People also ask for your search, and make sure the page answers them." },
  { t: "Business schema", why: "LocalBusiness structured data tells Google and AI assistants who you are, where, and how to reach you." },
  { t: "FAQ schema", why: "FAQPage structured data marks your answers as answers, matched to the visible text, the way Google asks." },
  { t: "A number to tap", why: "Most local searches happen on a phone. One tap from the answer to a call is the whole point." },
];

/** The ten checks: pick one to see why it matters. */
export function ChecksExplorer() {
  const [picked, setPicked] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="flex flex-col gap-7 lg:col-span-5">
        <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02]">
          Ten things Google and AI read. Every one scored before you pay.
        </h2>
        <div className="flex flex-col gap-2.5 rounded-[20px] border border-[#3D6BFF]/35 bg-[#04060B] p-7" aria-live="polite">
          <p className="text-[20px] font-semibold">{CHECKS[picked].t}</p>
          <p className="text-[16px] leading-[1.6] text-[#C9D0E2]">{CHECKS[picked].why}</p>
        </div>
      </div>
      <ul className="flex flex-col border-t border-white/12 lg:col-span-6 lg:col-start-7">
        {CHECKS.map((c, i) => {
          const on = picked === i;
          return (
            <li key={c.t}>
              <button
                onClick={() => setPicked(i)}
                aria-pressed={on}
                className={`flex w-full items-center gap-4 border-b border-white/12 px-1 py-5 text-left text-[19px] transition-colors ${on ? "font-semibold text-[#EEF2FF]" : "text-[#A0A9C0] hover:text-[#EEF2FF]"}`}
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${on ? "bg-[#3D6BFF] shadow-[0_0_0_5px_rgba(61,107,255,.22)]" : "bg-white/20"}`}
                />
                {c.t}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
