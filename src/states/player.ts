class Player {
  health = 10
  maxHealth = 10
  mass = 5
  speed = 100
  selfDamage = 0.01
  hitDamage = 1
  areaDamage = 0.01
  heal = 2
}

export let playerState = new Player()

export function resetPlayerState() {
  playerState = new Player()
}
