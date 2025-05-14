import { LocalStorage, Scene, Sprite, Tag, ZIndex } from '../constants'
import { addCursorKeys } from '../events'
import { addHealth } from '.'

export function addPlayer(x = center().x, y = center().y) {
  const player = add([
    sprite(Sprite.Zombie1),
    pos(x, y),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body(),
    z(ZIndex.Player),
    Tag.Player,
    Tag.Zombie,
  ])

  addHealth(player)
  addCursorKeys(player)

  player.onUpdate(() => {
    setCamPos(player.pos)

    if (!get(Tag.Human).length) {
      go(Scene.Game, getData<number>(LocalStorage.Level)! + 1)
    }
  })

  return player
}

export function getPlayer() {
  return get(Tag.Player)[0] as ReturnType<typeof addPlayer> | undefined
}
