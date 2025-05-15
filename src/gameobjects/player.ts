import type { Vec2 } from 'kaplay'

import { Animation, Sprite, Tag, ZIndex } from '../constants'
import { addCursorKeys } from '../events'
import { getTilePos, hasHumans, isAlive } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { showModal } from '../modals'
import { playerState } from '../states'
import { addHealth } from '.'

export function addPlayer(tilePos: Vec2) {
  const player = add([
    sprite(Sprite.Zombie1),
    getTilePos(tilePos),
    anchor('center'),
    health(playerState.health, playerState.maxHealth),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body({ mass: playerState.mass }),
    z(ZIndex.Player),
    Tag.Player,
    Tag.Zombie,
    { hitDamage: playerState.hitDamage, areaDamage: playerState.areaDamage },
  ])

  addHealth(player)
  addCursorKeys(player)

  const updateEvent = player.onUpdate(() => {
    if (!hasHumans()) {
      updateEvent.cancel()
      deathEvent.cancel()

      showModal({
        message: 'Humans Defeated!',
        onContinue: nextLevel,
      })

      return
    }

    setCamPos(player.pos)

    if (isAlive(player)) {
      player.hurt(playerState.selfDamage)
    }
  })

  const deathEvent = player.onDeath(() => {
    updateEvent.cancel()
    player.play(Animation.Death2)

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
