import type { Shape, Vec2 } from 'kaplay'

import { Sprite, Tag } from '../constants'
import { getTileVec2 } from '../helpers'
import { addFloor } from '.'

export function addStatic(options: {
  sprite: Sprite
  pos: Vec2
  shape?: Shape
}) {
  add([
    sprite(options.sprite),
    pos(getTileVec2(options.pos)),
    area({ shape: options.shape }),
    body({ isStatic: true }),
    Tag.Static,
  ])

  return addFloor()
}
