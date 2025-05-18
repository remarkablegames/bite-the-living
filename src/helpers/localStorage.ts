import { LocalStorage } from '../constants'

export function getLocalStorage(key: LocalStorage) {
  return JSON.parse(getData(key)!) || {}
}

export function setLocalStorage(key: LocalStorage, data: object) {
  setData(key, JSON.stringify(data))
}
