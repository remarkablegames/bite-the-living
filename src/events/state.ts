import { Animation, Sound, State } from '../constants'
import { addZombie } from '../gameobjects'
import {
  disableCollision,
  getClosestZombie,
  playSound,
  shouldHumanMove,
} from '../helpers'
import type { Human } from '../types'

export function addHumanState(human: Human) {
  human.onStateEnter(State.Idle, () => {
    human.play(Animation.Idle)
  })

  const idleEvent = human.onStateUpdate(State.Idle, () => {
    if (shouldHumanMove(human)) {
      human.enterState(State.Move)
    }
  })

  human.onStateEnter(State.Move, () => {
    human.play(Animation.Run)
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
      human.move(lastZombie.direction.scale(-human.speed))
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
    disableCollision(human)
    playSound(Sound.Explode)

    human.play(Animation.Death, {
      onEnd: () => {
        addZombie(human.pos)
        playSound(Sound.Exhale, { volume: 0.7 })
        human.destroy()
      },
    })
  })
}

export function addGunmanState(human: Human) {
  human.onDeath(() => {
    disableCollision(human)
    playSound(Sound.Explode)

    const seconds = 1
    human.fadeOut(seconds)

    wait(seconds, () => {
      addZombie(human.pos)
      playSound(Sound.Exhale, { volume: 0.7 })
      human.destroy()
    })
  })
}
