import './Home.css'

const Home = ({ user, onStartRapidFire, onStartByte }) => {
    const getDaysUntilExam = () => {
        if (!user.examDate) return null
        const exam = new Date(user.examDate)
        const today = new Date()
        const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
        return diff > 0 ? diff : 0
    }

    const bytes = [
        { id: 1, title: 'Speaking Introduction Strategies', duration: '3:45', skill: 'speaking', xp: 40 },
        { id: 2, title: 'Reading Speed Techniques', duration: '4:20', skill: 'reading', xp: 50 },
        { id: 3, title: 'Listening for Key Details', duration: '3:15', skill: 'listening', xp: 35 },
        { id: 4, title: 'Writing Task 2 Structure', duration: '5:00', skill: 'writing', xp: 60 },
        { id: 5, title: 'Common Grammar Mistakes', duration: '4:10', skill: 'writing', xp: 45 },
    ]

    const getStreakMessage = () => {
        if (user.streak === 0) return "Start your streak today! 🌟"
        if (user.streak < 3) return "Great start! Keep it going! 💪"
        if (user.streak < 7) return "You're on fire! 🔥"
        if (user.streak < 14) return "Incredible dedication! 🏆"
        if (user.streak < 30) return "Unstoppable! 🚀"
        return "Legendary streak! 👑"
    }

    const daysUntilExam = getDaysUntilExam()

    return (
        <div className="home-page">
            {/* Header */}
            <div className="header">
                <div className="header-top">
                    <div className="logo">
                        <div className="logo-icon">🎯</div>
                        <span className="logo-text">IELTS Quest</span>
                    </div>
                    <div className="xp-badge">
                        <span className="xp-icon">⭐</span>
                        <span className="xp-value">{user.xp} XP</span>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="streak-card">
                    <div className="streak-fire">🔥</div>
                    <div className="streak-info">
                        <div className="streak-count">{user.streak}</div>
                        <div className="streak-label">Day Streak</div>
                        <div className="streak-message">{getStreakMessage()}</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Exam Countdown */}
                {daysUntilExam !== null && (
                    <div className="exam-countdown">
                        <div className="countdown-info">
                            <h3>📅 Your IELTS Exam</h3>
                            <p>Target Score: {user.targetScore}</p>
                        </div>
                        <div className="countdown-days">
                            <div className="countdown-number">{daysUntilExam}</div>
                            <div className="countdown-label">Days Left</div>
                        </div>
                    </div>
                )}

                {/* Rapid Fire Section */}
                <h2 className="section-title">⚡ Rapid Fire</h2>
                <div className="skill-grid">
                    <div className="skill-card listening" onClick={() => onStartRapidFire('listening')}>
                        <div className="skill-icon">🎧</div>
                        <div className="skill-name">Listening</div>
                        <div className="skill-subtitle">5 questions • 3 min</div>
                        <div className="skill-play">▶</div>
                    </div>
                    <div className="skill-card reading" onClick={() => onStartRapidFire('reading')}>
                        <div className="skill-icon">📖</div>
                        <div className="skill-name">Reading</div>
                        <div className="skill-subtitle">5 questions • 4 min</div>
                        <div className="skill-play">▶</div>
                    </div>
                    <div className="skill-card writing" onClick={() => onStartRapidFire('writing')}>
                        <div className="skill-icon">✍️</div>
                        <div className="skill-name">Writing</div>
                        <div className="skill-subtitle">5 questions • 3 min</div>
                        <div className="skill-play">▶</div>
                    </div>
                    <div className="skill-card speaking" onClick={() => onStartRapidFire('speaking')}>
                        <div className="skill-icon">🗣️</div>
                        <div className="skill-name">Speaking</div>
                        <div className="skill-subtitle">5 questions • 4 min</div>
                        <div className="skill-play">▶</div>
                    </div>
                </div>

                {/* Bytes Section */}
                <h2 className="section-title">🎬 Video Bytes</h2>
                <div className="bytes-scroll">
                    {bytes.map(byte => (
                        <div key={byte.id} className="byte-card" onClick={() => onStartByte(byte)}>
                            <div className="byte-thumbnail">
                                <div className="byte-play-icon">▶</div>
                                <span className="byte-duration">{byte.duration}</span>
                            </div>
                            <div className="byte-info">
                                <div className="byte-title">{byte.title}</div>
                                <div className="byte-xp">+{byte.xp} XP</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
