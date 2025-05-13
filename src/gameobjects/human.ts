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

  human.onStateEnter(State.Attack, () => {
    human.play(Animation.Hit, {
      onEnd: () => human.enterState(State.Idle),
    })
  })

  human.onStateEnter(State.Idle, () => {
    human.play(Animation.Idle, { loop: true })
    const seconds = rand(0, 2)

    wait(seconds, () => {
      human.enterState(State.Move)
      human.play(Animation.Run, { loop: true })
    })
  })

  human.onStateUpdate(State.Move, () => {
    if (human.pos.dist(player.pos) > 100) {
      human.enterState(State.Idle)
    } else {
      const direction = player.pos.sub(human.pos).unit()
      human.move(direction.scale(-speed))
    }
  })

  return human
}
