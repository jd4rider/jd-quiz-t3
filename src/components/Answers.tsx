import { useState, useEffect } from 'react'
//import Button from 'react-bootstrap/Button'

interface Props {
    incorrectAnswers: any,
    correctAnswer: any,
    disabled: boolean,
    setDisabled: any,
    setScore: any,
    score: number,
    setCorrect: any,
    correct: any
}

const Answers = ({ incorrectAnswers,
    correctAnswer,
    disabled,
    setDisabled,
    setScore,
    score,
    setCorrect,
    correct
}: Props) => {
    const [answerClicked, setAnswerClicked] = useState('')
    const [answers, setAnswers] = useState([])
    const answerss = incorrectAnswers?.concat(correctAnswer)
    const shuffledAnswers = answerss?.sort(() => Math.random() - 0.5)


    const handleClick = (e: React.ChangeEvent<HTMLFormElement>) => {
        setDisabled(true)
        setAnswerClicked(e.target.value)
        if (e.target.value === correctAnswer) {
            setScore(score + 1)
            setCorrect('correct')
        } else {
            setCorrect('incorrect')
        }
    }

    useEffect(() => {
        setAnswers(shuffledAnswers)
    }, [incorrectAnswers, correctAnswer])

    return (
        <>
            {answers?.map((answer, index) => (
                (correct == 'incorrect' && answer == correctAnswer)
                    ? <button disabled={disabled} style={{ "width": '100%', 'margin': '1px' }} className="bg-green-500 text-white font-bold py-2 px-4 rounded" key={index} value={answer} dangerouslySetInnerHTML={{ __html: answer }} />
                    : (correct == 'incorrect' && answer == answerClicked) ?
                        <button disabled={disabled} style={{ "width": '100%', 'margin': '1px' }} className="bg-red-500 text-white font-bold py-2 px-4 rounded" key={index} value={answer} onClick={(e: React.ChangeEvent<any>) => handleClick(e)} dangerouslySetInnerHTML={{ __html: answer }} />
                        : (correct == 'correct' && answer == correctAnswer) ?
                            <button disabled={disabled} style={{ "width": '100%', 'margin': '1px' }} className="bg-green-500 text-white font-bold py-2 px-4 rounded" key={index} value={answer} onClick={(e: React.ChangeEvent<any>) => handleClick(e)} dangerouslySetInnerHTML={{ __html: answer }} />
                            : (disabled) ?
                                <button disabled={disabled} style={{ "width": '100%', 'margin': '1px' }} className="bg-blue-500 text-white font-bold py-2 px-4 rounded" key={index} value={answer} onClick={(e: React.ChangeEvent<any>) => handleClick(e)} dangerouslySetInnerHTML={{ __html: answer }} />
                                : <button disabled={disabled} style={{ "width": '100%', 'margin': '1px' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" key={index} value={answer} onClick={(e: React.ChangeEvent<any>) => handleClick(e)} dangerouslySetInnerHTML={{ __html: answer }} />

            ))}
        </>
    )
}

export default Answers;
