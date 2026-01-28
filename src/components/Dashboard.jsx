import StreakBadge from './StreakBadge'
import WeekOverview from './WeekOverview'

export default function Dashboard({ 
  streak, 
  todayEntry, 
  weekEntries, 
  onNavigate,
  isEvening 
}) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '🌅 Morgen'
    if (hour < 18) return '☀️ Nachmittag'
    return '🌙 Abend'
  }

  const hasMorningGoal = todayEntry?.morning_goal
  const hasCompletedEvening = todayEntry?.evening_completed !== null && todayEntry?.evening_completed !== undefined

  return (
    <div className="dashboard page-with-nav">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header animate-fade-in">
          <div>
            <h1 className="greeting">{getGreeting()}!</h1>
            <span className="greeting-time">{getTimeOfDay()}</span>
          </div>
          <StreakBadge streak={streak} />
        </div>

        {/* Streak Section */}
        <StreakBadge streak={streak} size="large" />

        {/* Today's Goal */}
        <div className="card goal-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="goal-card-header">
            <h2 className="goal-card-title">Heutiges Ziel</h2>
            {hasMorningGoal && (
              <span className={`status ${hasCompletedEvening ? 'status--evening' : 'status--pending'}`}>
                {hasCompletedEvening 
                  ? (todayEntry.evening_completed ? '✓ Geschafft' : '✗ Nicht geschafft')
                  : '⏳ Offen'}
              </span>
            )}
          </div>
          
          {hasMorningGoal ? (
            <p className="goal-text">{todayEntry.morning_goal}</p>
          ) : (
            <p className="goal-text goal-empty">
              Noch kein Ziel für heute gesetzt
            </p>
          )}

          {/* Action Button */}
          <div className="mt-4">
            {!hasMorningGoal && (
              <button 
                onClick={() => onNavigate('morning')}
                className="btn btn--primary btn--full"
              >
                🌅 Morgenziel setzen
              </button>
            )}
            
            {hasMorningGoal && !hasCompletedEvening && isEvening && (
              <button 
                onClick={() => onNavigate('evening')}
                className="btn btn--success btn--full"
              >
                🌙 Abend-Check durchführen
              </button>
            )}

            {hasMorningGoal && !isEvening && !hasCompletedEvening && (
              <button 
                onClick={() => onNavigate('morning')}
                className="btn btn--secondary btn--full"
              >
                ✏️ Ziel bearbeiten
              </button>
            )}
          </div>
        </div>

        {/* Week Overview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <WeekOverview entries={weekEntries} />
        </div>

        {/* Quick Actions */}
        <div className="card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
            Schnellaktionen
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigate('morning')}
              className="btn btn--secondary"
            >
              🌅 Ziel setzen
            </button>
            <button 
              onClick={() => onNavigate('evening')}
              className="btn btn--secondary"
              disabled={!hasMorningGoal}
            >
              🌙 Abend-Check
            </button>
            <button 
              onClick={() => onNavigate('analytics')}
              className="btn btn--secondary"
            >
              📊 Statistiken
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
