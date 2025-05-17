import type { Vec2 } from 'kaplay'

import { Animation, Sound, Sprite, State, Tag } from '../constants'
import { isAlive, isWin, playSound, trueOrFalse } from '../helpers'
import { mouseState, zombieState } from '../states'
import { addHealth } from '.'

const OUT_OF_BOUNDS = -999999999

export function addZombie(position: Vec2) {
  const zombie = add([
    sprite(Sprite.Zombie2),
    pos(position),
    anchor('center'),
    health(zombieState.health, zombieState.maxHealth),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body({ mass: zombieState.mass }),
    opacity(1),
    state(State.Idle, Object.values(State)),
    Tag.Zombie,
    {
      damage: zombieState.attackDamage,
      moveToPosition: {
        x: OUT_OF_BOUNDS,
        y: OUT_OF_BOUNDS,
      },
    },
  ])

  addHealth(zombie)

  zombie.fadeIn(0.2)
  zombie.flipX = trueOrFalse()
  zombie.play(Animation.Idle, { loop: true })

  const hoverEvent = zombie.onHoverUpdate(() => {
    mouseState.isHoveringZombie = true
    setCursor('pointer')
  })

  zombie.onHoverEnd(() => {
    mouseState.isHoveringZombie = false
    setCursor('default')
  })

  const updateEvent = zombie.onUpdate(() => {
    if (isWin() || !isAlive(zombie)) {
      return updateEvent.cancel()
    }
    zombie.opacity = zombie.is(Tag.Selected) ? 0.5 : 1
    zombie.hurt(zombieState.selfDamage)
  })

  zombie.onDeath(() => {
    ;[hoverEvent, updateEvent, moveEvent].forEach((event) => event.cancel())
    playSound(Sound.Explode)

    zombie.play(Animation.Death, {
      onEnd: () => {
        zombie.destroy()
      },
    })
  })

  zombie.onStateEnter(State.Idle, () => {
    zombie.play(Animation.Idle, { loop: true })
  })

  zombie.onStateEnter(State.Move, () => {
    zombie.play(Animation.Run, { loop: true })
  })

  const moveEvent = zombie.onStateUpdate(State.Move, () => {
    if (Object.values(zombie.moveToPosition).includes(OUT_OF_BOUNDS)) {
      return
    }

    if (
      zombie.moveToPosition.x === zombie.pos.x &&
      zombie.moveToPosition.y === zombie.pos.y
    ) {
      zombie.moveToPosition = {
        x: OUT_OF_BOUNDS,
        y: OUT_OF_BOUNDS,
      }
      return zombie.enterState(State.Idle)
    }

    const direction = zombie.pos
      .sub(zombie.moveToPosition.x, zombie.moveToPosition.y)
      .unit()

    zombie.flipX = direction.x < 0

    zombie.moveTo(
      zombie.moveToPosition.x,
      zombie.moveToPosition.y,
      zombieState.speed,
    )
  })

  return zombie
}
