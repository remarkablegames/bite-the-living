import { Animation, Sprite, State, Tag } from '../constants'
import { getPlayer } from './player'

export function addHuman(x: number, y: number) {
  const player = getPlayer()
  const speed = randi(20, 60)

  const human = add([
    sprite(Sprite.Human1),
    pos(x, y),
    anchor('center'),
    health(10),
    area({ shape: new Rect(vec2(0, 3), 13, 24) }),
    body(),
    state(State.Idle, Object.values(State)),
    Tag.Human,
  ])

  human.onStateEnter(State.Attack, () => {
    human.play(Animation.Hit, {
      onEnd: () => human.enterState(State.Idle, rand(1, 3)),
    })
  })

  human.onStateEnter(State.Idle, (time) => {
    human.play(Animation.Idle, { loop: true })
    const seconds = time || rand(2, 5)
    wait(seconds, () => {
      human.enterState(State.Move)
      human.play(Animation.Run, { loop: true })
    })
  })

  human.onStateUpdate(State.Move, () => {
    const direction = player.pos.sub(human.pos).unit()
    human.move(direction.scale(-speed))

    if (human.pos.dist(player.pos) < 16) {
      human.enterState(State.Idle, rand(1, 3))
    }
  })

  return human
}
