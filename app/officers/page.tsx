import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import LanyardScroller from "@/components/officers/lanyard-scroller";

export const metadata: Metadata = {
  title: "ADC | Officers",
  description:
    "Meet the UMN App Developers Club officers leading workshops, projects, and community.",
};

const officers = [
  {
    name: "Victor",
    role: "President",
    modelUrl: "/lanyard/victor.glb",
  },
  {
    name: "Alex",
    role: "Vice-President",
    modelUrl: "/lanyard/alex.glb",
  },
  {
    name: "Qise",
    role: "Secretary",
    modelUrl: "/lanyard/qise.glb",
  },
  {
    name: "Kieran",
    role: "Tech Lead",
    modelUrl: "/lanyard/kieran.glb",
  },
  {
    name: "Johnny",
    role: "Treasurer",
    modelUrl: "/lanyard/johnny.glb",
  },
  {
    name: "Agness",
    role: "Marketing Lead",
    modelUrl: "/lanyard/agness.glb",
  },
];

export default function OfficersPage() {
  return (
    <main className="relative">
      <Navigation />

      <section className="relative z-10 overflow-hidden bg-indigo text-white pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(198,235,247,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.2),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(0,0,0,0.35),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="font-mono text-sm text-white/80">// officers</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            The team behind the build
          </h1>
          <p className="font-serif text-lg md:text-xl text-white/80 max-w-2xl text-pretty">
            ADC officers keep projects moving, workshops teaching, and the
            community welcoming. Scroll through to meet the crew.
          </p>
        </div>
      </section>

      <section className="relative z-0 -mt-16 md:-mt-24 pt-0 pb-0 bg-transparent">
        <LanyardScroller officers={officers} />
      </section>

      <Footer />
    </main>
  );
}
