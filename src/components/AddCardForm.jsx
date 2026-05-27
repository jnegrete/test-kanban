import { useState } from 'react'

export default function AddCardForm({ columnId, onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    onAdd(columnId, title, description)
    setTitle('')
    setDescription('')
    setError('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button className="add-card-btn" onClick={() => setIsOpen(true)}>
        + Add Card
      </button>
    )
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <input
        className="add-card-input"
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setError('') }}
        autoFocus
      />
      {error && <p className="add-card-error">{error}</p>}
      <input
        className="add-card-input"
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="add-card-actions">
        <button className="card-btn" type="submit">Add</button>
        <button className="card-btn" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </form>
  )
}
