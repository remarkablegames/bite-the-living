import type { Vec2 } from 'kaplay'

import { Animation, Sprite } from '../constants'
import { addGunmanState } from '../events'
import { addGun, addHuman } from '.'

export function addGunman(position: Vec2) {
  const human = addHuman(position, {
    registerState: false,
  })

  human.use(sprite(Sprite.Human2))
  human.play(Animation.Idle)

  addGunmanState(human)
  addGun(human)

  return human
}
