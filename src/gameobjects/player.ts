import type { Vec2 } from 'kaplay'

import { Animation, Sprite, Tag, ZIndex } from '../constants'
import { addCursorKeys } from '../events'
import { getTilePos, isAlive } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { addHealth } from '.'

export function addPlayer(tilePos: Vec2) {
  const player = add([
    sprite(Sprite.Zombie1),
    getTilePos(tilePos),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body({ mass: 5 }),
    z(ZIndex.Player),
    Tag.Player,
    Tag.Zombie,
  ])

  addHealth(player)
  addCursorKeys(player)

  player.onUpdate(() => {
    setCamPos(player.pos)

    if (!get(Tag.Human).length) {
      nextLevel()
    }

    if (isAlive(player)) {
      player.hurt(0.01)
    }
  })

  player.onDeath(() => {
    player.play(Animation.Death)

    wait(1, () => {
      player.destroy()
      startLevel()
    })
  })

  return player
}

export function getPlayer() {
  return get(Tag.Player)[0] as ReturnType<typeof addPlayer> | undefined
}
