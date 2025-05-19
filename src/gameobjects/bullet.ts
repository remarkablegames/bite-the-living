import { Sprite, Tag } from '../constants'
import { getClosestZombie, isAlive } from '../helpers'
import type { Human, Zombie } from '../types'

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

  const particleData = getSprite(Sprite.Particle)!.data!

  bullet.onCollide(
    Tag.Zombie,
    // @ts-expect-error Types of parameters are incompatible.
    (zombie: Zombie) => {
      if (!isAlive(zombie)) {
        return
      }

      zombie.hurt(2)

      const splatter = add([
        pos(bullet.pos),
        particles(
          {
            max: 20,
            speed: [200, 250],
            lifeTime: [0.2, 0.75],
            colors: [WHITE],
            opacities: [1.0, 0.0],
            angle: [0, 360],
            texture: particleData.tex,
            quads: [particleData.frames[0]],
          },
          {
            lifetime: 0.75,
            rate: 0,
            direction: direction.scale(-1).angle(),
            spread: 45,
          },
        ),
      ])

      splatter.emit(10)
      splatter.onEnd(() => {
        destroy(splatter)
      })
    },
  )

  return bullet
}
