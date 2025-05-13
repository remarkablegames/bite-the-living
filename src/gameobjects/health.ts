import type { GameObj, HealthComp, PosComp, SpriteComp } from 'kaplay'

const WIDTH = 19
const HEIGHT = 3

export function addHealth(
  gameObject: GameObj<HealthComp | PosComp | SpriteComp>,
) {
  const background = add([
    rect(WIDTH, HEIGHT),
    pos(gameObject.pos.x, gameObject.pos.y),
    color(0, 0, 0),
    follow(gameObject, vec2(-10, -14)),
  ])

  const health = background.add([
    rect(WIDTH, HEIGHT),
    pos(0, 0),
    color(255, 0, 0),
  ])

  function updateHealth() {
    health.width = (gameObject.hp() / gameObject.maxHP()!) * WIDTH
  }

  gameObject.onHurt(updateHealth)
  gameObject.onHeal(updateHealth)

  return health
}
