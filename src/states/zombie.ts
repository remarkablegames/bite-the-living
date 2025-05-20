import { LocalStorage } from '../constants'
import { getLocalStorage, setLocalStorage } from '../helpers'

class ZombieState {
  attackDamage = 2
  heal = 2
  health = 10
  humanDistance = 50
  maxHealth = 10
  selfDamage = 1
  speed = 80
}

export let zombieState = new ZombieState()
Object.assign(zombieState, getLocalStorage(LocalStorage.Zombie))

export function saveZombieState() {
  setLocalStorage(LocalStorage.Zombie, zombieState)
}

export function resetZombieState() {
  zombieState = new ZombieState()
  saveZombieState()
}
