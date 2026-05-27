import { useState } from 'react'
import '../styles/column.css'

export default function ColumnHeader({ column, onRename, onDelete, cardCount }) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTitle, setNewTitle] = useState(column.title)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleStartRename() {
    setNewTitle(column.title)
    setIsRenaming(true)
  }

  function handleSubmitRename() {
    if (newTitle.trim()) {
      onRename(column.id, newTitle.trim())
    }
    setIsRenaming(false)
  }

  function handleCancelRename() {
    setIsRenaming(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmitRename()
    } else if (e.key === 'Escape') {
      handleCancelRename()
    }
  }

  function handleDeleteClick() {
    setShowConfirm(true)
  }

  function handleConfirmDelete() {
    onDelete(column.id)
    setShowConfirm(false)
  }

  function handleCancelDelete() {
    setShowConfirm(false)
  }

  if (isRenaming) {
    return (
      <div className="column-header">
        <div className="column-rename-form">
          <input
            className="column-rename-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmitRename}
            autoFocus
          />
          <div className="add-card-actions">
            <button className="card-btn" onClick={handleSubmitRename}>Save</button>
            <button className="card-btn" onClick={handleCancelRename}>Cancel</button>
          </div>
        </div>
        <span className="column-count">{cardCount}</span>
      </div>
    )
  }

  return (
    <div className="column-header">
      <h2 className="column-title" onClick={handleStartRename} style={{ cursor: 'pointer' }}>
        {column.title}
      </h2>
      <span className="column-count">{cardCount}</span>
      <div className="column-actions">
        {showConfirm ? (
          cardCount > 0 ? (
            <span className="card-confirm">Move cards first</span>
          ) : (
            <span className="card-confirm">
              Delete?
              <button className="card-btn card-btn-danger" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className="card-btn" onClick={handleCancelDelete}>
                No
              </button>
            </span>
          )
        ) : (
          <button className="card-btn card-btn-danger" onClick={handleDeleteClick}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
