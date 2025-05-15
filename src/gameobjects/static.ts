import type { Shape, Vec2 } from 'kaplay'

import { Sprite } from '../constants'
import { getTilePos } from '../helpers'

export function addStatic(options: {
  sprite: Sprite
  pos: Vec2
  shape?: Shape
}) {
  add([
    sprite(options.sprite),
    getTilePos(options.pos),
    area({ shape: options.shape }),
    body({ isStatic: true }),
  ])
}
