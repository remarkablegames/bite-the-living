import type { GameObj, HealthComp } from 'kaplay'

import { Tag } from '../constants'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return gameObject.hp() > 0
}

export function hasHumans(): boolean {
  return get(Tag.Human).length > 0
}
