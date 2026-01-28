export default function WeekOverview({ entries }) {
  // Helper: format date as YYYY-MM-DD using LOCAL timezone
  const formatLocalDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getDaysOfWeek = () => {
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Start from Monday of current week
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      days.push(date)
    }
    
    return days
  }

  const days = getDaysOfWeek()
  
  // Get today's date string using LOCAL timezone
  const todayStr = formatLocalDate(new Date())

  const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  const getEntryForDate = (date) => {
    const dateStr = formatLocalDate(date)
    return entries.find(e => e.date === dateStr)
  }

  const getDayStatus = (date, entry) => {
    const dateStr = formatLocalDate(date)
    
    // Compare dates using local date strings
    const isToday = dateStr === todayStr
    const isFuture = dateStr > todayStr
    
    if (isFuture) return 'future'
    if (isToday) {
      if (!entry) return 'today-empty'
      if (typeof entry.evening_completed !== 'boolean') return 'today-pending'
      return entry.evening_completed ? 'today-completed' : 'today-failed'
    }
    
    // Past days
    if (!entry) return 'empty' // No entry = gray (not red!)
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
      case 'empty':
        // Empty days stay gray (default styling)
        break
      default:
        break
    }
    
    if (status.startsWith('today')) {
      classes.push('day-cell--today')
    }
    
    return classes.join(' ')
  }

  const getDayIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'today-completed':
        return '✓'
      case 'failed':
      case 'today-failed':
        return '✗'
      case 'pending':
      case 'today-pending':
        return '•'
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
        {days.map((date, index) => {
          const entry = getEntryForDate(date)
          const status = getDayStatus(date, entry)
          
          return (
            <div 
              key={formatLocalDate(date)} 
              className={getDayClasses(status)}
              title={entry?.morning_goal || ''}
            >
              <span className="day-label">{dayLabels[index]}</span>
              <span>{getDayIcon(status)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
