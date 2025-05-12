import { Sprite, Tag } from '../constants'
import { addCursorKeys } from '../events'

export function addPlayer(x = center().x, y = center().y) {
  const player = add([
    sprite(Sprite.Zombie1),
    pos(x, y),
    anchor('center'),
    Tag.Player,
  ])

  addCursorKeys(player)

  return player
}
