import './BottomNav.css'

const BottomNav = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'journey', icon: '🗺️', label: 'Journey' },
        { id: 'stats', icon: '📊', label: 'Stats' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ]

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-items">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default BottomNav
