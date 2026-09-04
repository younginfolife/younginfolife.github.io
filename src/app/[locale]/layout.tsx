import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import {routing} from '@/routing';
import {NextIntlClientProvider} from 'next-intl';
import {AppNavbar} from "@/components/app-navbar";
import {getMessages} from 'next-intl/server';
import '../globals.css';
type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

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

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppNavbar />
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
