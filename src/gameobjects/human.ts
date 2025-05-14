import { Animation, Sprite, State, Tag } from '../constants'
import { addHealth, getPlayer } from '.'

export function addHuman(x: number, y: number) {
  const speed = randi(20, 50)

  const human = add([
    sprite(Sprite.Human1),
    pos(x, y),
    anchor('center'),
    health(10, 10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body(),
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
    human.play(Animation.Hit, {
      onEnd: () => human.enterState(State.Idle),
    })
  })

  human.onStateEnter(State.Death, () => {
    human.play(Animation.Death, {
      onEnd: () => human.destroy(),
    })
  })

  human.onCollide(Tag.Zombie, () => {
    if (human.hp()) {
      human.enterState(State.Hit)
      human.hurt(1)
    }
  })

  // @ts-expect-error This expression is not callable. Type 'Collision' has no call signatures.
  human.onCollideUpdate(Tag.Zombie, () => {
    if (human.hp()) {
      human.hurt(0.01)
    }
  })

  human.onDeath(() => {
    human.enterState(State.Death)
  })

  return human
}
