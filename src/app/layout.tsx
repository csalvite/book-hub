import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'BookHub',
  description: 'Crea tu reserva',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body>
        <Providers>{children}</Providers>
      </body>
      <Script
        src='https://kit.fontawesome.com/73ad37a527.js'
        crossOrigin='anonymous'
      ></Script>
    </html>
  );
}
