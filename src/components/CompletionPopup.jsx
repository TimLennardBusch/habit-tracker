import { useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function CompletionPopup({ goal, isOpen, onClose, onComplete }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleCreateConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#6366f1', '#10b981', '#fbbf24']
    })
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#6366f1', '#10b981', '#fbbf24']
    })
  }

  if (!isOpen) return null

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div 
        className="popup-modal" 
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="popup-icon">🎯</div>
        <h2 className="popup-title">Ziel erreicht?</h2>
        <p className="popup-goal">{goal}</p>

        <div className="popup-actions">
          <button
            onClick={() => {
              handleCreateConfetti()
              onComplete(true)
            }}
            className="popup-btn popup-btn--success"
          >
            <span className="popup-btn-icon">✓</span>
            Geschafft
          </button>
          
          <button
            onClick={() => onComplete(false)}
            className="popup-btn popup-btn--danger"
          >
            <span className="popup-btn-icon">✗</span>
            Leider nicht
          </button>
        </div>

        <button onClick={onClose} className="popup-close">
          Abbrechen
        </button>
      </div>
    </div>
  )
}
