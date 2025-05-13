import type { GameObj, HealthComp, PosComp } from 'kaplay'

const WIDTH = 20
const HEIGHT = 3

export function addHealth(gameObject: GameObj<PosComp | HealthComp>) {
  const background = add([
    rect(WIDTH, HEIGHT),
    pos(gameObject.pos.x, gameObject.pos.y),
    anchor('center'),
    color(0, 0, 0),
    follow(gameObject, vec2(0, -14)),
  ])

  const health = background.add([
    rect(WIDTH, HEIGHT),
    pos(0, 0),
    anchor('center'),
    color(255, 0, 0),
  ])

  function updateHealth() {
    health.width = (gameObject.hp() / gameObject.maxHP()!) * WIDTH
  }

  gameObject.onHurt(updateHealth)
  gameObject.onHeal(updateHealth)

  return health
}
