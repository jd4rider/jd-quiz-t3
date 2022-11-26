import { useState, useEffect } from 'react'

import Quizbox from './Quizbox'
import { cat } from '../types/types'


const Front = () => {
  const [category, setCategory] = useState<cat[]>([])
  const [startQuiz, setStartQuiz] = useState(false)
  const [categoryPicked, setCategoryPicked] = useState<cat>({ id: 0, name: 'Any Category' })
  const [numberQuestions, setNumberQuestions] = useState(10)

  const startHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setStartQuiz(true)
  }

  const categoryHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setCategoryPicked({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })
  }

  const numberHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setNumberQuestions(e.target.value)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategory(data.trivia_categories)
      })
  }, [])


  return (
    <>
      {!startQuiz && <form className="w-full max-w-sm" onSubmit={(e: React.SyntheticEvent) => startHandler(e)}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="num-of-questions">
              No. of Questions
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="num-of-questions" type="number" value={numberQuestions} min={5} max={30} onChange={(e: React.ChangeEvent<any>) => numberHandler(e)} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="categories">
              Quiz Category
            </label>
          </div>
          <div className="md:w-2/3">
            <select id="categories" className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e: React.ChangeEvent<any>) => categoryHandler(e)}>
              <option selected>Any Category</option>
              {category.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Start Quiz
            </button>
          </div>
        </div>
      </form>}
      {startQuiz && <Quizbox category={categoryPicked} number={numberQuestions} />}
    </>
  )
}

export default Front;
