import { useState } from 'react'
import './Onboarding.css'

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        targetScore: 7.0,
        examDate: ''
    })
    const [diagnosticAnswers, setDiagnosticAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const diagnosticQuestions = [
        { skill: 'Listening', question: 'The speaker mentioned the meeting is at...', options: ['9 AM', '10 AM', '11 AM', '2 PM'], correct: 1 },
        { skill: 'Listening', question: 'What is the main topic of the lecture?', options: ['Climate change', 'Marine biology', 'Urban development', 'Space exploration'], correct: 2 },
        { skill: 'Reading', question: 'According to the passage, what causes coral bleaching?', options: ['Ocean pollution', 'Rising temperatures', 'Overfishing', 'Oil spills'], correct: 1 },
        { skill: 'Reading', question: 'The author\'s tone in this passage is best described as...', options: ['Optimistic', 'Neutral', 'Critical', 'Humorous'], correct: 2 },
        { skill: 'Writing', question: 'Which sentence is grammatically correct?', options: ['She don\'t like coffee', 'He have been working', 'They are going home', 'We was at the park'], correct: 2 },
        { skill: 'Writing', question: 'Choose the best word to complete: "The results were _____ impressive."', options: ['very', 'much', 'so', 'quite'], correct: 3 },
        { skill: 'Speaking', question: 'Which phrase best introduces a personal opinion?', options: ['It is known that', 'In my view', 'Research shows', 'Statistics indicate'], correct: 1 },
        { skill: 'Speaking', question: 'Which connector shows contrast?', options: ['Moreover', 'Therefore', 'However', 'Furthermore'], correct: 2 },
    ]

    const handleAnswer = (answerIndex) => {
        setDiagnosticAnswers([...diagnosticAnswers, answerIndex])
        if (currentQuestion < diagnosticQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setStep(3)
        }
    }

    const calculateDiagnosticScore = () => {
        const correct = diagnosticAnswers.filter((ans, i) => ans === diagnosticQuestions[i].correct).length
        return Math.round((correct / diagnosticQuestions.length) * 100)
    }

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="onboarding-step fade-in">
                        <div className="onboarding-hero">
                            <div className="hero-icon">🎯</div>
                            <h1>Welcome to<br /><span className="gradient-text">IELTS Quest</span></h1>
                            <p>Transform your IELTS prep into a daily adventure. Learn faster, score higher.</p>
                        </div>
                        <div className="features-preview">
                            <div className="feature-item">
                                <span className="feature-icon">🔥</span>
                                <span>Daily Streaks</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">⚡</span>
                                <span>Rapid Fire Tests</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🎬</span>
                                <span>Video Bytes</span>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-full" onClick={() => setStep(1)}>
                            Get Started
                        </button>
                    </div>
                )

            case 1:
                return (
                    <div className="onboarding-step fade-in">
                        <div className="step-header">
                            <span className="step-number">1/3</span>
                            <h2>Let's set up your profile</h2>
                            <p>Tell us about yourself</p>
                        </div>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Target IELTS Score</label>
                            <div className="score-selector">
                                {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(score => (
                                    <button
                                        key={score}
                                        className={`score-btn ${formData.targetScore === score ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, targetScore: score })}
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Exam Date</label>
                            <input
                                type="date"
                                className="input"
                                value={formData.examDate}
                                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={() => setStep(2)}
                            disabled={!formData.name || !formData.email}
                        >
                            Continue
                        </button>
                    </div>
                )

            case 2:
                const question = diagnosticQuestions[currentQuestion]
                return (
                    <div className="onboarding-step fade-in">
                        <div className="step-header">
                            <span className="step-number">2/3</span>
                            <h2>Quick Diagnostic Test</h2>
                            <p>Let's assess your current level</p>
                        </div>
                        <div className="diagnostic-progress">
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${((currentQuestion + 1) / diagnosticQuestions.length) * 100}%` }}
                                />
                            </div>
                            <span className="progress-text">{currentQuestion + 1} of {diagnosticQuestions.length}</span>
                        </div>
                        <div className="question-card">
                            <span className="skill-tag" data-skill={question.skill.toLowerCase()}>{question.skill}</span>
                            <h3>{question.question}</h3>
                            <div className="options-grid">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className="option-btn"
                                        onClick={() => handleAnswer(index)}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                        <span className="option-text">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case 3:
                const score = calculateDiagnosticScore()
                return (
                    <div className="onboarding-step fade-in">
                        <div className="step-header">
                            <span className="step-number">3/3</span>
                            <h2>You're all set!</h2>
                            <p>Here's your diagnostic result</p>
                        </div>
                        <div className="result-card">
                            <div className="result-score">
                                <div className="score-circle">
                                    <span className="score-value">{score}%</span>
                                </div>
                                <p className="score-message">
                                    {score >= 80 ? "Excellent! You're on track for a great score!" :
                                        score >= 60 ? "Good foundation! Let's build on it together." :
                                            "Don't worry! We'll help you improve every day."}
                                </p>
                            </div>
                            <div className="ready-features">
                                <h4>Your personalized journey awaits:</h4>
                                <ul>
                                    <li>✓ Daily practice tailored to your level</li>
                                    <li>✓ Bite-sized video lessons</li>
                                    <li>✓ Progress tracking & streaks</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-full glow-btn"
                            onClick={() => onComplete(formData)}
                        >
                            🚀 Start Your Quest
                        </button>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="onboarding-container">
            <div className="onboarding-bg" />
            {renderStep()}
        </div>
    )
}

export default Onboarding
