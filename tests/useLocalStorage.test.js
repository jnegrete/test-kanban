import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from '../src/hooks/useLocalStorage'

const STORAGE_KEY = 'kanban-board'

beforeEach(() => {
  localStorage.clear()
})

describe('useLocalStorage', () => {
  const defaultValue = { columns: {}, cards: {}, columnOrder: [] }

  it('returns default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(defaultValue))
    expect(result.current[0]).toEqual(defaultValue)
  })

  it('reads existing data from localStorage', () => {
    const data = { columns: { a: { id: 'a', title: 'Test', cardIds: [] } }, cards: {}, columnOrder: ['a'] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    const { result } = renderHook(() => useLocalStorage(defaultValue))
    expect(result.current[0]).toEqual(data)
  })

  it('writes data to localStorage on setValue', () => {
    const { result } = renderHook(() => useLocalStorage(defaultValue))
    const newData = { columns: {}, cards: { c1: { id: 'c1', title: 'Task', description: '' } }, columnOrder: [] }
    act(() => {
      result.current[1](newData)
    })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(newData)
  })

  it('returns default value for corrupted localStorage data', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json}')
    const { result } = renderHook(() => useLocalStorage(defaultValue))
    expect(result.current[0]).toEqual(defaultValue)
  })

  it('returns default value for malformed data structure', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ not: 'valid' }))
    const { result } = renderHook(() => useLocalStorage(defaultValue))
    expect(result.current[0]).toEqual(defaultValue)
  })
})
