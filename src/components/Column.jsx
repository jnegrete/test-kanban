import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './Card'
import AddCardForm from './AddCardForm'
import '../styles/column.css'

export default function Column({ column, cards, onAddCard, onEditCard, onDeleteCard }) {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div className="column" ref={setNodeRef}>
      <div className="column-header">
        <h2 className="column-title">{column.title}</h2>
        <span className="column-count">{cards.length}</span>
      </div>

      <div className="column-cards">
        {cards.length === 0 && <p className="column-empty">No cards</p>}
        {cards.map((card) =>
          card ? (
            <Card
              key={card.id}
              card={card}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ) : null
        )}
      </div>

      <AddCardForm columnId={column.id} onAdd={onAddCard} />
    </div>
  )
}
