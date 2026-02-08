import { useState, useEffect } from 'react'
import './RapidFire.css'

const RapidFire = ({ skill, user, onComplete, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [timeLeft, setTimeLeft] = useState(60)
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)

    const questionsBySkill = {
        listening: [
            { question: 'The presentation will begin at what time?', options: ['9:00 AM', '10:30 AM', '11:00 AM', '2:00 PM'], correct: 1 },
            { question: 'What is the main topic being discussed?', options: ['Budget planning', 'New product launch', 'Team restructuring', 'Customer feedback'], correct: 1 },
            { question: 'The speaker recommends which approach?', options: ['Gradual change', 'Immediate action', 'Further research', 'Team consultation'], correct: 2 },
            { question: 'How many participants attended the event?', options: ['Around 50', 'Over 100', 'Less than 30', 'About 200'], correct: 1 },
            { question: 'The deadline has been moved to...', options: ['Monday', 'Wednesday', 'Friday', 'Next week'], correct: 2 }
        ],
        reading: [
            { question: 'According to the passage, deforestation primarily affects...', options: ['Ocean levels', 'Biodiversity', 'Urban areas', 'Desert formation'], correct: 1 },
            { question: 'The author\'s main argument supports...', options: ['Traditional methods', 'Modern technology', 'Hybrid approaches', 'Complete change'], correct: 2 },
            { question: 'Which statement is TRUE according to the text?', options: ['All studies agree', 'Results are mixed', 'No evidence exists', 'Research is ongoing'], correct: 3 },
            { question: 'The phrase "paradigm shift" in paragraph 3 means...', options: ['Small change', 'Fundamental change', 'No change', 'Temporary change'], correct: 1 },
            { question: 'The conclusion suggests that...', options: ['Action is needed', 'More study required', 'Problem is solved', 'Issue is minor'], correct: 0 }
        ],
        writing: [
            { question: 'Which sentence uses correct punctuation?', options: ['However I disagree', 'However, I disagree.', 'however; I disagree', 'However: I disagree'], correct: 1 },
            { question: 'Choose the most formal alternative:', options: ['Kids need to learn this', 'Children should acquire this skill', 'Young ones must get this', 'Little ones have to know this'], correct: 1 },
            { question: 'What is the best transition word here?', options: ['So', 'Nevertheless', 'Like', 'And'], correct: 1 },
            { question: 'Which is grammatically correct?', options: ['Less people attended', 'Fewer people attended', 'Lesser people attended', 'Little people attended'], correct: 1 },
            { question: 'Select the sentence with parallel structure:', options: ['She likes swimming, to run, and biking', 'She likes swimming, running, and biking', 'She likes to swim, running, and bike', 'She likes swim, run, and bike'], correct: 1 }
        ],
        speaking: [
            { question: 'Which phrase best introduces an example?', options: ['For instance,', 'Because of', 'However,', 'Although'], correct: 0 },
            { question: 'How should you end a Part 2 response?', options: ['Stop abruptly', 'Summarize briefly', 'Add new points', 'Ask a question'], correct: 1 },
            { question: 'Which shows strong opinion?', options: ['I think maybe', 'I firmly believe', 'Perhaps it could be', 'It might be that'], correct: 1 },
            { question: 'Best way to buy thinking time:', options: ['Stay silent', 'Say "um" repeatedly', 'Use filler phrases naturally', 'Repeat the question exactly'], correct: 2 },
            { question: 'To show contrast in speaking:', options: ['And also', 'On the other hand', 'In addition', 'Similarly'], correct: 1 }
        ]
    }

    const questions = questionsBySkill[skill] || questionsBySkill.listening

    useEffect(() => {
        if (showResult || showFeedback) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeout()
                    return 60
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [currentQuestion, showResult, showFeedback])

    const handleTimeout = () => {
        if (!showFeedback) {
            setSelectedAnswer(-1)
            setShowFeedback(true)
            setTimeout(() => moveToNext(-1), 1500)
        }
    }

    const handleAnswer = (index) => {
        if (showFeedback) return
        setSelectedAnswer(index)
        setShowFeedback(true)
        setTimeout(() => moveToNext(index), 1500)
    }

    const moveToNext = (answerIndex) => {
        const newAnswers = [...answers, answerIndex]
        setAnswers(newAnswers)
        setShowFeedback(false)
        setSelectedAnswer(null)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setTimeLeft(60)
        } else {
            setShowResult(true)
        }
    }

    const calculateScore = () => {
        return answers.filter((ans, i) => ans === questions[i].correct).length
    }

    const calculateXP = () => {
        const score = calculateScore()
        return score * 10
    }

    const getSkillColor = () => {
        const colors = {
            listening: 'var(--listening)',
            reading: 'var(--reading)',
            writing: 'var(--writing)',
            speaking: 'var(--speaking)'
        }
        return colors[skill] || 'var(--primary)'
    }

    const getSkillIcon = () => {
        const icons = { listening: '🎧', reading: '📖', writing: '✍️', speaking: '🗣️' }
        return icons[skill] || '📚'
    }

    if (showResult) {
        const score = calculateScore()
        const xp = calculateXP()
        return (
            <div className="rapid-fire-container">
                <div className="result-screen">
                    <div className="result-header">
                        <span className="result-icon">{score >= 4 ? '🎉' : score >= 2 ? '👍' : '💪'}</span>
                        <h1>Round Complete!</h1>
                    </div>

                    <div className="result-score-card" style={{ '--skill-color': getSkillColor() }}>
                        <div className="skill-badge">{getSkillIcon()} {skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                        <div className="big-score">{score}/{questions.length}</div>
                        <div className="score-label">Correct Answers</div>
                    </div>

                    <div className="xp-earned-card">
                        <span className="xp-icon">⭐</span>
                        <span className="xp-amount">+{xp} XP</span>
                    </div>

                    <div className="result-message">
                        {score === 5 && "Perfect score! You're a master! 🏆"}
                        {score === 4 && "Excellent work! Almost perfect! 🌟"}
                        {score === 3 && "Good job! Keep practicing! 💪"}
                        {score === 2 && "Not bad! Room to improve! 📈"}
                        {score <= 1 && "Keep going! Practice makes perfect! 🎯"}
                    </div>

                    <div className="result-actions">
                        <button className="btn btn-primary" onClick={() => onComplete(xp)}>
                            Continue
                        </button>
                        <button className="btn btn-secondary" onClick={onClose}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const question = questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correct

    return (
        <div className="rapid-fire-container">
            {/* Header */}
            <div className="rf-header">
                <button className="close-btn" onClick={onClose}>✕</button>
                <div className="rf-skill-badge" style={{ '--skill-color': getSkillColor() }}>
                    {getSkillIcon()} {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </div>
                <div className="question-counter">{currentQuestion + 1}/{questions.length}</div>
            </div>

            {/* Timer */}
            <div className="timer-bar">
                <div
                    className="timer-fill"
                    style={{
                        width: `${(timeLeft / 60) * 100}%`,
                        backgroundColor: timeLeft <= 10 ? 'var(--accent-orange)' : getSkillColor()
                    }}
                />
            </div>
            <div className="timer-text">{timeLeft}s</div>

            {/* Question */}
            <div className="rf-question-card">
                <p className="rf-question">{question.question}</p>

                <div className="rf-options">
                    {question.options.map((option, index) => {
                        let optionClass = 'rf-option'
                        if (showFeedback) {
                            if (index === question.correct) optionClass += ' correct'
                            else if (index === selectedAnswer && !isCorrect) optionClass += ' incorrect'
                        }
                        if (selectedAnswer === index) optionClass += ' selected'

                        return (
                            <button
                                key={index}
                                className={optionClass}
                                onClick={() => handleAnswer(index)}
                                disabled={showFeedback}
                            >
                                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                <span className="option-text">{option}</span>
                                {showFeedback && index === question.correct && <span className="check-icon">✓</span>}
                                {showFeedback && index === selectedAnswer && !isCorrect && <span className="x-icon">✕</span>}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
                <div className={`feedback-toast ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '🎉 Correct! +10 XP' : '❌ Incorrect'}
                </div>
            )}
        </div>
    )
}

export default RapidFire
