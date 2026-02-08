import { useState } from 'react'
import './Bytes.css'

const Bytes = ({ byte, user, onComplete, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [showQuiz, setShowQuiz] = useState(false)
    const [currentQuiz, setCurrentQuiz] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState([])
    const [showComplete, setShowComplete] = useState(false)
    const [totalXP, setTotalXP] = useState(0)

    // Quiz questions appear at specific timestamps
    const quizzes = [
        {
            timestamp: 45,
            question: 'What was the main tip discussed?',
            options: ['Speak faster', 'Stay calm and structured', 'Use complex vocabulary', 'Memorize answers'],
            correct: 1,
            xp: 10
        },
        {
            timestamp: 120,
            question: 'Which technique helps with fluency?',
            options: ['Long pauses', 'Filler words', 'Linking phrases', 'Repeating words'],
            correct: 2,
            xp: 10
        },
        {
            timestamp: 180,
            question: 'What should you do if you make a mistake?',
            options: ['Stop talking', 'Self-correct naturally', 'Apologize repeatedly', 'Start over'],
            correct: 1,
            xp: 10
        }
    ]

    const handlePlay = () => {
        setIsPlaying(true)
        // Simulate video progress
        const interval = setInterval(() => {
            setCurrentTime(prev => {
                const newTime = prev + 1

                // Check for quiz triggers
                const quizToShow = quizzes.find((q, i) =>
                    q.timestamp === newTime && !quizAnswers.includes(i)
                )

                if (quizToShow) {
                    setIsPlaying(false)
                    setShowQuiz(true)
                    setCurrentQuiz(quizzes.indexOf(quizToShow))
                    clearInterval(interval)
                }

                // Video complete
                if (newTime >= 200) {
                    clearInterval(interval)
                    setShowComplete(true)
                }

                return newTime
            })
        }, 100) // Faster for demo purposes

        return () => clearInterval(interval)
    }

    const handleQuizAnswer = (index) => {
        const quiz = quizzes[currentQuiz]
        const isCorrect = index === quiz.correct

        if (isCorrect) {
            setTotalXP(prev => prev + quiz.xp)
        }

        setQuizAnswers([...quizAnswers, currentQuiz])
        setShowQuiz(false)

        // Continue video or show complete
        if (currentQuiz === quizzes.length - 1) {
            setShowComplete(true)
        } else {
            setIsPlaying(true)
            handlePlay()
        }
    }

    const getProgressPercent = () => {
        return (currentTime / 200) * 100
    }

    if (showComplete) {
        return (
            <div className="bytes-container">
                <div className="bytes-complete">
                    <div className="complete-icon">🎬</div>
                    <h1>Byte Complete!</h1>
                    <p className="byte-title-complete">{byte?.title}</p>

                    <div className="xp-result">
                        <span className="xp-star">⭐</span>
                        <span className="xp-total">+{totalXP + (byte?.xp || 30)} XP</span>
                    </div>

                    <div className="quiz-summary">
                        <h4>Quiz Performance</h4>
                        <div className="quiz-stats">
                            {quizzes.map((quiz, index) => (
                                <div key={index} className="quiz-stat-item">
                                    <span className="quiz-num">Q{index + 1}</span>
                                    <span className={`quiz-result ${quizAnswers.includes(index) ? 'answered' : ''}`}>
                                        {quizAnswers.includes(index) ? '✓' : '–'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="complete-actions">
                        <button className="btn btn-primary" onClick={() => onComplete(totalXP + (byte?.xp || 30))}>
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

    return (
        <div className="bytes-container">
            {/* Header */}
            <div className="bytes-header">
                <button className="close-btn" onClick={onClose}>✕</button>
                <span className="bytes-label">Video Byte</span>
                <div className="xp-indicator">
                    <span>⭐</span> +{totalXP} XP
                </div>
            </div>

            {/* Video Player */}
            <div className="video-player">
                <div className="video-content">
                    <div className="video-placeholder">
                        {!isPlaying ? (
                            <button className="play-button" onClick={handlePlay}>
                                <span>▶</span>
                            </button>
                        ) : (
                            <div className="playing-indicator">
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="video-progress">
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${getProgressPercent()}%` }} />
                        {quizzes.map((quiz, index) => (
                            <div
                                key={index}
                                className="quiz-marker"
                                style={{ left: `${(quiz.timestamp / 200) * 100}%` }}
                            />
                        ))}
                    </div>
                    <div className="time-display">
                        <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                        <span>3:20</span>
                    </div>
                </div>
            </div>

            {/* Video Info */}
            <div className="video-info">
                <h2>{byte?.title || 'IELTS Strategy Tips'}</h2>
                <p>Learn key strategies for improving your IELTS score</p>
            </div>

            {/* Quiz Modal */}
            {showQuiz && (
                <div className="quiz-overlay">
                    <div className="quiz-modal">
                        <div className="quiz-header">
                            <span className="quiz-badge">📝 Quick Quiz</span>
                            <span className="quiz-xp">+10 XP</span>
                        </div>
                        <h3>{quizzes[currentQuiz].question}</h3>
                        <div className="quiz-options">
                            {quizzes[currentQuiz].options.map((option, index) => (
                                <button
                                    key={index}
                                    className="quiz-option"
                                    onClick={() => handleQuizAnswer(index)}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Bytes
