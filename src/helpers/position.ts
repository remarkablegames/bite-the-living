import { Vec2 } from 'kaplay'

import { Size } from '../constants'

export function getTileVec2({ x, y }: Vec2) {
  return vec2(x * Size.Tile, y * Size.Tile)
}
