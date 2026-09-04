"use server";

import ContactElement from "@/components/ContactElement";
import React from "react";
import { allPeople } from "content-collections";
import ItalyMap from "@/components/ItalyMap";
import stats from "@/data/stats.json";
import {setRequestLocale} from 'next-intl/server';

function SectionHeading({
  children,
  accent = "blue",
}: {
  children: React.ReactNode;
  accent?: "blue" | "emerald";
}) {
  const line =
    accent === "emerald"
      ? "from-emerald-400 to-teal-500"
      : "from-blue-500 to-indigo-600";
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800 tracking-tight">{children}</h2>
      <div className={`mt-1 h-0.5 w-12 rounded-full bg-gradient-to-r ${line}`} />
    </div>
  );
}

function StatCard({
  value,
  label,
  gradient,
}: {
  value: number;
  label: string;
  gradient: string;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md flex flex-col items-center justify-center gap-1`}>
      <span className="text-4xl font-extrabold tracking-tight">{value}</span>
      <span className="text-sm font-medium opacity-90">{label}</span>
    </div>
  );
}

function HorizontalBar({
  label,
  count,
  max,
  color,
}: {
  label: string;
  count: number;
  max: number;
  color: string;
}) {
  const pct = Math.round((count / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 text-xs text-gray-600 font-medium truncate text-right shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-xs text-gray-500 font-semibold shrink-0">{count}</span>
    </div>
  );
}

// Palette for the role donut — enough colours for up to 10 segments
const DONUT_COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#ec4899", // pink
  "#14b8a6", // teal
  "#8b5cf6", // violet
  "#f97316", // orange
  "#06b6d4", // cyan
  "#a3e635", // lime
];

function DonutChart({ data }: { data: { label: string; count: number }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const R = 54; // outer radius
  const r = 32; // inner radius (hole)
  const cx = 70;
  const cy = 70;

  // Build SVG arc segments
  let cumAngle = -Math.PI / 2; // start at top
  const segments = data.map((item, i) => {
    const frac = item.count / total;
    const angle = frac * 2 * Math.PI;
    const x1 = cx + R * Math.cos(cumAngle);
    const y1 = cy + R * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + R * Math.cos(cumAngle);
    const y2 = cy + R * Math.sin(cumAngle);
    const ix1 = cx + r * Math.cos(cumAngle);
    const iy1 = cy + r * Math.sin(cumAngle);
    const ix2 = cx + r * Math.cos(cumAngle - angle);
    const iy2 = cy + r * Math.sin(cumAngle - angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = [
      `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
      `A ${R} ${R} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
      `L ${ix1.toFixed(2)} ${iy1.toFixed(2)}`,
      `A ${r} ${r} 0 ${largeArc} 0 ${ix2.toFixed(2)} ${iy2.toFixed(2)}`,
      "Z",
    ].join(" ");
    return { d, color: DONUT_COLORS[i % DONUT_COLORS.length], ...item };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* SVG donut */}
      <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
        {segments.map((seg, i) => (
          <path key={i} d={seg.d} fill={seg.color} className="transition-opacity hover:opacity-80" />
        ))}
        {/* Centre label */}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1f2937">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#6b7280">Young</text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 w-full">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-600 flex-1 truncate">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-800">{seg.count}</span>
            <span className="text-xs text-gray-400 w-8 text-right">{Math.round((seg.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSection() {
  const cityMax = stats.topCities[0]?.count ?? 1;
  const affMax = stats.topAffiliations[0]?.count ?? 1;

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">In numeri</h3>
        <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-5" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard value={stats.total}  label="Membri totali" gradient="from-blue-500 to-indigo-600" />
          <StatCard value={stats.young}  label="Young"         gradient="from-emerald-500 to-teal-600" />
          <StatCard value={stats.senior} label="Senior"        gradient="from-violet-500 to-purple-600" />
        </div>
      </div>

      {/* Role donut */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          Ruoli dei membri Young
        </h4>
        <DonutChart data={stats.youngByRole} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top cities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
            Top città
          </h4>
          <div className="space-y-2.5">
            {stats.topCities.map((row) => (
              <HorizontalBar
                key={row.label}
                label={row.label}
                count={row.count}
                max={cityMax}
                color="bg-gradient-to-r from-blue-400 to-indigo-500"
              />
            ))}
          </div>
        </div>

        {/* Top affiliations */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
            Top atenei
          </h4>
          <div className="space-y-2.5">
            {stats.topAffiliations.map((row) => (
              <HorizontalBar
                key={row.label}
                label={row.label}
                count={row.count}
                max={affMax}
                color="bg-gradient-to-r from-emerald-400 to-teal-500"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function TeamPage({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);
  
  const direttivoPeopleSenior = allPeople
    .filter(
      (person) => person.occupation === "direttivo" && person.level === "senior",
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const direttivoPeopleYoung = allPeople.filter(
    (person) => person.occupation === "direttivo" && person.level === "young",
  );

  const comitatoPeople = allPeople.filter(
    (person) => person.occupation === "comitato",
  );

  const smmPeople = allPeople.filter((person) => person.occupation === "smm");

  const youngPeople = allPeople.filter((person) => person.level === "young");
  const seniorPeople = allPeople.filter((person) => person.level === "senior");

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-8">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          La Nostra Squadra
        </h1>
        <p className="mt-2 text-gray-500">
          Conosci le persone che guidano e animano Infolife e Young.
        </p>
        <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
      </div>

      <main className="space-y-10">
        {/* Direttivo Infolife */}
        <section>
          <SectionHeading accent="blue">Direttivo Infolife</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {direttivoPeopleSenior.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>

        {/* Comitato Infolife */}
        <section>
          <SectionHeading accent="blue">Comitato Infolife</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {comitatoPeople.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>

        {/* Direttivo Young */}
        <section>
          <SectionHeading accent="emerald">Direttivo Young</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {direttivoPeopleYoung.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>

        {/* Gestori Web e Social */}
        <section>
          <SectionHeading accent="blue">Gestori Web e Social</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {smmPeople.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>

        {/* Italy Map */}
        <ItalyMap />

        {/* Statistics */}
        <StatsSection />

        {/* Squadra Infolife */}
        <section>
          <SectionHeading accent="blue">La nostra squadra Infolife</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {seniorPeople.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>

        {/* Squadra Young */}
        <section className="pb-24">
          <SectionHeading accent="emerald">La nostra squadra Young</SectionHeading>
          <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {youngPeople.map((person, index) => (
              <li key={index}>
                <ContactElement {...person} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
