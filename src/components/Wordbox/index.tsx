import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false)

  console.log(lettersLeft)

  const handleLetters = (e: KeyboardEvent) => {
    if (lettersLeft.length > 0) {
      if (e.key === lettersLeft[0]) {
        setMistake(false)
        if (lettersLeft.length === 1) {
          onFinish()
        } else {
          setLettersLeft(lettersLeft.slice(1))
        }
      } else {
        setMistake(true)
      }
    }
  }

  useEffect(() => {
    console.log("spuštění efektu")
    console.log(mistake, lettersLeft)
    document.addEventListener("keyup", handleLetters)
    return () => {
      document.removeEventListener("keyup", handleLetters)
    }
  }, [lettersLeft, mistake])

  return (
    <div className={`wordbox ${mistake && "wordbox--mistake"}`}>{lettersLeft}</div>
  );
};

export default Wordbox;
