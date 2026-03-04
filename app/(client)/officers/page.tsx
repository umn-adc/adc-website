import type { Metadata } from 'next';
import Link from 'next/link';
import LanyardScroller from '@/components/officers/lanyard-scroller';
import {
  getOfficerFullName,
  getOfficerHexCode,
  mapOfficerSourcesToProfiles,
} from '@/lib/officers';
import { sanityFetch } from '@/sanity/lib/live';
import { OFFICERS_QUERY } from '@/sanity/lib/queries';
import type { OFFICERS_QUERYResult } from '@/sanity/types';

export const metadata: Metadata = {
  title: 'ADC | Officers',
  description:
    'Meet the UMN App Developers Club officers leading workshops, projects, and community.',
};

const OfficersPage = async () => {
  const { data } = await sanityFetch({ query: OFFICERS_QUERY });
  const officers = mapOfficerSourcesToProfiles(
    Array.isArray(data) ? (data as OFFICERS_QUERYResult) : []
  );

  const lanyardOfficers = officers.map((officer) => ({
    name: getOfficerFullName(officer),
    role: officer.positions[0]?.position ?? 'Officer',
    modelUrl: officer.modelUrl,
  }));

  return (
    <main className="relative">
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
        <LanyardScroller officers={lanyardOfficers} />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {officers.map((officer) => (
          <article
            key={officer.id}
            className="rounded-2xl border border-border/60 bg-card p-5"
          >
            <p className="font-mono text-xs text-muted-foreground">
              id: {officer.id}
            </p>
            <h2 className="font-sans text-xl font-semibold mt-2">
              {getOfficerFullName(officer)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {officer.positions[0]?.position}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link
                href={`/officers/${officer.slug}`}
                className="underline underline-offset-4"
              >
                /officers/{officer.slug}
              </Link>
              <Link
                href={`/officers/${getOfficerHexCode(officer)}`}
                className="underline underline-offset-4"
              >
                /officers/{getOfficerHexCode(officer)}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default OfficersPage;
