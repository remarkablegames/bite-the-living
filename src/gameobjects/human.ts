import type { Vec2 } from 'kaplay'

import { Animation, Sound, Sprite, State, Tag } from '../constants'
import {
  getClosestZombie,
  playSound,
  shouldHumanMove,
  trueOrFalse,
} from '../helpers'
import { addHealth, addZombie } from '.'

export function addHuman(position: Vec2) {
  const speed = randi(20, 50)

  const human = add([
    sprite(Sprite.Human1),
    pos(position),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body({ mass: 5 }),
    state(State.Idle, Object.values(State)),
    Tag.Human,
  ])

  addHealth(human)
  human.flipX = trueOrFalse()

  human.onStateEnter(State.Idle, () => {
    human.play(Animation.Idle, { loop: true })
  })

  const idleEvent = human.onStateUpdate(State.Idle, () => {
    if (shouldHumanMove(human)) {
      human.enterState(State.Move)
    }
  })

  human.onStateEnter(State.Move, () => {
    human.play(Animation.Run, { loop: true })
  })

  const lastZombie = {
    direction: vec2(),
    time: 0,
  }

  const moveEvent = human.onStateUpdate(State.Move, () => {
    if (shouldHumanMove(human)) {
      // prevent human left/right glitch
      if (time() - lastZombie.time > 1) {
        const zombie = getClosestZombie(human)
        const direction = zombie.pos.sub(human.pos).unit()
        human.flipX = direction.x < 0
        lastZombie.direction = direction
        lastZombie.time = time()
      }
      human.move(lastZombie.direction.scale(-speed))
    } else {
      human.enterState(State.Idle)
    }
  })

  const hitEvent = human.onStateEnter(State.Hit, () => {
    human.play(Animation.Hit, {
      onEnd: () => human.enterState(State.Idle),
    })
  })

  human.onDeath(() => {
    ;[idleEvent, moveEvent, hitEvent].forEach((event) => event.cancel())
    playSound(Sound.Explode)

    human.play(Animation.Death, {
      onEnd: () => {
        human.destroy()
        play(Sound.Exhale, { volume: 0.7 })
        addZombie(human.pos)
      },
    })
  })

  return human
}
