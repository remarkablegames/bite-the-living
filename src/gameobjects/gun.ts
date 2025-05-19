import { Animation, Sprite, Tag } from '../constants'
import { getClosestZombie } from '../helpers'
import type { Human, Zombie } from '../types'

export function addGun(human: Human) {
  const gun = human.add([
    sprite(Sprite.Pistol),
    anchor('center'),
    rotate(),
    pos(5, 6),
    timer(),
    Tag.Gun,
  ])

  gun.play(Animation.Idle)

  gun.onUpdate(() => {
    const zombie = getClosestZombie(human)
    const direction = zombie.pos.sub(human.pos).unit()
    gun.angle = direction.angle()

    if (Math.abs(gun.angle) > 90) {
      gun.flipY = true
      gun.pos.x = -5
    } else {
      gun.flipY = false
      gun.pos.x = 5
    }
  })

  gun.loop(
    3,
    () => {
      const zombie = getClosestZombie(human)
      const direction = zombie.pos.sub(human.pos).unit()

      gun.play(Animation.Shoot)

      const bullet = add([
        pos(human.pos),
        move(direction, 400),
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
                texture: getSprite(Sprite.Particle)!.data!.tex,
                quads: [getSprite(Sprite.Particle)!.data!.frames[0]],
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
    },
    undefined,
    true,
  )

  return gun
}
