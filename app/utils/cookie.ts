import Cookies from 'js-cookie'

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const setCookie = (name: string, value: string, options: any) => {
  Cookies.set(name, value, options)
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const removeCookie = (name: string) => {
  Cookies.remove(name)
}
