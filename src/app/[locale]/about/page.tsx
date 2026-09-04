import React from "react";
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

export default function AboutPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('about');
  
  return (
    <div className="max-w-3xl mx-auto p-2">
      <article className="prose pb-32 mx-auto">
        <h1 className="text-3xl font-bold">
          {t('title')}
        </h1>
        <p>
          {t('established')}
        </p>
        <p>
          {t('growth')}
        </p>
        <p>
          {t('activities')}
        </p>
        <p>
          {t('methodological')}
        </p>
      </article>
    </div>
  );
}
