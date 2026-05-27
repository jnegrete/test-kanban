import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Board from '../src/components/Board'

const defaultState = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', cardIds: ['c1'] },
    'in-progress': { id: 'in-progress', title: 'In Progress', cardIds: [] },
    'done': { id: 'done', title: 'Done', cardIds: [] },
  },
  cards: {
    c1: { id: 'c1', title: 'Task 1', description: '' },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
}

const noop = () => {}

describe('Board', () => {
  it('renders all 3 columns', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders cards in their column', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} />)
    expect(screen.getByText('Task 1')).toBeInTheDocument()
  })

  it('shows empty state for columns with no cards', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} />)
    const emptyMessages = screen.getAllByText('No cards')
    expect(emptyMessages).toHaveLength(2)
  })

  it('shows card count per column', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} />)
    const count = screen.getByText('1')
    expect(count).toBeInTheDocument()
  })
})
