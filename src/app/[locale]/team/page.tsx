import ContactElement from "@/components/ContactElement";
import React from "react";
import { allPeople } from "content-collections";
import ItalyMap from "@/components/ItalyMap";
import stats from "@/data/stats.json";
import {useTranslations} from 'next-intl';
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
  const percentage = (count / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{count}</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function TeamPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('team');
  
  const youngMembers = allPeople.filter((p) => p.level === "young");
  const seniorMembers = allPeople.filter((p) => p.level === "senior");

  const nodes = Array.from(new Set(allPeople.map((p) => p.location))).length;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 pb-32">
      <div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 max-w-2xl">
          A network of passionate researchers spread across Italy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          value={allPeople.length}
          label={t('members')}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          value={nodes}
          label={t('nodes')}
          gradient="from-emerald-400 to-teal-500"
        />
        <StatCard
          value={youngMembers.length}
          label={t('young')}
          gradient="from-orange-400 to-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SectionHeading accent="blue">{t('seniors')}</SectionHeading>
          <div className="space-y-6">
            {seniorMembers.slice(0, 8).map((person) => (
              <ContactElement 
                key={person.name} 
                name={person.name}
                location={person.location}
                affiliation={person.affiliation}
                occupation={person.occupation}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading accent="emerald">{t('young')}</SectionHeading>
          <div className="space-y-6">
            {youngMembers.slice(0, 8).map((person) => (
              <ContactElement 
                key={person.name} 
                name={person.name}
                location={person.location}
                affiliation={person.affiliation}
                occupation={person.occupation}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionHeading>Geography</SectionHeading>
        <ItalyMap />
      </div>
    </div>
  );
}
