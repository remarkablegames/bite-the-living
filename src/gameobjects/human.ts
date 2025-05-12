import { Animation, Sprite, Tag } from '../constants'

export function addHuman(x: number, y: number) {
  const human = add([
    sprite(Sprite.Human1),
    pos(x, y),
    anchor('center'),
    health(10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body(),
    Tag.Human,
  ])

  human.play(Animation.Idle, { loop: true })

  return human
}
