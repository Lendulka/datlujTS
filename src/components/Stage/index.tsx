import { useState, useEffect } from 'react';
import { FormDataStructure } from '../Form/Form';
import wordList from '../../word-list';
import Wordbox from '../Wordbox';
import Form from '../Form/Form';
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

export interface StageProps {
  count: number;
  minutes: number;
}

export const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(["jahoda", "malina", "jablko", "ananas"]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [selectCount, setSelectCount] = useState<StageProps>({
    count: 0,
    minutes: 0,
  })
  const [timer, setTimer] = useState<boolean>(false)

  console.log(selectCount.count, selectCount.minutes)

  const stopGame = () => {
    console.log("STOP")
  }

  useEffect(() => {
    if (selectCount.minutes > 0 && timer) {
      let milSec = Number(selectCount.minutes) * 60 * 1000
      const timeOut = setTimeout(stopGame, milSec);
      return () => { clearTimeout(timeOut) }
    }
  }, [selectCount.minutes, timer])


  const handleSubmitData = (data: FormDataStructure) => {
    setSelectCount({ ...selectCount, count: data.count, minutes: data.minutes })
  }

  const handleFinish = () => {
    let selectNumber = Number(selectCount.count)
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

  const handleKeyDown = () => {
    setTimer(true)
  }

  return (
    <div className="stage">
      <Form count={selectCount.count} minutes={selectCount.minutes} onSubmitData={handleSubmitData} />
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) =>
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0 ? true : false}
            onMistake={handleMistake}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};

export default Stage;
