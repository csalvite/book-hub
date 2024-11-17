/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { memo, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { useInvertedBorderRadius } from '../../utils/use-inverted-border-radius';
import { ContentPlaceholder } from './ContentPlaceholder';
import { Title } from './Title';
import { Image } from './Image';
import { openSpring, closeSpring } from './animations';
import { useScrollConstraints } from '../../utils/use-scroll-constraints';
import { useWheelScroll } from '../../utils/use-wheel-scroll';
import { CardData } from '@/interfaces/card-data';
import Link from 'next/link';

interface Props extends CardData {
  history?: any;
}

// Distancia en píxeles para detectar swipe-to-dismiss
const dismissDistance = 150;

export const Card = memo(
  ({ id, title, category, pointOfInterest, backgroundColor }: Props) => {
    const [isSelected, setIsSelected] = React.useState(false);
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    const router = useRouter(); // Hook de Next.js para manejar navegación

    const inverted = useInvertedBorderRadius(20);

    // Calcula las restricciones de desplazamiento
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      if (y.get() > dismissDistance) {
        router.push('/'); // Navega al inicio si se detecta un swipe
      }
    }

    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // Maneja el scroll con rueda del mouse
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );

    return (
      <li ref={containerRef} className={`card`}>
        <Overlay isSelected={isSelected} setIsSelected={setIsSelected} />
        <div
          className={`card-content-container ${
            isSelected
              ? 'open'
              : 'hover:scale-105 transition-all cursor-pointer'
          }`}
          onClick={() => setIsSelected(true)}
        >
          <motion.div
            ref={cardRef}
            className='card-content'
            style={{ ...inverted, zIndex, y }}
            layout
            transition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
            />
            <Title title={title} category={category} isSelected={isSelected} />
            <ContentPlaceholder />
          </motion.div>
        </div>
      </li>
    );
  }
  // (prev, next) => prev.isSelected === next.isSelected
);

const Overlay = ({
  isSelected,
  setIsSelected,
}: {
  isSelected: boolean;
  setIsSelected: any;
}) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    className='overlay'
    onClick={() => setIsSelected(false)}
  ></motion.div>
);
