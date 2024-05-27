import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
  onKeyDown: () => void;
}

export const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake, onKeyDown }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false)
  const [keyDown, setKeyDown] = useState<boolean>(false)

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
  }

  const handleTimer = (e: KeyboardEvent) => {
    if (e.key) {
      setKeyDown(true)
      onKeyDown()
    }
  }

  useEffect(() => {
    if (active) {
      console.log("spuštění efektu")
      console.log(mistake, lettersLeft)
      console.log(active)

      document.addEventListener("keyup", handleLetters)
      return () => {
        document.removeEventListener("keyup", handleLetters)
      }
    }
  }, [lettersLeft, mistake, active, onMistake])


  useEffect(() => {
    document.addEventListener("keydown", handleTimer)
    return () => {
      document.removeEventListener("keydown", handleTimer)
    }
  }, [])



  return (
    <div className={`wordbox ${mistake && "wordbox--mistake"}`}>{lettersLeft}</div>
  );
};

export default Wordbox;
