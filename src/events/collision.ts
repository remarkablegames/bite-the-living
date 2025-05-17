import { Sound, State, Tag } from '../constants'
import { isAlive } from '../helpers'
import type { Human, Zombie } from '../types'

export function addCollision() {
  onCollide(
    Tag.Human,
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (human: Human, zombie: Zombie) => {
      if (isAlive(human) && isAlive(zombie)) {
        play(Sound.Hit)
        human.enterState(State.Hit)
      }
    },
  )

  onCollideUpdate(
    Tag.Human,
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (human: Human, zombie: Zombie) => {
      if (isAlive(human) && isAlive(zombie)) {
        human.hurt(zombie.damage)
      }
    },
  )
}
