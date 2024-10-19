import clsx from 'clsx';
import '../styles/global.css';
import { Cairo, Open_Sans } from 'next/font/google';

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
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
      {children}
    </body>
  </html>
);

export default RootLayout;
