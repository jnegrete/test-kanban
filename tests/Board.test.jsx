import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders cards in their column', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    expect(screen.getByText('Task 1')).toBeInTheDocument()
  })

  it('shows empty state for columns with no cards', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    const emptyMessages = screen.getAllByText('No cards')
    expect(emptyMessages).toHaveLength(2)
  })

  it('shows card count per column', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    const count = screen.getByText('1')
    expect(count).toBeInTheDocument()
  })

  it('renders Add Column button', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    expect(screen.getByText('Add Column')).toBeInTheDocument()
  })

  it('creates column on form submit', () => {
    const onAddColumn = vi.fn()
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={onAddColumn} onRenameColumn={noop} onDeleteColumn={noop} />)
    fireEvent.click(screen.getByText('Add Column'))
    const input = screen.getByPlaceholderText('Column title')
    fireEvent.change(input, { target: { value: 'New Col' } })
    fireEvent.click(screen.getByText('Add'))
    expect(onAddColumn).toHaveBeenCalledWith('New Col')
  })

  it('does not add column with empty title', () => {
    const onAddColumn = vi.fn()
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={onAddColumn} onRenameColumn={noop} onDeleteColumn={noop} />)
    fireEvent.click(screen.getByText('Add Column'))
    fireEvent.click(screen.getByText('Add'))
    expect(onAddColumn).not.toHaveBeenCalled()
  })

  it('cancels add-column form', () => {
    render(<Board state={defaultState} onAddCard={noop} onEditCard={noop} onDeleteCard={noop} onMoveCard={noop} onAddColumn={noop} onRenameColumn={noop} onDeleteColumn={noop} />)
    fireEvent.click(screen.getByText('Add Column'))
    expect(screen.getByPlaceholderText('Column title')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByPlaceholderText('Column title')).not.toBeInTheDocument()
  })
})
