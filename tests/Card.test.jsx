import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from '../src/components/Card'

const baseCard = { id: 'c1', title: 'Test Card', description: '' }

describe('Card', () => {
  it('renders card title', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('shows edit and delete buttons', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('enters edit mode when Edit is clicked', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByText('Edit'))
    expect(screen.getByDisplayValue('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('returns to view mode on Cancel', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('shows confirmation before delete', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Delete?')).toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('calls onDelete when confirmed', () => {
    const onDelete = vi.fn()
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={onDelete} />)
    fireEvent.click(screen.getByText('Delete'))
    fireEvent.click(screen.getByText('Yes'))
    expect(onDelete).toHaveBeenCalledWith('c1')
  })

  it('cancels delete when No is clicked', () => {
    render(<Card card={baseCard} onEdit={vi.fn()} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByText('Delete'))
    fireEvent.click(screen.getByText('No'))
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('renders card description when provided', () => {
    const cardWithDesc = { ...baseCard, description: 'Some details' }
    render(<Card card={cardWithDesc} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Some details')).toBeInTheDocument()
  })
})
