import { Sound, State, Tag } from '../constants'
import { addSplash } from '../gameobjects'
import { isAlive, playSound } from '../helpers'
import type { Bullet, Human, Zombie } from '../types'

export function addCollision() {
  onCollide(
    Tag.Human,
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (human: Human, zombie: Zombie) => {
      if (isAlive(human) && isAlive(zombie)) {
        playSound(Sound.Hit)
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
        human.hurt(zombie.damage / 100)
      }
    },
  )

  onCollide(
    Tag.Bullet,
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (bullet: Bullet, zombie: Zombie) => {
      if (isAlive(zombie)) {
        addSplash(bullet.pos, bullet.direction)
        bullet.destroy()
        zombie.hurt(bullet.damage)
      }
    },
  )

  onCollide(
    Tag.Bullet,
    Tag.Static,
    // @ts-expect-error Types of parameters are incompatible.
    (bullet: Bullet) => {
      addSplash(bullet.pos, bullet.direction)
      bullet.destroy()
    },
  )
}
