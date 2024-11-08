import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../../styles/global.css';
import Layout from '@/components/layout/Layout';

import clsx from 'clsx';
import { Cairo, Open_Sans } from 'next/font/google';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const store = setupStore();

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    // notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale || 'en'}>
      <body
        className={clsx(
          cairo.className,
          openSans.className,
          'text-blck dark:text-white dark:bg-violet-900 min-h-[100svh]',
        )}
      >
        <Provider store={store}>
          <NextIntlClientProvider messages={messages}>
            <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
