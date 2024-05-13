import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  console.log(lettersLeft)

  const handleLetters = (e: KeyboardEvent) => {
    if (lettersLeft.length > 0) {
      if (e.key === lettersLeft[0]) {
        if (lettersLeft.length === 1) {
          onFinish()
        } else {
          setLettersLeft(lettersLeft.slice(1))
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleLetters)
    return () => {
      document.removeEventListener("keyup", handleLetters)
    }
  }, [lettersLeft])

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;
