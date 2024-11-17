import * as React from 'react';
import { motion } from 'framer-motion';
import { closeSpring, openSpring } from './animations';

export const Title = ({
  title,
  category,
  isSelected,
}: {
  title: any;
  category: any;
  isSelected: any;
}) => {
  const x = isSelected ? 30 : 15;
  const y = x;

  return (
    <motion.div
      className='title-container'
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      layout // Esto maneja automáticamente el layout y las animaciones cuando cambian las propiedades
      style={{ originX: 0, originY: 0 }}
    >
      <span className='category'>{category}</span>
      <h2>{title}</h2>
    </motion.div>
  );
};
