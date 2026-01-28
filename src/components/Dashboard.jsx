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

        {/* Compact Streak Section */}
        <StreakBadge streak={streak} size="compact" />

        {/* Today's Goal */}
        <div className="card goal-card goal-card--compact animate-fade-in" style={{ animationDelay: '0.1s' }}>
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
            <div className="goal-row">
              <p className="goal-text goal-text--inline">{todayEntry.morning_goal}</p>
              <button 
                onClick={() => onNavigate('morning')}
                className="btn btn--icon btn--ghost"
                title="Ziel bearbeiten"
              >
                ✏️
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('morning')}
              className="btn btn--primary btn--full"
            >
              🌅 Morgenziel setzen
            </button>
          )}

          {/* Evening Action - only show if goal exists and not completed */}
          {hasMorningGoal && !hasCompletedEvening && isEvening && (
            <button 
              onClick={() => onNavigate('evening')}
              className="btn btn--success btn--full mt-4"
            >
              🌙 Abend-Check durchführen
            </button>
          )}
        </div>

        {/* Week Overview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <WeekOverview entries={weekEntries} />
        </div>
      </div>
    </div>
  )
}
