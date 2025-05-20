import type { AreaComp, GameObj, HealthComp } from 'kaplay'

import { Sound, Sprite, Tag } from '../constants'
import { addZombie } from '../gameobjects'
import { playSound } from '../helpers'
import { gameState } from '../states'
import type { Human, Zombie } from '../types'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return Boolean(typeof gameObject?.hp === 'function' && gameObject.hp() > 0)
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

export function getClosestHuman(zombie: Zombie): Human {
  const humans = getHumans()
  const distances = humans.reduce((dist: number[], human) => {
    dist.push(zombie.pos.dist(human.pos))
    return dist
  }, [])
  return humans[distances.indexOf(Math.min(...distances))]
}

export function getClosestZombie(human: Human): Zombie {
  const zombies = getZombies()
  const distances = zombies.reduce((dist: number[], zombie) => {
    dist.push(human.pos.dist(zombie.pos))
    return dist
  }, [])
  return zombies[distances.indexOf(Math.min(...distances))]
}

export function shouldHumanAct(human: Human): boolean {
  const zombie = getClosestZombie(human)
  if (zombie && human) {
    return Boolean(zombie && human.pos.dist(zombie.pos) < human.zombieDistance)
  }
  return false
}

export function spawnZombie(human: Human) {
  if (gameState.level) {
    playSound(Sound.Exhale, { volume: 0.7 })
    const zombie = addZombie(human.pos, { fadeIn: 0.5 })

    if (human.is(Tag.Gunman)) {
      zombie.use(sprite(Sprite.Zombie4))
      zombie.speed *= 1.5
    }
  }
}
