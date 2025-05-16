import type { GameObj, HealthComp } from 'kaplay'

import { Tag } from '../constants'
import type { Human, Zombie } from '../types'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return Boolean(gameObject?.hp() > 0)
}

export function getHumans() {
  return get(Tag.Human) as Human[]
}

export function getSelected() {
  return get(Tag.Selected) as Zombie[]
}

export function getZombies() {
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

export function getClosestZombie(human: Human): Zombie {
  const zombies = getZombies()
  const distances = zombies.reduce((dist: number[], zombie) => {
    dist.push(human.pos.dist(zombie.pos))
    return dist
  }, [])
  return zombies[distances.indexOf(Math.min(...distances))]
}

export function shouldHumanMove(human: Human): boolean {
  const zombie = getClosestZombie(human)
  return Boolean(zombie && human.pos.dist(zombie.pos) < 100)
}
