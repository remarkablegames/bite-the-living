import { Animation, Sprite, Tag } from '../constants'
import { getClosestZombie, shouldFireGun } from '../helpers'
import type { Human } from '../types'
import { addBullet } from '.'

const X_OFFSET = 5
const Y_OFFSET = 6
const LOOP_SECONDS = 3

export function addGun(human: Human) {
  const gun = human.add([
    sprite(Sprite.Pistol),
    anchor('center'),
    rotate(),
    pos(X_OFFSET, Y_OFFSET),
    timer(),
    Tag.Gun,
  ])

  gun.play(Animation.Idle)

  gun.onUpdate(() => {
    if (!shouldFireGun(human)) {
      return
    }

    const zombie = getClosestZombie(human)
    const direction = zombie.pos.sub(human.pos).unit()
    gun.angle = direction.angle()

    if (Math.abs(gun.angle) > 90) {
      gun.flipY = true
      gun.pos.x = -X_OFFSET
    } else {
      gun.flipY = false
      gun.pos.x = X_OFFSET
    }
  })

  gun.loop(LOOP_SECONDS, () => addBullet(human), undefined, true)

  return gun
}
