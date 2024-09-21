import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
