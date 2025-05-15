import type { Vec2 } from 'kaplay'

import { Animation, Sprite, Tag } from '../constants'
import { isAlive } from '../helpers'
import { zombieState } from '../states'
import { addHealth } from '.'

export function addZombie(position: Vec2) {
  const zombie = add([
    sprite(Sprite.Zombie2),
    pos(position),
    anchor('center'),
    health(zombieState.health, zombieState.maxHealth),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body({ mass: zombieState.mass }),
    Tag.Zombie,
  ])

  addHealth(zombie)
  zombie.play(Animation.Idle, { loop: true })

  const updateEvent = zombie.onUpdate(() => {
    if (!get(Tag.Human).length) {
      updateEvent.cancel()
      deathEvent.cancel()
    }

    if (isAlive(zombie)) {
      zombie.hurt(zombieState.selfDamage)
    }
  })

  const deathEvent = zombie.onDeath(() => {
    updateEvent.cancel()
    zombie.play(Animation.Death)

    wait(1, () => {
      zombie.destroy()
    })
  })

  return zombie
}
