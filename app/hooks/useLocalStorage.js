import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check for item in local storage with key
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
      return initialValue
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      console.log('Setting value:', valueToStore)
      if (JSON.stringify(valueToStore) !== JSON.stringify(storedValue)) {
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      }
    } catch (error) {
      console.error('Error setting value in localStorage:', error)
    }
  }

  const clearValue = () => {
    if (typeof window !== 'undefined') {
      if (key !== undefined && key !== 'all') {
        // key = key.toLowerCase()
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.clear()
      }
    }
    setStoredValue(initialValue)
  }

  return [storedValue, setValue, clearValue]
}

export default useLocalStorage
