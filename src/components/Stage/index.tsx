import { useState, useEffect } from 'react';
import { FormDataStructure } from '../Form/Form';
import { generateWord } from '../../helpers/helpers';
import Wordbox from '../Wordbox';
import Form from '../Form/Form';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

export interface StageDataStructure {
  count: number;
  minutes: number;
}

export const Stage: React.FC = () => {
  const [words, setWords] = useState<string[]>(["jahoda", "malina", "jablko", "ananas"]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [timer, setTimer] = useState<boolean>(false)
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
  console.log(timer)

  useEffect(() => {
    if (finish) {
      let nettoStroke = Math.round((totalKeyStroke - mistakes) / selectCount.minutes)
      let percentage = ((mistakes * 100) / totalKeyStroke)
      let percentageRounded = Math.round(percentage * 100) / 100
      setnettoKeyStroke(nettoStroke)
      setMistakesPercentage(percentageRounded)
    }
  }, [finish])

  const stopTimer = () => {
    console.log("STOP")
    setFinish(true)
  }

  useEffect(() => {
    if (timer) {
      let milSec = (Number(selectCount.minutes) * 60 * 1000)
      const timerId = setTimeout(stopTimer, milSec)
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

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setWords(["jahoda", "malina", "jablko", "ananas"])
    setMistakes(0)
    setTimer(false)
    setFinish(false)
    setTotalKeyStroke(0)
    setnettoKeyStroke(0)
    setMistakesPercentage(0)
    setSelectCount({ ...selectCount, count: 0, minutes: 0 })
  }

  return (
    <>
      {
        finish ? (
          <div className="stage__results">
            <div className="stage__mistakes"> Počet chyb: {mistakes}</div>
            <div className="stage__strokes--brutto">Hrubé úhozy celkem: {totalKeyStroke}</div>
            <div className="stage__strokes--netto">Čisté úhozy: {nettoKeyStroke}</div>
            <div className="stage__mistakes__percentage">Procento chyb: {mistakesPercentage} %</div>

            <button className="form__button" id="button__width--small" onClick={handleStartGame}>
              Nová hra
            </button>
            <button className="form__button" id="button__width--small">Ulož výsledek</button>
          </div>
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
