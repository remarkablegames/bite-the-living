import type { Vec2 } from 'kaplay'

import { Sprite } from '../constants'
import { getTilePos } from '../helpers'

export function addTable(tilePos: Vec2) {
  add([
    sprite(Sprite.Table),
    getTilePos(tilePos),
    area(),
    body({ isStatic: true }),
  ])
}
