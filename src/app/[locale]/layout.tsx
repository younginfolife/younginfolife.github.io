import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import {routing} from '@/routing';
import {NextIntlClientProvider} from 'next-intl';
import {AppNavbar} from "@/components/app-navbar";
import {setRequestLocale} from 'next-intl/server';
import enMessages from '@/messages/en.json';
import itMessages from '@/messages/it.json';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

const messages = {
  en: enMessages,
  it: itMessages,
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>) {
  return {
    title: {
      template: `%s | Young InfoLife`,
      default: 'Young InfoLife'
    },
    description: 'La piattaforma per la Bioinformatica'
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Set the locale for the request context
  setRequestLocale(locale);

  const localeMessages = messages[locale as keyof typeof messages];

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={localeMessages} locale={locale}>
          <AppNavbar locale={locale} />
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
