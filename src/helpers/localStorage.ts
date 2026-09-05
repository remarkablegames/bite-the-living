import { LocalStorageKey } from '../constants'

export type LocalStorageNamespace = 'game' | 'zombie'

export function getLocalStorage(
  namespace: LocalStorageNamespace,
): Record<string, unknown> {
  const data = getData()
  if (data?.[namespace] == null) {
    return {}
  }

  return data[namespace] as Record<string, unknown>
}

export function setLocalStorage(
  namespace: LocalStorageNamespace,
  data: object,
) {
  const store = getData() ?? {}
  store[namespace] = data
  setData(store)
}

function getData(): Record<string, unknown> | null {
  const raw = localStorage.getItem(LocalStorageKey)
  if (raw == null) {
    return null
  }

  return JSON.parse(raw) as Record<string, unknown>
}

function setData(data: object) {
  localStorage.setItem(LocalStorageKey, JSON.stringify(data))
}
