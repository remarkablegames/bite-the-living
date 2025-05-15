import type { Vec2 } from 'kaplay'

import { Animation, Sprite, State, Tag } from '../constants'
import { getTilePos, isAlive } from '../helpers'
import { playerState } from '../states'
import { addHealth, getPlayer } from '.'

export function addHuman(tilePos: Vec2) {
  const speed = randi(20, 50)

  const human = add([
    sprite(Sprite.Human1),
    getTilePos(tilePos),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body({ mass: 5 }),
    state(State.Idle, Object.values(State)),
    Tag.Human,
  ])

  addHealth(human)

  function shouldMove(): boolean {
    const player = getPlayer()
    return Boolean(player && human.pos.dist(player.pos) < 100)
  }

  human.onStateEnter(State.Idle, () => {
    human.play(Animation.Idle, { loop: true })
  })

  human.onStateUpdate(State.Idle, () => {
    if (shouldMove()) {
      human.enterState(State.Move)
    }
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
      const direction = getPlayer()!.pos.sub(human.pos).unit()
      human.flipX = direction.x < 0
      human.move(direction.scale(-speed))
    } else {
      human.enterState(State.Idle)
    }
  })

  human.onStateEnter(State.Hit, () => {
    if (!isAlive(human)) {
      return
    }
    human.play(Animation.Hit, {
      onEnd: () => human.enterState(State.Idle),
    })
  })

  human.onStateEnter(State.Death, () => {
    human.play(Animation.Death, {
      onEnd: () => human.destroy(),
    })
  })

  human.onCollide(Tag.Player, () => {
    if (!isAlive(human)) {
      return
    }
    human.enterState(State.Hit)
    human.hurt(playerState.hitDamage)
  })

  // @ts-expect-error This expression is not callable. Type 'Collision' has no call signatures.
  human.onCollideUpdate(Tag.Player, () => {
    if (!isAlive(human)) {
      return
    }
    human.hurt(playerState.areaDamage)
  })

  human.onDeath(() => {
    getPlayer()?.heal(playerState.heal)
    human.enterState(State.Death)
  })

  return human
}
