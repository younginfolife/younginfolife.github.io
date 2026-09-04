import ContactElement from "@/components/ContactElement";
import React from "react";
import { allPeople } from "content-collections";
import ItalyMap from "@/components/ItalyMap";
import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import { TeamFilters } from "@/components/TeamFilters";

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
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{children}</h2>
      <div className={`mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${line}`} />
    </div>
  );
}

export default async function TeamPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = await getTranslations('team');
  
  // Get leader (Enrico Nardelli - founder)
  const leader = allPeople.find((p) => p.name === "Enrico Nardelli");
  
  // Get coordinators (Direttivo Young members)
  const coordinators = allPeople.filter(
    (p) => p.level === "young" && p.occupation === "direttivo"
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-16 pb-32">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">
          A network of passionate researchers spread across Italy
        </p>
      </div>

      {/* Leader Section */}
      {leader && (
        <section>
          <SectionHeading accent="blue">Leader</SectionHeading>
          <div className="flex justify-center">
            <div className="w-full md:w-96">
              <ContactElement 
                name={leader.name}
                location={leader.location}
                affiliation={leader.affiliation}
                occupation={leader.occupation}
              />
            </div>
          </div>
        </section>
      )}

      {/* Coordinators Section */}
      {coordinators.length > 0 && (
        <section>
          <SectionHeading accent="emerald">Coordinators</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coordinators.map((person) => (
              <div key={person.name}>
                <ContactElement 
                  name={person.name}
                  location={person.location}
                  affiliation={person.affiliation}
                  occupation={person.occupation}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Map Section */}
      <section>
        <SectionHeading>Geography</SectionHeading>
        <ItalyMap />
      </section>

      {/* Complete List Section */}
      <section>
        <SectionHeading accent="blue">Complete Team</SectionHeading>
        <TeamFilters />
      </section>
    </div>
  );
}
