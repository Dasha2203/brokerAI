import clsx from 'clsx';
import '../styles/global.css';
import { Cairo, Open_Sans } from 'next/font/google';
import Layout from '@/components/layout/Layout';

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const RootLayout = async ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: never;
}) => {
  return (
    <html lang={locale}>
      <head>
        <title>Broker AI</title>
      </head>
      <body
        className={clsx(
          cairo.className,
          openSans.className,
          'text-blck dark:text-white dark:bg-violet-900 min-h-[100svh]',
        )}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
