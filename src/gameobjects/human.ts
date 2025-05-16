import type { Vec2 } from 'kaplay'

import { Animation, Sprite, State, Tag } from '../constants'
import { getZombies, trueOrFalse } from '../helpers'
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

  function shouldMove(): boolean {
    const zombie = getZombies()[0]
    return Boolean(zombie && human.pos.dist(zombie.pos) < 100)
  }

  human.onStateEnter(State.Idle, () => {
    human.play(Animation.Idle, { loop: true })
  })

  human.onStateUpdate(State.Idle, () => {
    if (shouldMove()) {
      human.enterState(State.Move)
    }
  })

  human.onStateEnter(State.Move, () => {
    human.play(Animation.Run, { loop: true })
  })

  human.onStateUpdate(State.Move, () => {
    if (shouldMove()) {
      const zombie = getZombies()[0]
      const direction = zombie.pos.sub(human.pos).unit()
      human.flipX = direction.x < 0
      human.move(direction.scale(-speed))
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
    hitEvent.cancel()
    human.play(Animation.Death, {
      onEnd: () => {
        human.destroy()
        addZombie(human.pos)
      },
    })
  })

  return human
}
