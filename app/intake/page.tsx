import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { IntakeForm } from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Build your page",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return (
    <>
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <Logo />
        </div>
      </header>
      <main>
        <IntakeForm />
      </main>
    </>
  );
}
