import { Scene } from '../constants'
import {
  gameState,
  resetGameState,
  resetZombieState,
  saveGameState,
  saveZombieState,
} from '../states'

const levels = [
  // 0
  {
    title: {
      text: 'Left-click zombie, right-click human',
      pos: pos(32, 8),
    },
    map: [
      '................',
      '.              .',
      '.              .',
      '. CZ    H      .',
      '.              .',
      '................',
    ],
  },

  // 1
  {
    title: {
      text: 'Move up',
      pos: pos(32, 392),
    },
    map: [
      '........',
      '.  H   .',
      '.      .',
      '.      .',
      '.      .',
      '.      .',
      '.      .',
      '.      .',
      '.      .',
      '.      .',
      '.  C   .',
      '.  Z   .',
      '........',
    ],
  },

  // 2
  {
    title: {
      text: 'Avoid the obstacles',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '. Z     T  .',
      '.          .',
      '.........  .',
      '.          .',
      '.  C  H    .',
      '.          .',
      '.  .........',
      '.          .',
      '.  W  H    .',
      '.          .',
      '............',
    ],
  },

  // 3
  {
    title: {
      text: 'Click and drag to select zombies',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '.          .',
      '.     H    .',
      '.          .',
      '.    ZCZ   .',
      '.          .',
      '.     H    .',
      '.          .',
      '............',
    ],
  },

  // 4
  {
    title: {
      text: 'Multitask',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '. H     W  .',
      '.          .',
      '.          .',
      '.....  .....',
      '.          .',
      '.     C    .',
      '.  Z     Z .',
      '.          .',
      '.          .',
      '.....  .....',
      '.          .',
      '.          .',
      '. W      H .',
      '.          .',
      '............',
    ],
  },

  // 5
  {
    title: {
      text: "Don't get shot",
      pos: pos(32, 8),
    },
    map: [
      '..................',
      '.                .',
      '.                .',
      '.                .',
      '.                .',
      '.                .',
      '.  ZC      G     .',
      '.                .',
      '.                .',
      '.                .',
      '.                .',
      '..................',
    ],
  },

  // 6
  {
    title: {
      text: 'A-maze yourself!',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '. CZ       .',
      '.          .',
      '.......    .',
      '.  H       .',
      '.          .',
      '.  .........',
      '.       H  .',
      '.          .',
      '.  Z  .    .',
      '.......    .',
      '.  H  .    .',
      '.          .',
      '.          .',
      '.......    .',
      '.          .',
      '. H  H  H  .',
      '.          .',
      '. W  H   H .',
      '. H  H   H .',
      '............',
    ],
  },

  // 7
  {
    title: {
      text: 'What army?',
      pos: pos(32, 8),
    },
    map: [
      '.................................',
      '.                               .',
      '.      CZ                       .',
      '..............       .......    .',
      '.                               .',
      '.   Z  Z  Z  Z  Z  Z  Z  Z      .',
      '.                               .',
      '.   Z  Z  Z  Z  Z  Z  Z  Z      .',
      '.                               .',
      '.   Z  Z  Z  Z  Z  Z  Z  Z      .',
      '.......    ......      ....     .',
      '.                               .',
      '.                               .',
      '.                               .',
      '.......    .....    .....       .',
      '.                               .',
      '.    H  H  H  H  H  H  H  H     .',
      '.                               .',
      '.    H  H  H  H  H  H  H  H     .',
      '.                               .',
      '.    H  H  H  H  H  H  H  H     .',
      '.................................',
    ],
  },

  // 8
  {
    title: {
      text: 'They love doughnuts',
      pos: pos(32, 8),
    },
    map: [
      '.................................',
      '.                               .',
      '.              CZ               .',
      '.                               .',
      '.                               .',
      '.         .............         .',
      '.         .           .         .',
      '.         .           .         .',
      '.  Z  Z   .           .  Z  Z   .',
      '.         .           .         .',
      '.         .............         .',
      '.                               .',
      '.    H  H  H  H  H  H  H  H     .',
      '.              W                .',
      '.    H  H  H  H  H  H  H  H     .',
      '.................................',
    ],
  },
]

function getLevelNumber(): number {
  return gameState.level
}

export function getLevel() {
  return levels[getLevelNumber()]
}

export function startLevel() {
  go(Scene.Game)
}

export function nextLevel() {
  gameState.level++

  if (gameState.level < 0 || gameState.level >= levels.length) {
    resetGameState()
    resetZombieState()
  } else {
    saveGameState()
    saveZombieState()
  }

  startLevel()
}
