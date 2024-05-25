import { useState } from 'react';
import { FormDataStructure } from '../Select/Select';
import wordList from '../../word-list';
import Wordbox from '../Wordbox';
import Select from '../Select/Select';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

console.log(wordList.length)

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

export const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(["jahoda", "malina", "jablko", "ananas"]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [selectCount, setSelectCount] = useState<number>(0)

  console.log(selectCount)

  const handleSubmitData = (data: FormDataStructure) => {
    setSelectCount(data.count)
  }

  const handleFinish = () => {
    let selectNumber = Number(selectCount)
    const newWord = generateWord(selectNumber)
    if (newWord !== null) {
      const copyArray = [...words]
      const result = copyArray.slice(1)
      result.push(newWord)
      setWords(result)
    }
  }

  const handleMistake = () => {
    setMistakes(mistakes + 1)
  }

  return (
    <div className="stage">
      <Select count={selectCount} onSubmitData={handleSubmitData} />
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
