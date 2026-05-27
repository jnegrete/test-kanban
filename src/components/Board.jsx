import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Column from './Column'
import Card from './Card'
import '../styles/board.css'

export default function Board({ state, onAddCard, onEditCard, onDeleteCard, onMoveCard, onAddColumn, onRenameColumn, onDeleteColumn }) {
  const [activeCard, setActiveCard] = useState(null)
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragStart(event) {
    const { active } = event
    const cardId = active.id
    if (state.cards[cardId]) {
      setActiveCard({ ...state.cards[cardId] })
    }
  }

  function handleAddColumn() {
    if (newColumnTitle.trim()) {
      onAddColumn(newColumnTitle.trim())
      setNewColumnTitle('')
      setShowAddColumn(false)
    }
  }

  function handleCancelAddColumn() {
    setNewColumnTitle('')
    setShowAddColumn(false)
  }

  function handleAddColumnKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddColumn()
    } else if (e.key === 'Escape') {
      handleCancelAddColumn()
    }
  }

  function handleDragEnd(event) {
    setActiveCard(null)
    const { active, over } = event
    if (!over) return

    const cardId = active.id
    if (!state.cards[cardId]) return

    const sourceColId = state.columnOrder.find((colId) =>
      state.columns[colId].cardIds.includes(cardId)
    )

    let destColId
    let destIndex

    if (state.columns[over.id]) {
      destColId = over.id
      destIndex = 0
    } else {
      destColId = state.columnOrder.find((colId) =>
        state.columns[colId].cardIds.includes(over.id)
      )
      destIndex = state.columns[destColId].cardIds.indexOf(over.id)
      if (destIndex === -1) destIndex = 0
    }

    if (!destColId) return

    onMoveCard(cardId, sourceColId, destColId, destIndex)
  }

  return (
    <div className="board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {state.columnOrder.map((colId) => {
          const column = state.columns[colId]
          return (
            <SortableContext
              key={colId}
              items={column.cardIds}
              strategy={verticalListSortingStrategy}
            >
              <Column
                column={column}
                cards={column.cardIds.map((cardId) => state.cards[cardId]).filter(Boolean)}
                onAddCard={onAddCard}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                onRenameColumn={onRenameColumn}
                onDeleteColumn={onDeleteColumn}
              />
            </SortableContext>
          )
        })}

        {showAddColumn ? (
          <div className="column add-column-form">
            <div className="column-header">
              <input
                className="column-rename-input"
                type="text"
                placeholder="Column title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyDown={handleAddColumnKeyDown}
                autoFocus
              />
            </div>
            <div className="add-card-actions">
              <button className="card-btn" onClick={handleAddColumn}>Add</button>
              <button className="card-btn" onClick={handleCancelAddColumn}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="add-column-btn" onClick={() => setShowAddColumn(true)}>
            Add Column
          </button>
        )}

        <DragOverlay>
          {activeCard ? <Card card={activeCard} isDragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
