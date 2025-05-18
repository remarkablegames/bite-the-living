import { LocalStorage } from '../constants'
import { getLocalStorage, setLocalStorage } from '../helpers'

class ZombieState {
  health = 10
  maxHealth = 10
  mass = 5
  speed = 100
  selfDamage = 0.01
  attackDamage = 0.03
  heal = 2
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
