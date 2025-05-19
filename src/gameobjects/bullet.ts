import { Tag } from '../constants'
import { getClosestZombie } from '../helpers'
import type { Human } from '../types'

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
    { direction },
  ])

  return bullet
}
