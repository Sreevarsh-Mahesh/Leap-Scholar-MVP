import './Journey.css'

const Journey = ({ user, onStartActivity }) => {
    const activities = [
        { id: 1, type: 'rapid', skill: 'listening', title: 'Listening Basics', xp: 50 },
        { id: 2, type: 'byte', skill: 'listening', title: 'Understanding Accents', xp: 40 },
        { id: 3, type: 'rapid', skill: 'reading', title: 'Reading Comprehension', xp: 50 },
        { id: 4, type: 'byte', skill: 'reading', title: 'Skimming Techniques', xp: 45 },
        { id: 5, type: 'rapid', skill: 'writing', title: 'Grammar Essentials', xp: 50 },
        { id: 6, type: 'byte', skill: 'writing', title: 'Task 1 Strategies', xp: 55 },
        { id: 7, type: 'rapid', skill: 'speaking', title: 'Speaking Confidence', xp: 50 },
        { id: 8, type: 'byte', skill: 'speaking', title: 'Fluency Tips', xp: 40 },
        { id: 9, type: 'rapid', skill: 'listening', title: 'Advanced Listening', xp: 60 },
        { id: 10, type: 'byte', skill: 'reading', title: 'Critical Analysis', xp: 50 },
        { id: 11, type: 'rapid', skill: 'writing', title: 'Essay Structure', xp: 55 },
        { id: 12, type: 'byte', skill: 'speaking', title: 'Part 2 Mastery', xp: 60 },
        { id: 13, type: 'rapid', skill: 'listening', title: 'Expert Listening', xp: 65 },
        { id: 14, type: 'byte', skill: 'reading', title: 'Speed Reading', xp: 55 },
        { id: 15, type: 'rapid', skill: 'writing', title: 'Advanced Writing', xp: 60 },
    ]

    const getSkillIcon = (skill) => {
        const icons = { listening: '🎧', reading: '📖', writing: '✍️', speaking: '🗣️' }
        return icons[skill] || '📚'
    }

    const getTypeIcon = (type) => {
        return type === 'rapid' ? '⚡' : '🎬'
    }

    const isCompleted = (activityId) => {
        return user.completedActivities.some(id => id.includes(`-${activityId}`) || id.includes(`byte-${activityId}`))
    }

    const getNextActivity = () => {
        for (let activity of activities) {
            if (!isCompleted(activity.id)) return activity.id
        }
        return activities.length
    }

    const isLocked = (activityId) => {
        const nextId = getNextActivity()
        return activityId > nextId
    }

    const completedCount = activities.filter(a => isCompleted(a.id)).length
    const progressPercent = (completedCount / activities.length) * 100

    return (
        <div className="journey-page">
            <div className="page-header">
                <h1>Your Journey</h1>
                <p>Complete activities to unlock more</p>
            </div>

            {/* Progress Overview */}
            <div className="journey-progress">
                <div className="progress-stats">
                    <div className="progress-stat">
                        <span className="stat-value">{completedCount}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="progress-circle">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${progressPercent * 2.83} 283`}
                                transform="rotate(-90 50 50)"
                            />
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="100%" stopColor="var(--accent-pink)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="progress-percent">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="progress-stat">
                        <span className="stat-value">{activities.length - completedCount}</span>
                        <span className="stat-label">Remaining</span>
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <div className="roadmap">
                <div className="roadmap-line" />
                {activities.map((activity, index) => {
                    const completed = isCompleted(activity.id)
                    const locked = isLocked(activity.id)
                    const current = activity.id === getNextActivity()

                    return (
                        <div
                            key={activity.id}
                            className={`roadmap-node ${completed ? 'completed' : ''} ${locked ? 'locked' : ''} ${current ? 'current' : ''}`}
                            onClick={() => !locked && onStartActivity(activity)}
                        >
                            <div className="node-marker">
                                {completed ? '✓' : locked ? '🔒' : getTypeIcon(activity.type)}
                            </div>
                            <div className="node-content">
                                <div className="node-header">
                                    <span className="node-type">{activity.type === 'rapid' ? 'Rapid Fire' : 'Video Byte'}</span>
                                    <span className="node-skill">{getSkillIcon(activity.skill)}</span>
                                </div>
                                <h3 className="node-title">{activity.title}</h3>
                                <span className="node-xp">+{activity.xp} XP</span>
                            </div>
                            {current && <div className="current-indicator">START</div>}
                        </div>
                    )
                })}
            </div>

            <div style={{ height: '100px' }} />
        </div>
    )
}

export default Journey
