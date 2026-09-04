import React from "react";
import { allPublications } from "content-collections";
import { Card } from "@/components/ui/card";
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

export default function PublicationsPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('publications');
  
  // Sort publications by year (newest first)
  const sortedPublications = [...allPublications].sort((a, b) => {
    const yearA = parseInt(b.Year) || 0;
    const yearB = parseInt(a.Year) || 0;
    return yearA - yearB;
  });
  
  return (
    <div className="max-w-4xl mx-auto w-full p-4 space-y-2 pb-32">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <ul className="space-y-4">
        {sortedPublications.map((pub, i) => {
          return (
            <li key={i}>
              <Card className="rounded-md p-6 shadow-md bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pub.Title}
                </h3>
                <p className="text-gray-700 mb-2">{pub.Authors}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  {pub.Publication && <span>{pub.Publication}</span>}
                  {pub.Year && <span>{pub.Year}</span>}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
