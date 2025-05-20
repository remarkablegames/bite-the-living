import type { Vec2 } from 'kaplay'

import {
  Animation,
  Cursor,
  Position,
  Sound,
  Sprite,
  State,
  Tag,
} from '../constants'
import {
  disableCollision,
  isAlive,
  isWin,
  playSound,
  trueOrFalse,
} from '../helpers'
import { mouseState, zombieState } from '../states'
import { addHealth } from '.'

const SELECTED_COLOR = rgb(248, 131, 121) // Coral Pink
const MASS = 5

export function addZombie(position: Vec2, { fadeIn = 0.2 } = {}) {
  const zombie = add([
    sprite(Sprite.Zombie2, { flipX: trueOrFalse() }),
    pos(position),
    anchor('center'),
    health(zombieState.health, zombieState.maxHealth),
    area({ shape: new Rect(vec2(0, 4), 13, 25) }),
    body({ mass: MASS }),
    opacity(1),
    state(State.Idle, Object.values(State)),
    Tag.Zombie,
    {
      damage: zombieState.attackDamage,
      moveToPosition: {
        x: Position.OutOfBounds,
        y: Position.OutOfBounds,
      },
    },
  ])

  addHealth(zombie)

  zombie.fadeIn(fadeIn)
  zombie.play(Animation.Idle)

  const hoverEvent = zombie.onHoverUpdate(() => {
    mouseState.isHoveringZombie = true
    setCursor(Cursor.Pointer)
  })

  zombie.onHoverEnd(() => {
    mouseState.isHoveringZombie = false
    setCursor(Cursor.Default)
  })

  const updateEvent = zombie.onUpdate(() => {
    if (isWin() || !isAlive(zombie)) {
      return updateEvent.cancel()
    }

    if (zombie.is(Tag.Selected)) {
      zombie.use(color(SELECTED_COLOR))
    } else {
      zombie.unuse('color')
    }

    zombie.hurt(zombieState.selfDamage / 100)
  })

  zombie.onDeath(() => {
    ;[hoverEvent, updateEvent, moveEvent].forEach((event) => event.cancel())
    disableCollision(zombie)
    playSound(Sound.Explode)

    zombie.play(Animation.Death, {
      onEnd: () => {
        zombie.destroy()
      },
    })
  })

  zombie.onStateEnter(State.Idle, () => {
    zombie.play(Animation.Idle)
  })

  zombie.onStateEnter(State.Move, () => {
    zombie.play(Animation.Run)
  })

  const moveEvent = zombie.onStateUpdate(State.Move, () => {
    if (Object.values(zombie.moveToPosition).includes(Position.OutOfBounds)) {
      return
    }

    if (
      zombie.moveToPosition.x === zombie.pos.x &&
      zombie.moveToPosition.y === zombie.pos.y
    ) {
      zombie.moveToPosition = {
        x: Position.OutOfBounds,
        y: Position.OutOfBounds,
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
