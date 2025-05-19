import { Tag } from '../constants'
import { getClosestZombie, isAlive } from '../helpers'
import type { Human, Zombie } from '../types'
import { addSplash } from '.'

const SPEED = 400

export function addBullet(human: Human) {
  const zombie = getClosestZombie(human)
  const direction = zombie.pos.sub(human.pos).unit()

  const bullet = add([
    pos(human.pos),
    move(direction, SPEED),
    circle(2),
    area(),
    offscreen({ destroy: true }),
    anchor('center'),
    color(BLACK),
    Tag.Bullet,
  ])

  bullet.onCollide(
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (zombie: Zombie) => {
      if (isAlive(zombie)) {
        zombie.hurt(2)
        addSplash(bullet.pos, direction)
      }
    },
  )

  return bullet
}
