import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const OpenCards = () => {
  const [selectedId, setSelectedId] = useState<{
    id: number;
    title: string;
    subtitle: string;
  } | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const items = [
    { id: 1, title: 'prueba 1', subtitle: 'subtitle prueba 1' },
    { id: 2, title: 'prueba 2', subtitle: 'subtitle prueba 2' },
    { id: 3, title: 'prueba 3', subtitle: 'subtitle prueba 3' },
  ];

  useEffect(() => {
    // Obtener el archivo CSV y procesar los datos (tu código previo)
    // ...

    // Listener para hacer click fuera del div
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setSelectedId(null); // Si se hace clic fuera, se pone setOpen en false
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: elimina el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedId]);

  return (
    <div className='bg-zinc-400 p-4 flex flex-wrap relative items-center justify-center'>
      <div className='flex gap-4'>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id.toString()}
            onClick={() => setSelectedId(item)}
            className='bg-red-500 w-32 h-32'
          >
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            ref={divRef}
            layoutId={selectedId.id.toString()}
            className='bg-green-500 w-56 h-32 absolute z-10'
          >
            <motion.h5>{selectedId.subtitle}</motion.h5>
            <motion.h2>{selectedId.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
