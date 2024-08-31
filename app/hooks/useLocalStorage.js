import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storeNewValue, setStoreNewValue] = useState()
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check for item in local storage with key
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      console.log(':  const[storedValue,setStoredValue]=useState  error', error)
      return initialValue
    }
  })

  useEffect(() => {
    if (storeNewValue) {
      try {
        if (typeof window !== 'undefined') {
          const valueToStore =
            storeNewValue instanceof Function ? storeNewValue(storedValue) : storeNewValue
          setStoreNewValue(null)
          setStoredValue(valueToStore)
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.log(':  useEffect  error', error)
      }
    }
  }, [storeNewValue, key, storedValue])

  const clearValue = () => {
    if (typeof window !== 'undefined') {
      if (key !== undefined && key !== 'all') {
        // key = key.toLowerCase()
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.clear()
      }
    }
  }

  return [storedValue, setStoreNewValue, clearValue]
}

export default useLocalStorage
