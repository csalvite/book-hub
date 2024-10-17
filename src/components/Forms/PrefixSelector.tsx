'use client';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import Flag from 'react-flagpack';
import { motion } from 'framer-motion';

type CountryData = {
  nombre: string;
  name: string;
  nom: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  // Puedes agregar más propiedades según las columnas de tu CSV
};

export const PrefixSelector = ({
  prefix,
  setPrefix,
}: {
  prefix: string;
  setPrefix: (prefix: string) => void;
}) => {
  const [data, setData] = useState<CountryData[]>([]); // Definir el tipo del estado
  const [selection, setSelection] = useState<CountryData>();
  const [open, setOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Obtener el archivo CSV ubicado en public/docs/paises.csv
    fetch('/docs/paises.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Procesar el contenido del CSV con PapaParse
        Papa.parse(csvText, {
          header: true, // Si el CSV tiene encabezados
          complete: (result) => {
            const rawData = result.data as CountryData[];

            // Definir los países más conocidos
            const knownCountries = ['España', 'Portugal', 'Francia'];

            // Ordenar para que los países conocidos aparezcan primero
            const sortedData = rawData.sort((a, b) => {
              const indexA = knownCountries.indexOf(a.nombre);
              const indexB = knownCountries.indexOf(b.nombre);

              if (indexA !== -1 && indexB === -1) return -1;
              if (indexA === -1 && indexB !== -1) return 1;
              return 0;
            });

            setData(sortedData); // Guardar el contenido ordenado en el estado
            if (prefix) {
              setSelection(
                sortedData.filter(
                  (data) =>
                    data.phone_code === prefix.substring(1, prefix.length)
                )[0]
              );
            } else {
              setSelection(sortedData[0]);
            }
          },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Obtener el archivo CSV y procesar los datos (tu código previo)
    // ...

    // Listener para hacer click fuera del div
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen(false); // Si se hace clic fuera, se pone setOpen en false
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: elimina el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  const handleSelectPrefix = (e: any) => {
    const select = data.find((country) => country.iso3 === e.currentTarget.id);

    setSelection(select);
    if (setPrefix) {
      setPrefix(`+${select?.phone_code}`);
    }
    setOpen(false);
  };

  return (
    selection && (
      <div ref={divRef}>
        <div
          className='cursor-pointer w-[5rem] p-2 h-auto flex justify-between items-center'
          onClick={() => setOpen(!open)}
        >
          <Flag code={selection.iso3} size='M' />
          <span>+{selection.phone_code}</span>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className='h-64 w-24 z-10 border absolute overflow-y-scroll custom-scrollbar bg-white'
          >
            {data?.map((country) => {
              return (
                <div
                  key={country.iso2}
                  onClick={handleSelectPrefix}
                  id={country.iso3}
                  className='w-full p-2 h-auto flex justify-between items-center cursor-pointer hover:bg-teal-300'
                >
                  <Flag code={country.iso3} size='M' />
                  <span className='text-xs'>+{country.phone_code}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    )
  );
};
