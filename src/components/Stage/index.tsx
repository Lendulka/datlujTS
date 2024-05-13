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
  const [words, setWords] = useState<string[]>(["jahoda"]);

  console.log(words)

  const handleFinish = (): void => {
    const newWord = generateWord(6)
    if (newWord !== null) {
      setWords([newWord])
    }
  }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => <Wordbox word={word} key={word} onFinish={handleFinish} />)}
      </div>
    </div>
  );
};

export default Stage;
