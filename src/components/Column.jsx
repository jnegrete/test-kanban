import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './Card'
import AddCardForm from './AddCardForm'
import ColumnHeader from './ColumnHeader'
import '../styles/column.css'

export default function Column({ column, cards, onAddCard, onEditCard, onDeleteCard, onRenameColumn, onDeleteColumn }) {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div className="column" ref={setNodeRef}>
      <ColumnHeader
        column={column}
        onRename={onRenameColumn}
        onDelete={onDeleteColumn}
        cardCount={cards.length}
      />

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
