import * as React from 'react';
import { motion } from 'framer-motion';
import { closeSpring } from './animations';

export const Image = ({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}: {
  id: any;
  isSelected: boolean;
  pointOfInterest?: number;
  backgroundColor: string;
}) => {
  return (
    <motion.div
      className='card-image-container hover:scale-105 transition-all'
      style={{ backgroundColor, originX: 0, originY: 0 }}
      layout // Esto permite a framer-motion manejar el layout de forma inteligente
      animate={{
        scale: isSelected ? 1.05 : 1, // Controla el tamaño del elemento al seleccionarlo
      }}
    >
      <motion.img
        className='card-image'
        src={`images/${id}.jpg`}
        alt=''
        initial={false}
        animate={{
          x: isSelected ? -20 : -pointOfInterest,
          y: isSelected ? -20 : 0,
        }}
        transition={closeSpring}
      />
    </motion.div>
  );
};
