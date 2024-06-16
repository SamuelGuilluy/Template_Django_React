import React, { useState, useEffect } from 'react';

// Composant pour afficher progressivement le texte
const ProgressiveText = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + text[index]);
            setIndex(index + 1);
          }, speed);
          return () => clearTimeout(timeout);
        }
      }, [index, text, speed]);
  
    return <span>{displayedText}</span>;
  };

export default ProgressiveText;