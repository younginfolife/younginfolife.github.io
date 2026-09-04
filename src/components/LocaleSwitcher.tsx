'use client';

import { routing } from '@/routing';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface LocaleSwitcherProps {
  locale: string;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    setIsLoading(true);
    
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale segment
    
    const newPathname = segments.join('/');
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          disabled={isLoading}
          className={`px-3 py-2 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${
            locale === loc
              ? loc === 'it'
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={loc === 'it' ? 'Italiano' : 'English'}
        >
          <span className="text-lg">{loc === 'it' ? '🇮🇹' : '🇬🇧'}</span>
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
