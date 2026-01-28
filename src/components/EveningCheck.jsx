import { useState } from 'react'

export default function EveningCheck({ goal, onSubmit }) {
  const [completed, setCompleted] = useState(null)
  const [reflection, setReflection] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (didComplete) => {
    setCompleted(didComplete)
    setIsSubmitting(true)
    
    try {
      await onSubmit(didComplete, reflection.trim() || null)
      setIsSuccess(true)
    } catch (error) {
      console.error('Error saving evening check:', error)
      setCompleted(null)
    }
    
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="evening-check page-with-nav">
        <div className="container">
          <div className="card success-animation animate-slide-up">
            <div className="success-checkmark">
              {completed ? '🎉' : '💪'}
            </div>
            <p className="success-text">
              {completed 
                ? 'Großartig! Du hast dein Ziel erreicht!' 
                : 'Morgen ist ein neuer Tag!'}
            </p>
            <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
              {completed 
                ? 'Weiter so – jeder Tag zählt!' 
                : 'Jeder Rückschlag ist eine Chance zu wachsen.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="evening-check page-with-nav">
      <div className="container">
        <div className="card evening-card animate-slide-up">
          <div className="evening-icon">🌙</div>
          
          <div className="evening-goal-display">
            <strong>Dein Ziel heute:</strong>
            <br />
            {goal}
          </div>

          <h2 className="evening-question">
            Hast du dein Ziel erreicht?
          </h2>

          <div className="evening-buttons">
            <button
              onClick={() => handleSubmit(true)}
              className="btn btn--success btn--large"
              disabled={isSubmitting}
            >
              ✓ Ja!
            </button>
            <button
              onClick={() => handleSubmit(false)}
              className="btn btn--secondary btn--large"
              disabled={isSubmitting}
            >
              ✗ Nein
            </button>
          </div>

          <div className="reflection-section">
            <h3 className="reflection-title">
              Optionale Reflexion
            </h3>
            <textarea
              className="input textarea"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Was hast du gelernt? Was könntest du morgen anders machen?"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
