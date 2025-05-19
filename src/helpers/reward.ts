import { zombieState } from '../states'

const rewards = [
  {
    label: '+5% speed',
    callback() {
      zombieState.speed = Math.floor(zombieState.speed * 1.05)
    },
  },

  {
    label: '+10% health',
    callback() {
      zombieState.health = Math.floor(zombieState.health * 1.1)
      zombieState.maxHealth = Math.floor(zombieState.maxHealth * 1.1)
    },
  },

  {
    label: '+10% damage',
    callback() {
      zombieState.attackDamage = Number(
        (zombieState.attackDamage * 1.1).toFixed(1),
      )
    },
  },

  {
    label: '+10% heal',
    callback() {
      zombieState.heal = Number((zombieState.heal * 1.1).toFixed(1))
    },
  },
]

export function getRewards() {
  const result = []
  const copy = rewards.slice()

  for (let i = 0; i < 2; i++) {
    result.push(copy.splice(randi(copy.length), 1)[0])
  }

  return result
}
