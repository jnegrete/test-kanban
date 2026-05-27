import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ColumnHeader from '../src/components/ColumnHeader'

const emptyColumn = { id: 'col1', title: 'To Do', cardIds: [] }
const fullColumn = { id: 'col2', title: 'In Progress', cardIds: ['c1', 'c2'] }

describe('ColumnHeader', () => {
  it('renders column title and card count', () => {
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={0} />
    )
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('enters rename mode when title is clicked', () => {
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={0} />
    )
    fireEvent.click(screen.getByText('To Do'))
    expect(screen.getByDisplayValue('To Do')).toBeInTheDocument()
  })

  it('calls onRename and returns to view on submit', () => {
    const onRename = vi.fn()
    render(
      <ColumnHeader column={emptyColumn} onRename={onRename} onDelete={vi.fn()} cardCount={0} />
    )
    fireEvent.click(screen.getByText('To Do'))
    const input = screen.getByDisplayValue('To Do')
    fireEvent.change(input, { target: { value: 'Updated' } })
    fireEvent.click(screen.getByText('Save'))
    expect(onRename).toHaveBeenCalledWith('col1', 'Updated')
  })

  it('cancels rename and returns to view', () => {
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={0} />
    )
    fireEvent.click(screen.getByText('To Do'))
    expect(screen.getByDisplayValue('To Do')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('To Do')).not.toBeInTheDocument()
  })

  it('shows delete confirmation on delete click when column is empty', () => {
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={0} />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Delete?')).toBeInTheDocument()
  })

  it('calls onDelete when delete is confirmed', () => {
    const onDelete = vi.fn()
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={onDelete} cardCount={0} />
    )
    fireEvent.click(screen.getByText('Delete'))
    fireEvent.click(screen.getByText('Yes'))
    expect(onDelete).toHaveBeenCalledWith('col1')
  })

  it('hides delete confirmation on cancel', () => {
    render(
      <ColumnHeader column={emptyColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={0} />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Delete?')).toBeInTheDocument()
    fireEvent.click(screen.getByText('No'))
    expect(screen.queryByText('Delete?')).not.toBeInTheDocument()
  })

  it('shows "Move cards first" when deleting non-empty column', () => {
    render(
      <ColumnHeader column={fullColumn} onRename={vi.fn()} onDelete={vi.fn()} cardCount={2} />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Move cards first')).toBeInTheDocument()
  })
})
