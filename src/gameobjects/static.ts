import type { Shape, Vec2 } from 'kaplay'

import { Sprite } from '../constants'
import { getTilePos } from '../helpers'

export function addStatic(name: Sprite, tilePos: Vec2, shape?: Shape) {
  add([
    sprite(name),
    getTilePos(tilePos),
    area({ shape }),
    body({ isStatic: true }),
  ])
}
