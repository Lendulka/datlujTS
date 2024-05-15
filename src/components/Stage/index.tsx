import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const generateWord = (size: number) => {

  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
}

const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(["jahoda", "malina", "banán"]);
  const [mistakes, setMistakes] = useState<number>(0)

  console.log(words)

  const handleFinish = (): void => {
    const newWord = generateWord(6)
    if (newWord !== null) {
      const copyArray = [...words]
      const result = copyArray.slice(1, 3)
      result.push(newWord)
      setWords(result)
    }
  }

  const handleMistake = (): void => {
    setMistakes(mistakes + 1)
  }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) =>
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0 ? true : false}
            onMistake={handleMistake}
          />
        )}
      </div>
    </div>
  );
};

export default Stage;
