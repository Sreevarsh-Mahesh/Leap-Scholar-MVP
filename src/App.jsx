import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Journey from './components/Journey'
import RapidFire from './components/RapidFire'
import Bytes from './components/Bytes'
import Stats from './components/Stats'
import Profile from './components/Profile'
import BottomNav from './components/BottomNav'

function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [showRapidFire, setShowRapidFire] = useState(false)
  const [showBytes, setShowBytes] = useState(false)
  const [rapidFireSkill, setRapidFireSkill] = useState(null)
  const [selectedByte, setSelectedByte] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('ieltsQuestUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleOnboardingComplete = (userData) => {
    const newUser = {
      ...userData,
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toDateString(),
      completedActivities: [],
      badges: [],
      joinedDate: new Date().toISOString()
    }
    localStorage.setItem('ieltsQuestUser', JSON.stringify(newUser))
    setUser(newUser)
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    localStorage.setItem('ieltsQuestUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const addXP = (amount) => {
    updateUser({ xp: user.xp + amount })
  }

  const updateStreak = () => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    if (user.lastActiveDate === today) return
    
    if (user.lastActiveDate === yesterday) {
      updateUser({ 
        streak: user.streak + 1, 
        lastActiveDate: today 
      })
    } else if (user.lastActiveDate !== today) {
      updateUser({ 
        streak: 1, 
        lastActiveDate: today 
      })
    }
  }

  const completeActivity = (activityId, xpEarned) => {
    if (!user.completedActivities.includes(activityId)) {
      updateUser({
        completedActivities: [...user.completedActivities, activityId],
        xp: user.xp + xpEarned
      })
      updateStreak()
    }
  }

  const startRapidFire = (skill) => {
    setRapidFireSkill(skill)
    setShowRapidFire(true)
  }

  const startByte = (byte) => {
    setSelectedByte(byte)
    setShowBytes(true)
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (showRapidFire) {
    return (
      <RapidFire 
        skill={rapidFireSkill}
        user={user}
        onComplete={(xp) => {
          completeActivity(`rapid-${rapidFireSkill}-${Date.now()}`, xp)
          setShowRapidFire(false)
        }}
        onClose={() => setShowRapidFire(false)}
      />
    )
  }

  if (showBytes) {
    return (
      <Bytes 
        byte={selectedByte}
        user={user}
        onComplete={(xp) => {
          completeActivity(`byte-${selectedByte.id}`, xp)
          setShowBytes(false)
        }}
        onClose={() => setShowBytes(false)}
      />
    )
  }

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <Home 
          user={user} 
          onStartRapidFire={startRapidFire}
          onStartByte={startByte}
        />
      )}
      {currentPage === 'journey' && (
        <Journey 
          user={user}
          onStartActivity={(activity) => {
            if (activity.type === 'rapid') {
              startRapidFire(activity.skill)
            } else {
              startByte(activity)
            }
          }}
        />
      )}
      {currentPage === 'stats' && <Stats user={user} />}
      {currentPage === 'profile' && (
        <Profile 
          user={user} 
          onLogout={() => {
            localStorage.removeItem('ieltsQuestUser')
            setUser(null)
          }}
        />
      )}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}

export default App
