import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import EditCardForm from './EditCardForm'
import '../styles/card.css'

export default function Card({ card, onEdit, onDelete, isDragOverlay }) {
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  if (isDragOverlay) {
    return (
      <div className="card card-overlay">
        <div className="card-title">{card.title}</div>
        {card.description && <p className="card-desc">{card.description}</p>}
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="card">
        <EditCardForm
          card={card}
          onSave={(updates) => {
            onEdit(card.id, updates)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="card" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card-title">{card.title}</div>
      {card.description && <p className="card-desc">{card.description}</p>}
      <div className="card-actions">
        <button className="card-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        {showConfirm ? (
          <span className="card-confirm">
            Delete?
            <button className="card-btn card-btn-danger" onClick={() => onDelete(card.id)}>
              Yes
            </button>
            <button className="card-btn" onClick={() => setShowConfirm(false)}>
              No
            </button>
          </span>
        ) : (
          <button className="card-btn card-btn-danger" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
