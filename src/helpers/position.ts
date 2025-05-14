import type { Vec2 } from 'kaplay'

import { Size } from '../constants'

export function getTilePos(tilePos: Vec2) {
  return pos(tilePos.x * Size.Tile, tilePos.y * Size.Tile)
}
