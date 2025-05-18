import { Animation, Sprite, Tag } from '../constants'
import { getClosestZombie } from '../helpers'
import type { Human } from '../types'

export function addGun(human: Human) {
  const gun = human.add([
    sprite(Sprite.Pistol),
    anchor('center'),
    rotate(),
    pos(5, 6),
    Tag.Gun,
  ])

  gun.play(Animation.Idle)

  gun.onUpdate(() => {
    const zombie = getClosestZombie(human)
    const direction = zombie.pos.sub(human.pos).unit()
    gun.angle = direction.angle()

    if (Math.abs(gun.angle) > 90) {
      gun.flipY = true
      gun.pos.x = -5
    } else {
      gun.flipY = false
      gun.pos.x = 5
    }
  })

  return gun
}
