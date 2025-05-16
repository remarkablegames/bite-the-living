import { hasHumans, hasZombies } from '.'

export function isWin(): boolean {
  return !hasHumans()
}

export function isLose(): boolean {
  return !hasZombies()
}
