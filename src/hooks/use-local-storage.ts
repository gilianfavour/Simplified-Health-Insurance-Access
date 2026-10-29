'use client'

import { useState, useEffect } from 'react'

/**
 * Persist state to localStorage, synced across tabs.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T)
        } catch {
          // ignore malformed values
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key])

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const next = value instanceof Function ? value(storedValue) : value
      setStoredValue(next)
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // ignore write errors (private browsing, quota exceeded)
    }
  }

  return [storedValue, setValue]
}
