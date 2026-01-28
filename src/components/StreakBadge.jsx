export default function StreakBadge({ streak, size = 'normal' }) {
  const getStreakMessage = (count) => {
    if (count === 0) return 'Starte deine Streak!'
    if (count === 1) return 'Erster Tag!'
    if (count < 7) return 'Guter Start!'
    if (count < 14) return 'Eine Woche!'
    if (count < 30) return 'Stark dabei!'
    if (count < 100) return 'Unglaublich!'
    return 'Legende!'
  }

  const getFireEmojis = (count) => {
    if (count === 0) return '💫'
    if (count < 7) return '🔥'
    if (count < 30) return '🔥🔥'
    if (count < 100) return '🔥🔥🔥'
    return '🔥🔥🔥🔥'
  }

  // Compact version - smaller, less padding
  if (size === 'compact') {
    return (
      <div className="streak-section streak-section--compact card card--glass">
        <div className="streak-compact-row">
          <span className="streak-number streak-number--compact">{streak}</span>
          <div className="streak-compact-info">
            <span className="streak-label--compact">
              {getFireEmojis(streak)} Tage in Folge
            </span>
            <span className="streak-message">{getStreakMessage(streak)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Large version - original full size
  if (size === 'large') {
    return (
      <div className="streak-section card card--glass card--glow">
        <div className="streak-number animate-pulse">{streak}</div>
        <div className="streak-label">
          {getFireEmojis(streak)} Tage in Folge
        </div>
        <p className="mt-2" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {getStreakMessage(streak)}
        </p>
      </div>
    )
  }

  // Normal badge version
  return (
    <div className={`streak-badge ${size === 'normal' ? '' : 'streak-badge--large'}`}>
      <span className="fire-emoji">{streak > 0 ? '🔥' : '💫'}</span>
      <span>{streak} Tag{streak !== 1 ? 'e' : ''}</span>
    </div>
  )
}
