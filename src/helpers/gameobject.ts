import type { AreaComp, GameObj, HealthComp } from 'kaplay'

import { Sound, Sprite, Tag } from '../constants'
import { addZombie } from '../gameobjects'
import { getNearbyEntities, playSound } from '../helpers'
import { gameState } from '../states'
import type { Human, Zombie } from '../types'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return typeof gameObject.hp === 'function' && gameObject.hp() > 0
}

export function disableCollision(gameObject: GameObj<AreaComp>) {
  gameObject.area.scale = vec2(0)
}

function getHumans() {
  return get(Tag.Human) as Human[]
}

export function getSelected() {
  return get(Tag.Selected) as Zombie[]
}

function getZombies() {
  return get(Tag.Zombie) as Zombie[]
}

export function hasHumans(): boolean {
  return getHumans().length > 0
}

export function hasSelected(): boolean {
  return getSelected().length > 0
}

export function hasZombies(): boolean {
  return getZombies().length > 0
}

export function getClosestHuman(zombie: Zombie): Human | undefined {
  const nearby = getNearbyEntities(zombie.pos.x, zombie.pos.y, 2)
  const humans = nearby.filter((entity: GameObj) =>
    entity.is(Tag.Human),
  ) as Human[]

  if (!humans.length) {
    return
  }

  let closest: Human | undefined
  let minDistance = Infinity

  for (const human of humans) {
    const distance = zombie.pos.dist(human.pos)
    if (distance < minDistance) {
      minDistance = distance
      closest = human
    }
  }

  return closest
}

export function getClosestZombie(human: Human): Zombie | undefined {
  const nearby = getNearbyEntities(human.pos.x, human.pos.y, 2)
  const zombies = nearby.filter((entity: GameObj) =>
    entity.is(Tag.Zombie),
  ) as Zombie[]

  if (!zombies.length) {
    return
  }

  let closest: Zombie | undefined
  let minDistance = Infinity

  for (const zombie of zombies) {
    const distance = human.pos.dist(zombie.pos)
    if (distance < minDistance) {
      minDistance = distance
      closest = zombie
    }
  }

  return closest
}

export function shouldHumanAct(human: Human): boolean {
  const zombie = getClosestZombie(human)
  return Boolean(zombie && human.pos.dist(zombie.pos) < human.zombieDistance)
}

export function spawnZombie(human: Human) {
  if (gameState.level) {
    playSound(Sound.Exhale, { volume: 0.7 })
    const zombie = addZombie(human.pos, { fadeIn: 0.5 })
    zombie.tag(Tag.Selected)

    if (human.is(Tag.Gunman)) {
      zombie.use(sprite(Sprite.Zombie4))
      zombie.speed *= 1.5
    }
  }
}
