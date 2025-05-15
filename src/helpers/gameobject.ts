import type { GameObj, HealthComp } from 'kaplay'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return gameObject.hp() > 0
}
