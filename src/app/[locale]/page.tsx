import AppSocials from "@/components/app-socials";
import ImageCarousel from "@/components/ImageCarousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

interface Highlight {
  title: string;
  image: string;
}

const images = [
  "/events/2026BioHackathon/IMG_20260527_123953.jpg",
  "/events/2026BioHackathon/IMG_3142.jpg",
  "/events/2025CIBB-Milano/Group_cibb25.png",
  "/events/2024BITS-Napoli/IMG_4787.jpg",
  "/events/2025CIBB-Milano/gruppo.jpeg",
  "/events/2025BioHackathon/12d48d39-1f82-451c-8ce8-067177d64a6e.JPG",
  "/carousel/1.jpg",
  "/carousel/2.jpg",
  "/carousel/3.jpg",
  "/carousel/4.JPG",
  "/carousel/5.jpeg",
];

export default function Home({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  
  const highlights: Highlight[] = [
    { title: t('networking'), image: "/assets/networking.png" },
    { title: t('training'), image: "/assets/formazione.png" },
  ];
  
  return (
    <main className="max-w-prose mx-auto flex flex-col gap-8 w-full px-4 md:p-0">
      <article className="prose text-balance pb-32">
        <h1>
          {t('title')}
          <span className="text-brand">{t('bioinformaticaWord')}</span>
          {locale === 'en' ? t('titleMiddle') : ''}{t('titleEnd')}
        </h1>
        <ImageCarousel images={images} />
        <p>
          {t('subtitle')}
        </p>
        <p>
          {t('description')}
        </p>
        <div className="not-prose flex w-full gap-2">
          {highlights.map((e, i) => (
            <Card
              key={i}
              className="p-3 shadow-md rounded-md flex items-center gap-3 flex-1 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={e.image}
                  fill
                  alt={e.title}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-gray-800">{e.title}</p>
            </Card>
          ))}
        </div>
      </article>
      <div className="pb-12">
        <AppSocials />
      </div>
    </main>
  );
}
