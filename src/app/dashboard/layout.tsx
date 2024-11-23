import Aside from '@/components/Dashboard/Aside';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`min-h-dvh flex flex-col md:flex-row items-center justify-center relative`}
    >
      <aside className='md:h-full min-h-16 md:min-h-dvh w-full md:w-64 bg-red-400 fixed bottom-0 md:static'>
        <Aside />
      </aside>
      {children}
    </main>
  );
}
