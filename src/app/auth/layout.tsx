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
    <main
      className={`min-w-full min-h-screen flex items-center justify-center bg-[url('/images/background.webp')] bg-cover bg-center`}
    >
      {children}
    </main>
  );
}
