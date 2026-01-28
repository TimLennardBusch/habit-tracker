export default function BottomNav({ currentView, onNavigate }) {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'morning', icon: '🌅', label: 'Morgen' },
    { id: 'evening', icon: '🌙', label: 'Abend' },
    { id: 'analytics', icon: '📊', label: 'Stats' }
  ]

  return (
    <nav className="bottom-nav">
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.id} className="nav-item">
            <button
              onClick={() => onNavigate(item.id)}
              className={`nav-link ${currentView === item.id ? 'nav-link--active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
