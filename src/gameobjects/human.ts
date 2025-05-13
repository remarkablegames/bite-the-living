import { Animation, Sprite, State, Tag } from '../constants'
import { addHealth, getPlayer } from '.'

export function addHuman(x: number, y: number) {
  const player = getPlayer()
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

  function shouldMove() {
    return human.pos.dist(player.pos) < 100
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
    if (!shouldMove()) {
      human.enterState(State.Idle)
    }
    const direction = player.pos.sub(human.pos).unit()
    human.move(direction.scale(-speed))
  })

  human.onCollide(Tag.Zombie, () => {
    human.hurt(1)
  })

  // @ts-expect-error This expression is not callable. Type 'Collision' has no call signatures.
  human.onCollideUpdate(Tag.Zombie, () => {
    human.hurt(0.1)
  })

  return human
}
