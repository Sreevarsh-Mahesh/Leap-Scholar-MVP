import React from 'react';
import './Journey.css';

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
    ];

    const islands = [
        { name: 'Starter Island', theme: 'beach', icon: '🏝️' },
        { name: 'Forest of Words', theme: 'forest', icon: '🌲' },
        { name: 'Voice Valley', theme: 'mountain', icon: '🏔️' },
        { name: 'Summit Peak', theme: 'summit', icon: '⛰️' },
    ];

    const isCompleted = (activityId) => {
        return user.completedActivities.some((id) =>
            id.includes(`-${activityId}`) || id.includes(`byte-${activityId}`)
        );
    };

    const getNextActivity = () => {
        for (let activity of activities) {
            if (!isCompleted(activity.id)) return activity.id;
        }
        return activities.length + 1;
    };

    const isLocked = (activityId) => {
        return activityId > getNextActivity();
    };

    const completedCount = activities.filter((a) => isCompleted(a.id)).length;
    const progressPercent = (completedCount / activities.length) * 100;

    // Global Zigzag Pattern: Center -> Right -> Center -> Left
    const getPosType = (globalIndex) => {
        const pattern = ['center', 'right', 'center', 'left'];
        return pattern[globalIndex % 4];
    };

    const getCoordinates = (posType, y) => {
        let x = 150; // Center
        if (posType === 'left') x = 60;
        if (posType === 'right') x = 240;
        return { x, y };
    };

    return (
        <div className="journey-page">
            <div className="page-header">
                <h1>🗺️ Adventure Map</h1>
            </div>

            {/* Progress Bar */}
            <div className="map-progress">
                <div className="map-progress-bar">
                    <div
                        className="map-progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="map-progress-labels">
                    <span>🏝️</span>
                    <span className="progress-count">
                        ⭐ {completedCount}/{activities.length}
                    </span>
                    <span>🏆</span>
                </div>
            </div>

            {/* Islands */}
            <div className="islands-container">
                {islands.map((island, islandIndex) => {
                    const islandActivities = activities.filter(
                        (a) => a.island === island.name
                    );
                    const islandCompleted = islandActivities.every((a) =>
                        isCompleted(a.id)
                    );
                    const islandLocked =
                        islandActivities[0] && isLocked(islandActivities[0].id);

                    // Calculate activity nodes with coordinates for this island
                    const nodes = islandActivities.map((activity) => {
                        const globalIndex = activities.findIndex((a) => a.id === activity.id);
                        const posType = getPosType(globalIndex);
                        // Distribute vertically: 60, 160, 260
                        const y = 60 + (islandActivities.indexOf(activity) * 100);
                        return {
                            ...activity,
                            coords: getCoordinates(posType, y),
                            globalIndex,
                            posType,
                        };
                    });

                    // Determine connection to next island
                    let bridgeType = null;
                    if (islandIndex < islands.length - 1) {
                        const lastNodeIndex = nodes[nodes.length - 1].globalIndex;
                        const nextNodeIndex = lastNodeIndex + 1;
                        const fromPos = getPosType(lastNodeIndex);
                        const toPos = getPosType(nextNodeIndex);
                        bridgeType = { from: fromPos, to: toPos };
                    }

                    return (
                        <React.Fragment key={island.name}>
                            <div
                                className={`island ${island.theme} ${islandCompleted ? 'completed' : ''
                                    } ${islandLocked ? 'locked' : ''}`}
                            >
                                {/* Island Header */}
                                <div className="island-header">
                                    <span className="island-icon">{island.icon}</span>
                                    <div className="island-info">
                                        <h3>{island.name}</h3>
                                        <span className="island-status">
                                            {islandCompleted
                                                ? '✅ Complete'
                                                : islandLocked
                                                    ? '🔒 Locked'
                                                    : `${islandActivities.filter((a) => isCompleted(a.id)).length
                                                    }/${islandActivities.length} done`}
                                        </span>
                                    </div>
                                </div>

                                {/* Path Container */}
                                <div className="duo-path-container">
                                    <svg
                                        className="path-svg"
                                        viewBox="0 0 300 320"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        {/* Draw paths between nodes in this island */}
                                        {nodes.map((node, i) => {
                                            if (i === nodes.length - 1) return null; // Last node has no next node inside island
                                            const nextNode = nodes[i + 1];
                                            const isPathDone = isCompleted(node.id);

                                            return (
                                                <g key={`path-${node.id}`}>
                                                    {/* Background Line */}
                                                    <path
                                                        d={`M ${node.coords.x} ${node.coords.y} Q ${node.coords.x} ${nextNode.coords.y}, ${nextNode.coords.x} ${nextNode.coords.y}`}
                                                        fill="none"
                                                        stroke="rgba(255,255,255,0.2)"
                                                        strokeWidth="10"
                                                        strokeDasharray="12 12"
                                                        strokeLinecap="round"
                                                    />
                                                    {/* Progress Line */}
                                                    <path
                                                        d={`M ${node.coords.x} ${node.coords.y} Q ${node.coords.x} ${nextNode.coords.y}, ${nextNode.coords.x} ${nextNode.coords.y}`}
                                                        fill="none"
                                                        stroke="#10b981"
                                                        strokeWidth="10"
                                                        strokeDasharray="12 12"
                                                        strokeLinecap="round"
                                                        style={{
                                                            opacity: isPathDone ? 1 : 0,
                                                            transition: 'opacity 0.5s ease 0.2s',
                                                        }}
                                                    />
                                                </g>
                                            );
                                        })}
                                    </svg>

                                    {/* Nodes */}
                                    {nodes.map((node) => (
                                        <div
                                            key={node.id}
                                            className="node-absolute-wrapper"
                                            style={{
                                                left: `${(node.coords.x / 300) * 100}%`,
                                                top: `${(node.coords.y / 320) * 100}%`,
                                            }}
                                        >
                                            <NodeComponent
                                                activity={node}
                                                completed={isCompleted(node.id)}
                                                locked={isLocked(node.id)}
                                                current={node.id === getNextActivity()}
                                                onStart={onStartActivity}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inter-Island Bridge */}
                            {bridgeType && (
                                <div className="island-bridge">
                                    <svg viewBox="0 0 300 60" preserveAspectRatio="none">
                                        {/* Simplified calc for bridge: From Bottom of prev to Top of next */}
                                        {/* Prev Bottom Y is roughly top of bridge box, Next Top Y is bottom of bridge box */}
                                        {/* This is a visual connector between the two cards */}
                                        <path
                                            d={`M ${getCoordinates(bridgeType.from, 0).x} 0 C ${getCoordinates(bridgeType.from, 0).x} 30, ${getCoordinates(bridgeType.to, 0).x} 30, ${getCoordinates(bridgeType.to, 0).x} 60`}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.15)"
                                            strokeWidth="8"
                                            strokeDasharray="10 10"
                                            strokeLinecap="round"
                                        />
                                        {/* If the last activity of prev island is done, color this bridge? 
                           Ideally check if the next island's first activity is unlocked/reachable */}
                                        <path
                                            d={`M ${getCoordinates(bridgeType.from, 0).x} 0 C ${getCoordinates(bridgeType.from, 0).x} 30, ${getCoordinates(bridgeType.to, 0).x} 30, ${getCoordinates(bridgeType.to, 0).x} 60`}
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="8"
                                            strokeDasharray="10 10"
                                            strokeLinecap="round"
                                            style={{
                                                opacity: isCompleted(islandActivities[islandActivities.length - 1].id) ? 1 : 0,
                                                transition: 'opacity 0.5s ease',
                                            }}
                                        />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                {/* Final Treasure */}
                <div className="treasure-section">
                    <div className="treasure-icon">🏆</div>
                    <h3>IELTS Master</h3>
                </div>
            </div>

            <div style={{ height: '120px' }} />
        </div>
    );
};

// Separate Node Component
const NodeComponent = ({ activity, completed, locked, current, onStart }) => {
    return (
        <div className="node-container">
            <div className="hover-tooltip">
                <span className="tt-type">
                    {activity.type === 'rapid' ? '🎮 Game' : '📺 Video'}
                </span>
                <span className="tt-title">{activity.title}</span>
                <span className="tt-xp">+{activity.xp} XP</span>
            </div>

            <div
                className={`duo-node ${completed ? 'completed' : ''} ${locked ? 'locked' : ''
                    } ${current ? 'current' : ''}`}
                onClick={() => !locked && onStart(activity)}
            >
                {current && <div className="progress-ring"></div>}

                <div className="node-btn">
                    {completed ? (
                        <span className="check-icon">✓</span>
                    ) : locked ? (
                        <span className="lock-icon">🔒</span>
                    ) : (
                        <span className="type-icon">
                            {activity.type === 'rapid' ? '🎮' : '📺'}
                        </span>
                    )}
                </div>

                {current && <div className="start-label">START</div>}
            </div>
        </div>
    );
};

export default Journey;
