import { zombieState } from '../states'

const rewards = [
  {
    label: '+10% speed',
    callback() {
      zombieState.speed = Math.ceil(zombieState.speed * 1.1)
    },
  },

  {
    label: '+10% health',
    callback() {
      zombieState.health = Math.ceil(zombieState.health * 1.1)
      zombieState.maxHealth = Math.ceil(zombieState.maxHealth * 1.1)
    },
  },

  {
    label: '+10% damage',
    callback() {
      zombieState.attackDamage = Math.ceil(zombieState.attackDamage * 1.1)
    },
  },

  {
    label: '+10% heal',
    callback() {
      zombieState.heal = Math.ceil(zombieState.heal * 1.1)
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
