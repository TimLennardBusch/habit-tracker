export default function WeekOverview({ entries, currentStreak = 0 }) {
  // Helper: format date as YYYY-MM-DD using LOCAL timezone
  const formatLocalDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Milestone streak numbers for diamond icons
  const milestones = [5, 10, 25, 50, 100, 150, 200, 365]

  const getDaysAroundToday = () => {
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // 3 days in past + today + 3 days in future = 7 days centered on today
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    
    return days
  }

  const days = getDaysAroundToday()
  const todayStr = formatLocalDate(new Date())

  const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  
  const getDayLabel = (date) => {
    const dayIndex = date.getDay()
    // Convert Sunday=0 to index 6, Monday=1 to index 0, etc.
    const labelIndex = dayIndex === 0 ? 6 : dayIndex - 1
    return dayLabels[labelIndex]
  }

  const getEntryForDate = (date) => {
    const dateStr = formatLocalDate(date)
    return entries.find(e => e.date === dateStr)
  }

  // Calculate what streak day this would be (for future milestone preview)
  const getProjectedStreak = (date) => {
    const dateStr = formatLocalDate(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)
    
    // Days from today (0 = today, 1 = tomorrow, etc.)
    const daysFromToday = Math.round((targetDate - today) / (1000 * 60 * 60 * 24))
    
    if (daysFromToday <= 0) return null // Only show for future days
    
    // Projected streak = current streak + days from today (assuming all completed)
    return currentStreak + daysFromToday
  }

  // Check if a projected streak is a milestone
  const isMilestone = (projectedStreak) => {
    return projectedStreak && milestones.includes(projectedStreak)
  }

  const getDayStatus = (date, entry) => {
    const dateStr = formatLocalDate(date)
    const isToday = dateStr === todayStr
    const isFuture = dateStr > todayStr
    
    if (isFuture) return 'future'
    if (isToday) {
      if (!entry) return 'today-empty'
      if (typeof entry.evening_completed !== 'boolean') return 'today-pending'
      return entry.evening_completed ? 'today-completed' : 'today-failed'
    }
    
    if (!entry) return 'empty'
    if (typeof entry.evening_completed !== 'boolean') return 'pending'
    return entry.evening_completed ? 'completed' : 'failed'
  }

  const getDayClasses = (status) => {
    const classes = ['day-cell']
    
    switch (status) {
      case 'completed':
      case 'today-completed':
        classes.push('day-cell--completed')
        break
      case 'failed':
      case 'today-failed':
        classes.push('day-cell--failed')
        break
      case 'today-pending':
      case 'today-empty':
        classes.push('day-cell--pending')
        break
      case 'pending':
        classes.push('day-cell--pending')
        break
      default:
        break
    }
    
    if (status.startsWith('today')) {
      classes.push('day-cell--today')
    }
    
    return classes.join(' ')
  }

  const getDayIcon = (status, projectedStreak) => {
    // Show diamond for milestone days
    if (isMilestone(projectedStreak)) {
      return '💎'
    }
    
    switch (status) {
      case 'completed':
      case 'today-completed':
        return '✓'
      case 'failed':
      case 'today-failed':
        return '✗'
      case 'pending':
      case 'today-pending':
      case 'today-empty':
        return '•'
      default:
        return ''
    }
  }

  return (
    <div className="week-overview card">
      <h3 className="week-overview-title">Diese Woche</h3>
      <div className="week-grid">
        {days.map((date) => {
          const entry = getEntryForDate(date)
          const status = getDayStatus(date, entry)
          const projectedStreak = getProjectedStreak(date)
          const hasMilestone = isMilestone(projectedStreak)
          
          return (
            <div 
              key={formatLocalDate(date)} 
              className={`${getDayClasses(status)} ${hasMilestone ? 'day-cell--milestone' : ''}`}
              title={hasMilestone ? `Tag ${projectedStreak} Streak! 💎` : (entry?.morning_goal || '')}
            >
              <span className="day-label">{getDayLabel(date)}</span>
              <span className={hasMilestone ? 'milestone-icon' : ''}>{getDayIcon(status, projectedStreak)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
