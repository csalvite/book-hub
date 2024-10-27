import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autenticación',
  description: 'Login o registro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body>
        <main
          className={`min-w-full h-dvh flex items-center justify-center bg-[url('/images/background.webp')] bg-cover bg-center`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
