import type { Vec2 } from 'kaplay'

import { Animation, Sprite } from '../constants'
import { addGunmanState } from '../events'
import { getClosestZombie } from '../helpers'
import { addHuman } from '.'

export function addGunman(position: Vec2) {
  const human = addHuman(position, { registerState: false })
  human.use(sprite(Sprite.Human2))
  human.play(Animation.Idle)
  addGunmanState(human)

  const pistol = human.add([
    sprite(Sprite.Pistol),
    anchor('center'),
    rotate(),
    pos(5, 6),
  ])

  pistol.play(Animation.Idle)

  pistol.onUpdate(() => {
    const zombie = getClosestZombie(human)
    const direction = zombie.pos.sub(human.pos).unit()
    pistol.angle = direction.angle()

    if (Math.abs(pistol.angle) > 90) {
      pistol.flipY = true
      pistol.pos.x = -5
    } else {
      pistol.flipY = false
      pistol.pos.x = 5
    }
  })

  return human
}
