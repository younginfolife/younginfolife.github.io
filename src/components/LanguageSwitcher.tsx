'use client';

import { useState, useEffect } from 'react';

interface LanguageSwitcherProps {
  onLanguageChange: (language: 'en' | 'it') => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<'en' | 'it'>('it');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('eventLanguage') as 'en' | 'it' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  const toggleLanguage = (lang: 'en' | 'it') => {
    setLanguage(lang);
    localStorage.setItem('eventLanguage', lang);
    onLanguageChange(lang);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => toggleLanguage('it')}
        className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
          language === 'it'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        title="Italiano"
      >
        <span className="text-xl">🇮🇹</span>
        Italiano
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        title="English"
      >
        <span className="text-xl">🇬🇧</span>
        English
      </button>
    </div>
  );
}
