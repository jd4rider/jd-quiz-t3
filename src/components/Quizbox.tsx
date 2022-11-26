
import { useState, useEffect } from 'react'
import Answers from './Answers';
import { cat } from '../types/types';

interface Props {
  category: cat,
  number: number
}

const Quizbox = ({ category, number }: Props) => {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [nextText, setNextText] = useState('Next Question')
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState('unanswered')
  const [win, setWin] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState<string>('')

  const nextHandler = () => {
    if (currentQuestion < questionCount - 1) setCurrentQuestion(currentQuestion + 1)
    else setWin(true)

    if (currentQuestion == questionCount - 2) setNextText('Finish Quiz')
    setDisabled(false)
    setCorrect('unanswered')
  }

  useEffect(() => {
    let url = '';
    if (category.id == 0) url = `https://opentdb.com/api.php?amount=${number}`
    else url = `https://opentdb.com/api.php?amount=${number}&category=${category.id}`
    setCategoryTitle(category.name)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuizQuestions(data.results)
        setQuestionCount(data.results.length)
      })

  }, [])

  return (
    <>
      {!win ? <div className="bg-white max-w-lg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <h3 className="bg-gray-100 text-center py-3">
            Question #{currentQuestion + 1} of {questionCount}
            <br />
            Category: {categoryTitle}
          </h3>
          {correct == 'correct' && <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
            <p className="text-sm">That answer is Correct!</p>
          </div>}
          {correct == 'incorrect' && <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
            <p className="text-sm">That answer is Incorrect!</p>
          </div>}
          <div className="font-bold text-xl mb-2 text-center py-4">
            <div dangerouslySetInnerHTML={{ __html: quizQuestions[currentQuestion]?.question }} />
          </div>
          <Answers incorrectAnswers={quizQuestions[currentQuestion]?.incorrect_answers}
            correctAnswer={quizQuestions[currentQuestion]?.correct_answer}
            disabled={disabled}
            setDisabled={setDisabled}
            setScore={setScore}
            score={score}
            setCorrect={setCorrect}
            correct={correct}
          />
        </div>
        {disabled && <div className="px-6 pt-4 pb-2 text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={nextHandler}>
            {nextText}
          </button>
        </div>}
      </div>
        : <div className="bg-white max-w-lg rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h3 className="bg-gray-100 text-center py-3 px-8">
              Quiz Complete!
            </h3>
            <div className="font-bold text-xl mb-2 text-center">
              Score: {score} of {questionCount}
              <h1 className="text-5xl">{(score / questionCount) * 100}%</h1>
            </div>
          </div>
        </div>}
    </>
  );
}

export default Quizbox;
