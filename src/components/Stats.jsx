import './Stats.css'

const Stats = ({ user }) => {
    const weeklyData = [
        { day: 'Mon', activities: 3 },
        { day: 'Tue', activities: 5 },
        { day: 'Wed', activities: 2 },
        { day: 'Thu', activities: 4 },
        { day: 'Fri', activities: 6 },
        { day: 'Sat', activities: 1 },
        { day: 'Sun', activities: 4 }
    ]
    const maxActivities = Math.max(...weeklyData.map(d => d.activities))

    const skillProgress = [
        { name: 'Listening', icon: '🎧', progress: 65, color: 'var(--listening)' },
        { name: 'Reading', icon: '📖', progress: 45, color: 'var(--reading)' },
        { name: 'Writing', icon: '✍️', progress: 55, color: 'var(--writing)' },
        { name: 'Speaking', icon: '🗣️', progress: 35, color: 'var(--speaking)' }
    ]

    const totalMins = user.completedActivities.length * 4
    const hours = Math.floor(totalMins / 60)
    const mins = totalMins % 60

    return (
        <div className="stats-page">
            <div className="page-header">
                <h1>Your Stats</h1>
                <p>Track your progress</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card"><span className="stat-icon">⭐</span><span className="stat-val">{user.xp}</span><span className="stat-lbl">Total XP</span></div>
                <div className="stat-card"><span className="stat-icon">🔥</span><span className="stat-val">{user.streak}</span><span className="stat-lbl">Day Streak</span></div>
                <div className="stat-card"><span className="stat-icon">✅</span><span className="stat-val">{user.completedActivities.length}</span><span className="stat-lbl">Activities</span></div>
                <div className="stat-card"><span className="stat-icon">⏱️</span><span className="stat-val">{hours}h {mins}m</span><span className="stat-lbl">Time Spent</span></div>
            </div>

            <div className="section">
                <h2 className="section-title">📊 Weekly Activity</h2>
                <div className="weekly-chart">
                    {weeklyData.map((item, i) => (
                        <div key={i} className="chart-col">
                            <div className="bar-wrap"><div className="bar" style={{ height: `${(item.activities / maxActivities) * 100}%` }} /></div>
                            <span className="day-lbl">{item.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">📈 Skill Breakdown</h2>
                <div className="skill-list">
                    {skillProgress.map((s, i) => (
                        <div key={i} className="skill-row">
                            <div className="skill-head"><span>{s.icon} {s.name}</span><span>{s.progress}%</span></div>
                            <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.progress}%`, background: s.color }} /></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">🏆 Achievements</h2>
                <div className="badges-grid">
                    <div className={`badge ${user.streak >= 7 ? 'unlocked' : ''}`}><span>🔥</span><span>7 Day Streak</span></div>
                    <div className={`badge ${user.streak >= 14 ? 'unlocked' : ''}`}><span>💪</span><span>14 Day Streak</span></div>
                    <div className={`badge ${user.xp >= 500 ? 'unlocked' : ''}`}><span>⭐</span><span>500 XP</span></div>
                    <div className={`badge ${user.completedActivities.length >= 10 ? 'unlocked' : ''}`}><span>🎯</span><span>10 Activities</span></div>
                </div>
            </div>
            <div style={{ height: '100px' }} />
        </div>
    )
}

export default Stats
