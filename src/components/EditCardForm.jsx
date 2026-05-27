import { useState } from 'react'

export default function EditCardForm({ card, onSave, onCancel }) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title, description })
  }

  return (
    <form className="edit-card-form" onSubmit={handleSubmit}>
      <input
        className="add-card-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <input
        className="add-card-input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="add-card-actions">
        <button className="card-btn" type="submit">Save</button>
        <button className="card-btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
