'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {useLocale} from 'next-intl';

interface EventPageContentProps {
  event: any;
  eventENVersion?: any;
}

export default function EventPageContent({ event, eventENVersion }: EventPageContentProps) {
  const currentLocale = useLocale();
  const [language, setLanguage] = useState<'en' | 'it'>(currentLocale as 'en' | 'it');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Use English version if available and language is set to English
  const currentEvent = language === 'en' && eventENVersion ? eventENVersion : event;
  const shouldShowLanguageSwitcher = !!eventENVersion;

  return (
    <div className="prose mx-auto pb-32 p-4">
      {shouldShowLanguageSwitcher && (
        <div className="not-prose mb-6">
          <LanguageSwitcher onLanguageChange={setLanguage} />
        </div>
      )}
      
      <h1>{currentEvent.name}</h1>
      <div className="not-prose">
        <div className="mx-auto flex flex-row items-center gap-6">
          <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 bg-gray-50 rounded relative">
            {currentEvent.logo && (
              <Image
                src={currentEvent.logo}
                fill
                alt={currentEvent.name}
                className="object-contain rounded"
              />
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="text-sm text-gray-500 truncate">
              <div className="text-sm text-gray-500 truncate">
                {currentEvent.dateEnd
                  ? `From ${currentEvent.dateStart} to ${currentEvent.dateEnd}`
                  : currentEvent.dateStart}
              </div>
            </div>
            <p className="text-gray-700">{currentEvent.description}</p>
            {currentEvent.website && (
              <a
                href={currentEvent.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-1"
              >
                Visit event website
              </a>
            )}
          </div>
        </div>
      </div>
      <ImageCarousel images={currentEvent.carouselImages || []} />
      <div dangerouslySetInnerHTML={{ __html: currentEvent.html }} />
      {currentEvent.long_description && (
        <p className="text-gray-700">{currentEvent.long_description}</p>
      )}
    </div>
  );
}
