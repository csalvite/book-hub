'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Aside() {
  return (
    <div className='vertical-accordion'>
      <Accordion isCompact className='accordion-vertical'>
        <AccordionItem key='1' title='Sección 1'>
          Contenido de la sección 1
        </AccordionItem>
        <AccordionItem key='2' title='Sección 2'>
          Contenido de la sección 2
        </AccordionItem>
        <AccordionItem key='3' title='Sección 3'>
          Contenido de la sección 3
        </AccordionItem>
      </Accordion>
    </div>
  );
}
