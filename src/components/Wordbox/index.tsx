import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox: React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  console.log(lettersLeft)

  const handleLetters = (e: KeyboardEvent) => {
    if (e.key === lettersLeft[0]) {
      setLettersLeft(lettersLeft.slice(1))
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
