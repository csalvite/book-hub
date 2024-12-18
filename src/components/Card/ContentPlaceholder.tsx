/* eslint-disable react/display-name */
import * as React from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';
import { motion } from 'framer-motion';

export const ContentPlaceholder = React.memo(() => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Establece que el cliente ya ha montado
  }, []);

  if (!isClient) {
    return null; // No renderizar en el servidor
  }

  return (
    <motion.div
      className='content-container'
      layout
      style={{ originY: 0, originX: 0 }}
    >
      <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />
    </motion.div>
  );
});
