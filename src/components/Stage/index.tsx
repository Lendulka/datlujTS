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

export interface StageDataStructure {
  count: number;
  minutes: number;
}

export const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(["jahoda", "malina", "jablko", "ananas"]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [timer, setTimer] = useState<boolean>(false)
  const [_, setStartGame] = useState<boolean>(false)
  const [finish, setFinish] = useState<boolean>(false)
  const [totalKeyStroke, setTotalKeyStroke] = useState<number>(0)
  const [nettoKeyStroke, setnettoKeyStroke] = useState<number>(0)
  const [mistakesPercentage, setMistakesPercentage] = useState<number>(0)
  const [selectCount, setSelectCount] = useState<StageDataStructure>({
    count: 0,
    minutes: 0,
  })

  console.log(selectCount.count, selectCount.minutes)
  console.log(totalKeyStroke)

  useEffect(() => {
    if (finish) {
      let nettoStroke = Math.round((totalKeyStroke - mistakes) / selectCount.minutes)
      console.log(totalKeyStroke, mistakes, selectCount.minutes)
      let percentage = ((mistakes * 100) / totalKeyStroke)
      let percentageRounded = Math.round(percentage * 100) / 100
      setnettoKeyStroke(nettoStroke)
      setMistakesPercentage(percentageRounded)
    }
  }, [finish])

  const stopGame = () => {
    console.log("STOP")
    setFinish(true)
  }

  useEffect(() => {
    if (timer) {
      let milSec = (Number(selectCount.minutes) * 60 * 1000)
      const timerId = setTimeout(stopGame, milSec)
      return () => { clearTimeout(timerId) }
    }
  }, [timer])

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

  const handleKeyStroke = () => {
    setTotalKeyStroke(prev => prev + 1)
  }

  const handleStartGame = () => {
    setStartGame(true)
    setFinish(false)
    setSelectCount({ ...selectCount, count: 0, minutes: 0 })
  }

  return (
    <>
      {
        finish ? (
          <>
            <div className="stage__results">
              <div className="stage__mistakes"> Počet chyb: {mistakes}</div>
              <div className="stage__strokes--brutto">Hrubé úhozy celkem: {totalKeyStroke}</div>
              <div className="stage__strokes--netto">Čisté úhozy: {nettoKeyStroke}</div>
              <div className="stage__mistakes__percentage">Procento chyb: {mistakesPercentage} %</div>
            </div>
            <button onClick={handleStartGame}>Nová hra</button>
            <button>Ulož výsledek</button>
          </>
        ) : (
          <div className="stage">
            <Form count={selectCount.count} minutes={selectCount.minutes} onSubmitData={handleSubmitData} />
            <div className="stage__words">
              {words
                .map((word, index) =>
                  <Wordbox
                    word={word}
                    key={word}
                    onFinish={handleFinish}
                    active={index === 0 ? true : false}
                    onMistake={handleMistake}
                    onTimer={() => setTimer(true)}
                    onKeyStroke={handleKeyStroke}
                  />
                )}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Stage;
