import { useState } from 'react'

export default function MorningInput({ onSubmit, existingGoal }) {
  const [goal, setGoal] = useState(existingGoal || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!goal.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(goal.trim())
    } catch (error) {
      console.error('Error saving goal:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="morning-input page-with-nav">
      <div className="container">
        <div className="card morning-card animate-slide-up">
          <div className="morning-icon">🌅</div>
          <h2 className="morning-title">Guten Morgen!</h2>
          <p className="morning-subtitle">
            Was macht dich heute 1% besser?
          </p>

          <form onSubmit={handleSubmit} className="morning-form">
            <div className="input-group">
              <label htmlFor="goal">Dein heutiges Ziel</label>
              <textarea
                id="goal"
                className="input textarea"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="z.B. 10 Minuten meditieren, 1 Kapitel lesen, 30 Minuten Sport..."
                rows={4}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn--primary btn--large btn--full"
              disabled={isSubmitting || !goal.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span>
                  Wird gespeichert...
                </>
              ) : existingGoal ? (
                '✓ Ziel aktualisieren'
              ) : (
                '✓ Ziel festlegen'
              )}
            </button>
          </form>

          {existingGoal && (
            <p className="mt-4 text-center" style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Du kannst dein Ziel jederzeit bearbeiten
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
