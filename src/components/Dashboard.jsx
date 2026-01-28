import { useState } from 'react'
import StreakBadge from './StreakBadge'
import WeekOverview from './WeekOverview'
import CompletionPopup from './CompletionPopup'

export default function Dashboard({ 
  streak, 
  todayEntry, 
  yesterdayEntry,
  weekEntries, 
  onNavigate,
  onComplete,
  isEvening 
}) {
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const [popupGoal, setPopupGoal] = useState('')
  const [popupDate, setPopupDate] = useState(null)

  const hasMorningGoal = todayEntry?.morning_goal
  const hasCompletedEvening = typeof todayEntry?.evening_completed === 'boolean'
  const hasYesterdayPending = yesterdayEntry?.morning_goal && typeof yesterdayEntry?.evening_completed !== 'boolean'

  const openCompletionPopup = (goal, date = null) => {
    setPopupGoal(goal)
    setPopupDate(date)
    setShowCompletionPopup(true)
  }

  const handlePopupComplete = (completed) => {
    onComplete(completed, null, popupDate)
    setShowCompletionPopup(false)
  }

  // Render status icon button
  const StatusBadge = ({ completed, isPending, onClick }) => {
    if (isPending) {
      return (
        <button 
          onClick={onClick}
          className="status-icon status-icon--pending"
          title="Ziel bestätigen"
        >
          ⏳
        </button>
      )
    }
    
    if (completed) {
      return <span className="status-icon status-icon--success">✓</span>
    }
    
    return <span className="status-icon status-icon--failed">✗</span>
  }

  return (
    <div className="dashboard page-with-nav">
      <div className="container container--narrow">
        {/* Header */}
        <div className="dashboard-header animate-fade-in">
          <div>
            <h1 className="greeting">Moin, Tim!</h1>
          </div>
        </div>

        {/* Compact Streak Section */}
        <StreakBadge streak={streak} size="compact" />

        {/* CATCH-UP BOX: Yesterday's Goal */}
        {hasYesterdayPending && (
          <div className="card goal-card goal-card--compact goal-card--warning animate-fade-in mb-4">
            <div className="goal-card-header">
              <h2 className="goal-card-title goal-card-title--warning">Gestriges Ziel</h2>
              <StatusBadge 
                isPending={true} 
                onClick={() => openCompletionPopup(yesterdayEntry.morning_goal, yesterdayEntry.date)}
              />
            </div>
            
            <div className="goal-row">
              <p className="goal-text goal-text--inline">{yesterdayEntry.morning_goal}</p>
            </div>
          </div>
        )}

        {/* Today's Goal */}
        <div className="card goal-card goal-card--compact animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="goal-card-header">
            <h2 className="goal-card-title">Heutiges Ziel</h2>
            {hasMorningGoal && (
              <StatusBadge 
                completed={todayEntry.evening_completed}
                isPending={!hasCompletedEvening}
                onClick={() => openCompletionPopup(todayEntry.morning_goal)}
              />
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
        </div>

        {/* Week Overview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <WeekOverview entries={weekEntries} />
        </div>

        {/* Completion Popup */}
        <CompletionPopup 
          isOpen={showCompletionPopup}
          goal={popupGoal}
          onClose={() => setShowCompletionPopup(false)}
          onComplete={handlePopupComplete}
        />
      </div>
    </div>
  )
}
