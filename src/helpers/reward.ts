import { getLastLevelNumber } from '../levels'
import { gameState, zombieState } from '../states'

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
    label: '+20% heal',
    callback() {
      zombieState.heal = Number((zombieState.heal * 1.2).toFixed(1))
    },
  },

  {
    label: '+30% line of sight',
    callback() {
      zombieState.humanDistance = Math.floor(zombieState.humanDistance * 1.3)
    },
  },
]

export function getRewards() {
  if (!gameState.level) {
    return [
      {
        label: 'Spawn from the dead',
        callback() {},
      },
    ]
  }

  if (gameState.level === getLastLevelNumber() - 1) {
    return [
      {
        label: 'Restart from the dead',
        callback() {},
      },
    ]
  }

  const result = []
  const copy = rewards.slice()

  for (let i = 0; i < 2; i++) {
    result.push(copy.splice(randi(copy.length), 1)[0])
  }

  return result
}
