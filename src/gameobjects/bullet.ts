import { Sound, Tag } from '../constants'
import { getClosestZombie, isAlive, playSound } from '../helpers'
import type { Human } from '../types'
import { addSplash } from '.'

const DAMAGE = 2
const SPEED = 400

export function addBullet(human: Human) {
  const zombie = getClosestZombie(human)
  const direction = zombie.pos.sub(human.pos).unit()
  playSound(Sound.Gunshot)

  const bullet = add([
    pos(human.pos),
    move(direction, SPEED),
    circle(2),
    area(),
    offscreen({ destroy: true }),
    anchor('center'),
    color(BLACK),
    Tag.Bullet,
    {
      damage: DAMAGE,
      direction,
    },
  ])

  // allow friendly fire but wait so gunman does not take damage
  wait(0.01, () => {
    bullet.onCollide(
      Tag.Human,
      // @ts-expect-error Types of parameters are incompatible.
      (human: Human) => {
        if (isAlive(human)) {
          addSplash(bullet.pos, bullet.direction)
          bullet.destroy()
          human.hurt(bullet.damage)
          playSound(Sound.ShotBody)
        }
      },
    )
  })

  return bullet
}
