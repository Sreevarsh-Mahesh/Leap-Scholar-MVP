import './Profile.css'

const Profile = ({ user, onLogout }) => {
    const getDaysUntilExam = () => {
        if (!user.examDate) return null
        const diff = Math.ceil((new Date(user.examDate) - new Date()) / 86400000)
        return diff > 0 ? diff : 0
    }

    const joinDate = new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    return (
        <div className="profile-page">
            <div className="page-header">
                <h1>Profile</h1>
            </div>

            <div className="profile-card">
                <div className="avatar">{user.name?.charAt(0)?.toUpperCase() || '?'}</div>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-joined">Member since {joinDate}</p>
            </div>

            <div className="profile-stats">
                <div className="pstat"><span className="pstat-val">{user.xp}</span><span className="pstat-lbl">Total XP</span></div>
                <div className="pstat"><span className="pstat-val">{user.streak}</span><span className="pstat-lbl">Streak</span></div>
                <div className="pstat"><span className="pstat-val">{user.completedActivities.length}</span><span className="pstat-lbl">Done</span></div>
            </div>

            <div className="profile-section">
                <h3>🎯 Target Score</h3>
                <div className="target-card">
                    <span className="target-score">{user.targetScore}</span>
                    <span className="target-label">IELTS Band</span>
                </div>
            </div>

            {getDaysUntilExam() !== null && (
                <div className="profile-section">
                    <h3>📅 Exam Countdown</h3>
                    <div className="countdown-card">
                        <span className="countdown-num">{getDaysUntilExam()}</span>
                        <span className="countdown-lbl">days remaining</span>
                    </div>
                </div>
            )}

            <div className="profile-section">
                <h3>⚙️ Settings</h3>
                <div className="settings-list">
                    <button className="settings-item">🔔 Notifications</button>
                    <button className="settings-item">🌙 Dark Mode</button>
                    <button className="settings-item">❓ Help & FAQ</button>
                    <button className="settings-item logout" onClick={onLogout}>🚪 Log Out</button>
                </div>
            </div>

            <div style={{ height: '100px' }} />
        </div>
    )
}

export default Profile
