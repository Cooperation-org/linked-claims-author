import { useEffect } from 'react'

const useLocalStorage = (key, value, watch) => {
  useEffect(() => {
    if (watch) {
      const subscription = watch(value => {
        localStorage.setItem(key, JSON.stringify(value))
      })
      return () => subscription.unsubscribe()
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value, watch])

  const removeItem = () => {
    setTimeout(() => {
      localStorage.removeItem(key)
      console.log('Removed formData from localStorage')
    }, 2000)
  }

  return { removeItem }
}

export default useLocalStorage
