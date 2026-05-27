import { describe, it, expect } from 'vitest'
import { boardReducer } from '../src/hooks/useBoardState'

const defaultBoard = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', cardIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', cardIds: [] },
    'done': { id: 'done', title: 'Done', cardIds: [] },
  },
  cards: {},
  columnOrder: ['todo', 'in-progress', 'done'],
}

describe('boardReducer', () => {
  describe('ADD_CARD', () => {
    it('adds a card to the specified column', () => {
      const state = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'Task 1' },
      })
      const cardIds = Object.keys(state.cards)
      expect(cardIds).toHaveLength(1)
      expect(state.cards[cardIds[0]].title).toBe('Task 1')
      expect(state.columns.todo.cardIds).toContain(cardIds[0])
    })

    it('rejects empty title', () => {
      const state = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: '' },
      })
      expect(Object.keys(state.cards)).toHaveLength(0)
    })

    it('rejects whitespace-only title', () => {
      const state = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: '   ' },
      })
      expect(Object.keys(state.cards)).toHaveLength(0)
    })

    it('adds card with description', () => {
      const state = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'Task', description: 'Details' },
      })
      const cardId = Object.keys(state.cards)[0]
      expect(state.cards[cardId].description).toBe('Details')
    })
  })

  describe('EDIT_CARD', () => {
    let stateWithCard
    beforeEach(() => {
      stateWithCard = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'Task 1' },
      })
    })

    it('updates card title', () => {
      const cardId = Object.keys(stateWithCard.cards)[0]
      const state = boardReducer(stateWithCard, {
        type: 'EDIT_CARD',
        payload: { cardId, title: 'Updated Task' },
      })
      expect(state.cards[cardId].title).toBe('Updated Task')
    })

    it('updates card description', () => {
      const cardId = Object.keys(stateWithCard.cards)[0]
      const state = boardReducer(stateWithCard, {
        type: 'EDIT_CARD',
        payload: { cardId, description: 'New details' },
      })
      expect(state.cards[cardId].description).toBe('New details')
    })

    it('does nothing for non-existent card', () => {
      const state = boardReducer(stateWithCard, {
        type: 'EDIT_CARD',
        payload: { cardId: 'nonexistent', title: 'Nope' },
      })
      expect(state).toEqual(stateWithCard)
    })
  })

  describe('DELETE_CARD', () => {
    it('removes card from state and column', () => {
      const withCard = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'Task' },
      })
      const cardId = Object.keys(withCard.cards)[0]
      const state = boardReducer(withCard, {
        type: 'DELETE_CARD',
        payload: { cardId },
      })
      expect(state.cards[cardId]).toBeUndefined()
      expect(state.columns.todo.cardIds).not.toContain(cardId)
    })

    it('does nothing for non-existent card', () => {
      const state = boardReducer(defaultBoard, {
        type: 'DELETE_CARD',
        payload: { cardId: 'nonexistent' },
      })
      expect(state).toEqual(defaultBoard)
    })
  })

  describe('MOVE_CARD', () => {
    it('moves card between columns', () => {
      const withCard = boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'Task' },
      })
      const cardId = Object.keys(withCard.cards)[0]
      const state = boardReducer(withCard, {
        type: 'MOVE_CARD',
        payload: { cardId, sourceColId: 'todo', destColId: 'in-progress', destIndex: 0 },
      })
      expect(state.columns.todo.cardIds).not.toContain(cardId)
      expect(state.columns['in-progress'].cardIds).toContain(cardId)
    })

    it('reorders card within same column', () => {
      const withCards = boardReducer(boardReducer(defaultBoard, {
        type: 'ADD_CARD',
        payload: { columnId: 'todo', title: 'A' },
      }), { type: 'ADD_CARD', payload: { columnId: 'todo', title: 'B' } })
      const cardIds = Object.keys(withCards.cards)
      const state = boardReducer(withCards, {
        type: 'MOVE_CARD',
        payload: { cardId: cardIds[0], sourceColId: 'todo', destColId: 'todo', destIndex: 1 },
      })
      expect(state.columns.todo.cardIds).toEqual([cardIds[1], cardIds[0]])
    })

    it('does nothing for non-existent card', () => {
      const state = boardReducer(defaultBoard, {
        type: 'MOVE_CARD',
        payload: { cardId: 'nonexistent', sourceColId: 'todo', destColId: 'done', destIndex: 0 },
      })
      expect(state).toEqual(defaultBoard)
    })
  })
})
