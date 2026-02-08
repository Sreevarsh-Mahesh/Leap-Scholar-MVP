import { useState, useEffect } from 'react'
import './Profile.css'

const Profile = ({ user, onLogout }) => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [toastNotif, setToastNotif] = useState(null)

    const getDaysUntilExam = () => {
        if (!user.examDate) return null
        const diff = Math.ceil((new Date(user.examDate) - new Date()) / 86400000)
        return diff > 0 ? diff : 0
    }

    const joinDate = new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    const mockNotifications = [
        { id: 1, type: 'social', icon: '🥉', title: 'Friend Circle Update', message: 'Sarah is now #3 in the friend circle!', time: '2 min ago', unread: true },
        { id: 2, type: 'achievement', icon: '👑', title: 'Achievement Unlocked', message: 'Ram has reached IELTS MASTER LEVEL!', time: '15 min ago', unread: true },
        { id: 3, type: 'streak', icon: '🔥', title: 'Streak Milestone', message: 'Ganesh has reached a streak of 100 days!', time: '1 hour ago', unread: true },
        { id: 4, type: 'reminder', icon: '⏰', title: 'Daily Reminder', message: "Don't forget to practice today to keep your streak!", time: '2 hours ago', unread: false },
        { id: 5, type: 'xp', icon: '⭐', title: 'XP Earned', message: 'You earned 50 XP from yesterday\'s activities!', time: '5 hours ago', unread: false },
        { id: 6, type: 'social', icon: '🎉', title: 'Friend Activity', message: 'Priya completed her first Rapid Fire session!', time: '1 day ago', unread: false },
    ]

    const unreadCount = mockNotifications.filter(n => n.unread).length

    const handleNotificationClick = (notif) => {
        setToastNotif(notif)
        setShowNotifications(false)
    }

    // Auto-dismiss toast after 4 seconds
    useEffect(() => {
        if (toastNotif) {
            const timer = setTimeout(() => setToastNotif(null), 4000)
            return () => clearTimeout(timer)
        }
    }, [toastNotif])

    return (
        <div className="profile-page">
            {/* Toast Notification - Top of screen like iOS/Android */}
            {toastNotif && (
                <div className={`toast-notification ${toastNotif.type}`} onClick={() => setToastNotif(null)}>
                    <div className="toast-icon">{toastNotif.icon}</div>
                    <div className="toast-content">
                        <div className="toast-header">
                            <span className="toast-app">IELTS Quest</span>
                            <span className="toast-time">now</span>
                        </div>
                        <p className="toast-title">{toastNotif.title}</p>
                        <p className="toast-message">{toastNotif.message}</p>
                    </div>
                </div>
            )}

            {/* Notifications Popup */}
            {showNotifications && (
                <div className="notif-overlay" onClick={() => setShowNotifications(false)}>
                    <div className="notif-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="notif-popup-header">
                            <div className="notif-popup-title">
                                <span className="notif-bell">🔔</span>
                                <h3>Notifications</h3>
                                {unreadCount > 0 && <span className="notif-count">{unreadCount} new</span>}
                            </div>
                            <button className="notif-close-btn" onClick={() => setShowNotifications(false)}>✕</button>
                        </div>

                        <div className="notif-popup-body">
                            {mockNotifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`notif-card ${notif.type} ${notif.unread ? 'unread' : ''}`}
                                    onClick={() => handleNotificationClick(notif)}
                                >
                                    <div className="notif-card-icon">{notif.icon}</div>
                                    <div className="notif-card-content">
                                        <div className="notif-card-header">
                                            <span className="notif-card-title">{notif.title}</span>
                                            <span className="notif-card-time">{notif.time}</span>
                                        </div>
                                        <p className="notif-card-message">{notif.message}</p>
                                    </div>
                                    {notif.unread && <div className="notif-unread-dot"></div>}
                                </div>
                            ))}
                        </div>

                        <div className="notif-popup-footer">
                            <button className="notif-mark-read">Mark all as read</button>
                        </div>
                    </div>
                </div>
            )}

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
                <div className="pstat">
                    <span className="pstat-val">{user.xp}</span>
                    <span className="pstat-lbl">Total XP</span>
                </div>
                <div className="pstat">
                    <span className="pstat-val">{user.streak}</span>
                    <span className="pstat-lbl">Streak</span>
                </div>
                <div className="pstat">
                    <span className="pstat-val">{user.completedActivities.length}</span>
                    <span className="pstat-lbl">Done</span>
                </div>
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
                    <button className="settings-item" onClick={() => setShowNotifications(true)}>
                        <span className="settings-icon">🔔</span>
                        <span className="settings-text">Notifications</span>
                        {unreadCount > 0 && <span className="settings-badge">{unreadCount}</span>}
                    </button>
                    <button className="settings-item">
                        <span className="settings-icon">🌙</span>
                        <span className="settings-text">Dark Mode</span>
                        <span className="settings-toggle on"></span>
                    </button>
                    <button className="settings-item">
                        <span className="settings-icon">❓</span>
                        <span className="settings-text">Help & FAQ</span>
                        <span className="settings-arrow">›</span>
                    </button>
                    <button className="settings-item logout" onClick={onLogout}>
                        <span className="settings-icon">🚪</span>
                        <span className="settings-text">Log Out</span>
                    </button>
                </div>
            </div>

            <div style={{ height: '100px' }} />
        </div>
    )
}

export default Profile
