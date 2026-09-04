import React from "react";
import { Card } from "@/components/ui/card";
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

export default function ApplyPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('apply');
  
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 pb-32">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <Card className="p-6 shadow-md bg-white">
        <p className="text-gray-700 mb-4">
          {t('description')}
        </p>
        <p className="text-gray-700 mb-4">
          To join CINI Young-InfoLife, please contact us at:
        </p>
        <a
          href="mailto:contact@ciniyounginfo.life"
          className="text-blue-600 hover:underline font-semibold"
        >
          contact@ciniyounginfo.life
        </a>
      </Card>
    </div>
  );
}
