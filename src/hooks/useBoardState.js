import { useCallback } from 'react'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function boardReducer(state, action) {
  switch (action.type) {
    case 'ADD_CARD': {
      const { columnId, title, description = '' } = action.payload
      if (!title || !title.trim()) return state
      const id = generateId()
      return {
        ...state,
        cards: { ...state.cards, [id]: { id, title: title.trim(), description } },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: [...state.columns[columnId].cardIds, id],
          },
        },
      }
    }

    case 'EDIT_CARD': {
      const { cardId, title, description } = action.payload
      if (!state.cards[cardId]) return state
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            ...(title !== undefined ? { title } : {}),
            ...(description !== undefined ? { description } : {}),
          },
        },
      }
    }

    case 'DELETE_CARD': {
      const { cardId } = action.payload
      if (!state.cards[cardId]) return state
      const newColumns = { ...state.columns }
      for (const col of Object.values(newColumns)) {
        if (col.cardIds.includes(cardId)) {
          col.cardIds = col.cardIds.filter((id) => id !== cardId)
        }
      }
      const newCards = { ...state.cards }
      delete newCards[cardId]
      return { ...state, columns: newColumns, cards: newCards }
    }

    case 'DELETE_COLUMN': {
      const { columnId } = action.payload
      if (!state.columns[columnId]) return state
      if (state.columns[columnId].cardIds.length > 0) return state
      const newColumns = { ...state.columns }
      delete newColumns[columnId]
      return {
        ...state,
        columns: newColumns,
        columnOrder: state.columnOrder.filter((id) => id !== columnId),
      }
    }

    case 'RENAME_COLUMN': {
      const { columnId, title } = action.payload
      if (!state.columns[columnId]) return state
      if (!title || !title.trim()) return state
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: { ...state.columns[columnId], title: title.trim() },
        },
      }
    }

    case 'ADD_COLUMN': {
      const { title } = action.payload
      if (!title || !title.trim()) return state
      const id = generateId()
      return {
        ...state,
        columns: { ...state.columns, [id]: { id, title: title.trim(), cardIds: [] } },
        columnOrder: [...state.columnOrder, id],
      }
    }

    case 'MOVE_CARD': {
      const { cardId, sourceColId, destColId, destIndex } = action.payload
      if (!state.cards[cardId]) return state
      const newColumns = { ...state.columns }

      const sourceCol = { ...newColumns[sourceColId] }
      sourceCol.cardIds = sourceCol.cardIds.filter((id) => id !== cardId)
      newColumns[sourceColId] = sourceCol

      if (sourceColId === destColId) {
        sourceCol.cardIds.splice(destIndex, 0, cardId)
      } else {
        const destCol = { ...newColumns[destColId] }
        destCol.cardIds = [...destCol.cardIds]
        destCol.cardIds.splice(destIndex, 0, cardId)
        newColumns[destColId] = destCol
      }

      return { ...state, columns: newColumns }
    }

    default:
      return state
  }
}

export function useBoardState(state, dispatch) {
  const addCard = useCallback((columnId, title, description) => {
    dispatch({ type: 'ADD_CARD', payload: { columnId, title, description } })
  }, [dispatch])

  const editCard = useCallback((cardId, updates) => {
    dispatch({ type: 'EDIT_CARD', payload: { cardId, ...updates } })
  }, [dispatch])

  const deleteCard = useCallback((cardId) => {
    dispatch({ type: 'DELETE_CARD', payload: { cardId } })
  }, [dispatch])

  const moveCard = useCallback((cardId, sourceColId, destColId, destIndex) => {
    dispatch({ type: 'MOVE_CARD', payload: { cardId, sourceColId, destColId, destIndex } })
  }, [dispatch])

  const addColumn = useCallback((title) => {
    dispatch({ type: 'ADD_COLUMN', payload: { title } })
  }, [dispatch])

  const renameColumn = useCallback((columnId, title) => {
    dispatch({ type: 'RENAME_COLUMN', payload: { columnId, title } })
  }, [dispatch])

  const deleteColumn = useCallback((columnId) => {
    dispatch({ type: 'DELETE_COLUMN', payload: { columnId } })
  }, [dispatch])

  return { addCard, editCard, deleteCard, moveCard, addColumn, renameColumn, deleteColumn }
}
