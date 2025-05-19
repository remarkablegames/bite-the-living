import type { Vec2 } from 'kaplay'

import { Sprite, State, Tag } from '../constants'
import { addHumanState } from '../events'
import { trueOrFalse } from '../helpers'
import { addHealth } from '.'

const MASS = 5

export function addHuman(position: Vec2, { registerState = true } = {}) {
  const human = add([
    sprite(Sprite.Human1, { flipX: trueOrFalse() }),
    pos(position),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body({ mass: MASS }),
    opacity(), // used by Gunman
    state(State.Idle, Object.values(State)),
    Tag.Human,
    { speed: randi(20, 50) },
  ])

  addHealth(human)

  if (registerState) {
    addHumanState(human)
  }

  return human
}
