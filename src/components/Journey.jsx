import './Journey.css'

const Journey = ({ user, onStartActivity }) => {
    const activities = [
        { id: 1, type: 'rapid', skill: 'listening', title: 'Listening Basics', xp: 50, island: 'Starter Island' },
        { id: 2, type: 'byte', skill: 'listening', title: 'Understanding Accents', xp: 40, island: 'Starter Island' },
        { id: 3, type: 'rapid', skill: 'reading', title: 'Reading Comprehension', xp: 50, island: 'Starter Island' },
        { id: 4, type: 'byte', skill: 'reading', title: 'Skimming Techniques', xp: 45, island: 'Forest of Words' },
        { id: 5, type: 'rapid', skill: 'writing', title: 'Grammar Essentials', xp: 50, island: 'Forest of Words' },
        { id: 6, type: 'byte', skill: 'writing', title: 'Task 1 Strategies', xp: 55, island: 'Forest of Words' },
        { id: 7, type: 'rapid', skill: 'speaking', title: 'Speaking Confidence', xp: 50, island: 'Voice Valley' },
        { id: 8, type: 'byte', skill: 'speaking', title: 'Fluency Tips', xp: 40, island: 'Voice Valley' },
        { id: 9, type: 'rapid', skill: 'listening', title: 'Advanced Listening', xp: 60, island: 'Voice Valley' },
        { id: 10, type: 'byte', skill: 'reading', title: 'Critical Analysis', xp: 50, island: 'Summit Peak' },
        { id: 11, type: 'rapid', skill: 'writing', title: 'Essay Structure', xp: 55, island: 'Summit Peak' },
        { id: 12, type: 'byte', skill: 'speaking', title: 'Part 2 Mastery', xp: 60, island: 'Summit Peak' },
    ]

    const isCompleted = (activityId) => {
        return user.completedActivities.some(id => id.includes(`-${activityId}`) || id.includes(`byte-${activityId}`))
    }

    const getNextActivity = () => {
        for (let activity of activities) {
            if (!isCompleted(activity.id)) return activity.id
        }
        return activities.length + 1
    }

    const isLocked = (activityId) => {
        return activityId > getNextActivity()
    }

    const completedCount = activities.filter(a => isCompleted(a.id)).length
    const progressPercent = (completedCount / activities.length) * 100

    const islands = [
        { name: 'Starter Island', theme: 'beach', icon: '🏝️' },
        { name: 'Forest of Words', theme: 'forest', icon: '🌲' },
        { name: 'Voice Valley', theme: 'mountain', icon: '🏔️' },
        { name: 'Summit Peak', theme: 'summit', icon: '⛰️' },
    ]

    // Defined coordinate system for 300x320 SVG space
    // pos index: 0=center-top, 1=right, 2=center-bottom
    const getCoordinates = (index) => {
        // 3 nodes per island
        if (index === 0) return { x: 150, y: 60 }   // Center Top
        if (index === 1) return { x: 230, y: 160 }  // Right Middle
        if (index === 2) return { x: 150, y: 260 }  // Center Bottom
        return { x: 150, y: 0 }
    }

    return (
        <div className="journey-page">
            <div className="page-header">
                <h1>🗺️ Adventure Map</h1>
            </div>

            {/* Progress Bar */}
            <div className="map-progress">
                <div className="map-progress-bar">
                    <div className="map-progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="map-progress-labels">
                    <span>🏝️</span>
                    <span className="progress-count">⭐ {completedCount}/{activities.length}</span>
                    <span>🏆</span>
                </div>
            </div>

            {/* Islands */}
            <div className="islands-container">
                {islands.map((island) => {
                    const islandActivities = activities.filter(a => a.island === island.name)
                    const islandCompleted = islandActivities.every(a => isCompleted(a.id))
                    const islandLocked = islandActivities[0] && isLocked(islandActivities[0].id)

                    return (
                        <div
                            key={island.name}
                            className={`island ${island.theme} ${islandCompleted ? 'completed' : ''} ${islandLocked ? 'locked' : ''}`}
                        >
                            {/* Island Header */}
                            <div className="island-header">
                                <span className="island-icon">{island.icon}</span>
                                <div className="island-info">
                                    <h3>{island.name}</h3>
                                    <span className="island-status">
                                        {islandCompleted ? '✅ Complete' : islandLocked ? '🔒 Locked' : `${islandActivities.filter(a => isCompleted(a.id)).length}/${islandActivities.length} done`}
                                    </span>
                                </div>
                            </div>

                            {/* Path Container */}
                            <div className="duo-path-container">
                                {/* SVG connecting lines defined in JS to perfectly match nodes */}
                                <svg className="path-svg" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid meet">
                                    {/* Path 1 -> 2 */}
                                    <path
                                        d="M 150 60 Q 230 60, 230 160"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="8"
                                        strokeDasharray="12 12"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 150 60 Q 230 60, 230 160"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="8"
                                        strokeDasharray="12 12"
                                        strokeLinecap="round"
                                        className="path-progress"
                                        style={{
                                            opacity: isCompleted(islandActivities[0]?.id) ? 1 : 0,
                                            transition: 'opacity 0.5s ease 0.2s'
                                        }}
                                    />

                                    {/* Path 2 -> 3 */}
                                    <path
                                        d="M 230 160 Q 230 260, 150 260"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="8"
                                        strokeDasharray="12 12"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 230 160 Q 230 260, 150 260"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="8"
                                        strokeDasharray="12 12"
                                        strokeLinecap="round"
                                        className="path-progress"
                                        style={{
                                            opacity: isCompleted(islandActivities[1]?.id) ? 1 : 0,
                                            transition: 'opacity 0.5s ease 0.2s'
                                        }}
                                    />
                                </svg>

                                {/* Nodes positioned using the same coordinates */}
                                {islandActivities.map((activity, index) => {
                                    const coords = getCoordinates(index)
                                    return (
                                        <div
                                            key={activity.id}
                                            className="node-absolute-wrapper"
                                            style={{
                                                left: `${(coords.x / 300) * 100}%`,
                                                top: `${(coords.y / 320) * 100}%`
                                            }}
                                        >
                                            <NodeComponent
                                                activity={activity}
                                                completed={isCompleted(activity.id)}
                                                locked={isLocked(activity.id)}
                                                current={activity.id === getNextActivity()}
                                                onStart={onStartActivity}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

                {/* Final Treasure */}
                <div className="treasure-section">
                    <div className="treasure-icon">🏆</div>
                    <h3>IELTS Master</h3>
                </div>
            </div>

            <div style={{ height: '120px' }} />
        </div>
    )
}

// Separate Node Component
const NodeComponent = ({ activity, completed, locked, current, onStart }) => {
    return (
        <div className="node-container">
            <div className="hover-tooltip">
                <span className="tt-type">{activity.type === 'rapid' ? '🎮 Game' : '📺 Video'}</span>
                <span className="tt-title">{activity.title}</span>
                <span className="tt-xp">+{activity.xp} XP</span>
            </div>

            <div
                className={`duo-node ${completed ? 'completed' : ''} ${locked ? 'locked' : ''} ${current ? 'current' : ''}`}
                onClick={() => !locked && onStart(activity)}
            >
                {current && <div className="progress-ring"></div>}

                <div className="node-btn">
                    {completed ? (
                        <span className="check-icon">✓</span>
                    ) : locked ? (
                        <span className="lock-icon">🔒</span>
                    ) : (
                        <span className="type-icon">{activity.type === 'rapid' ? '🎮' : '📺'}</span>
                    )}
                </div>

                {current && <div className="start-label">START</div>}
            </div>
        </div>
    )
}

export default Journey
