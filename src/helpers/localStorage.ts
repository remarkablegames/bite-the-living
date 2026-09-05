import { LocalStorage } from '../constants'

export function getLocalStorage(key: LocalStorage): Record<string, unknown> {
  const data = getData(key)
  if (data == null) {
    return {}
  }

  return JSON.parse(data as string) as Record<string, unknown>
}

export function setLocalStorage(key: LocalStorage, data: object) {
  setData(key, JSON.stringify(data))
}
