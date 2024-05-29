import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  active: boolean;
  onFinish: () => void;
  onMistake: () => void;
  onTimer: () => void;
  onKeyStroke: () => void;
}

export const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake, onTimer, onKeyStroke }) => {
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
        onMistake()
      }
    }
    onKeyStroke()
  }

  const handleTimer = (e: KeyboardEvent) => {
    if (e.key) {
      onTimer()
    }
  }

  useEffect(() => {
    if (active) {
      console.log("spuštění efektu 1")
      console.log(mistake, lettersLeft)
      console.log(active)

      document.addEventListener("keyup", handleLetters)
      return () => {
        document.removeEventListener("keyup", handleLetters)
      }
    }
  }, [lettersLeft, mistake, active, onMistake])

  useEffect(() => {
    console.log("spuštění efektu 2")
    window.addEventListener("keydown", handleTimer)
    return () => {
      window.removeEventListener("keydown", handleTimer)
    }
  }, [])

  return (
    <div className={`wordbox ${mistake && "wordbox--mistake"}`}>{lettersLeft}</div>
  );
};

export default Wordbox;
