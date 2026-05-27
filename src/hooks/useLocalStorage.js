import { useState, useCallback } from 'react'

const STORAGE_KEY = 'kanban-board'

export function useLocalStorage(defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY)
      if (!item) return defaultValue
      const parsed = JSON.parse(item)
      if (!parsed || typeof parsed !== 'object' || !parsed.columns || !parsed.cards) {
        return defaultValue
      }
      return parsed
    } catch {
      return defaultValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valueToStore))
    } catch (err) {
      console.error('Failed to save to localStorage:', err)
    }
  }, [storedValue])

  return [storedValue, setValue]
}
