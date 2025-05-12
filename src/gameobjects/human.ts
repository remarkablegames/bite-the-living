import { Sprite, Tag } from '../constants'

export function addHuman(x: number, y: number) {
  return add([
    sprite(Sprite.Human1),
    pos(x, y),
    anchor('center'),
    health(10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body(),
    Tag.Human,
  ])
}
