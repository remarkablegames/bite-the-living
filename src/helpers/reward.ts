import { zombieState } from '../states'

const rewards = [
  { label: '+5 speed', callback: () => (zombieState.speed += 5) },

  {
    label: '+5 health',
    callback: () => {
      zombieState.health += 5
      zombieState.maxHealth += 5
    },
  },
]

export function getRewards() {
  return rewards
}
