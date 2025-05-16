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

export function resetZombieState() {
  zombieState = new ZombieState()
}
