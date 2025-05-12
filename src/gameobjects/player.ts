import { Sprite, Tag, ZIndex } from '../constants'
import { addCursorKeys } from '../events'

export function addPlayer(x = center().x, y = center().y) {
  const player = add([
    sprite(Sprite.Zombie1),
    pos(x, y),
    anchor('center'),
    health(10),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body(),
    z(ZIndex.Player),
    Tag.Player,
  ])

  addCursorKeys(player)

  return player
}

export function getPlayer() {
  return get(Tag.Player)[0] as ReturnType<typeof addPlayer>
}
