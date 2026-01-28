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

  return (
    <div className={`streak-badge ${size === 'normal' ? '' : 'streak-badge--large'}`}>
      <span className="fire-emoji">{streak > 0 ? '🔥' : '💫'}</span>
      <span>{streak} Tag{streak !== 1 ? 'e' : ''}</span>
    </div>
  )
}
