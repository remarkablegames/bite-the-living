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
      '.      .',
      '.    H .',
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
      text: 'Dodge this',
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
      text: 'Shoot out',
      pos: pos(32, 8),
    },
    map: [
      '..................',
      '.                .',
      '.  Z     W    G  .',
      '.                .',
      '.     H     H    .',
      '.                .',
      '.     C          .',
      '.                .',
      '.     H     H    .',
      '.                .',
      '.  Z     W    G  .',
      '.                .',
      '..................',
    ],
  },

  // 7
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
      '.  H  H  H .',
      '.......    .',
      '.          .',
      '.          .',
      '.          .',
      '.          .',
      '. G  G  G  .',
      '............',
    ],
  },

  // 8
  {
    title: {
      text: 'What army?',
      pos: pos(32, 8),
    },
    map: [
      '.....................',
      '.    CZ            G.',
      '.............   .....',
      '.                   .',
      '. Z  Z  Z  Z  Z  Z  .',
      '.                   .',
      '. Z  Z  Z  Z  Z  Z  .',
      '.                   .',
      '.                   .',
      '. G   G   G   G   G .',
      '.....    ......   ...',
      '.                   .',
      '.  H  H  H  H  H  H .',
      '.                   .',
      '.  H  H  H  H  H  H .',
      '.                   .',
      '.....................',
    ],
  },

  // 9
  {
    title: {
      text: 'They love doughnuts',
      pos: pos(32, 8),
    },
    map: [
      '...............................',
      '.  G           Z         G    .',
      '.              C              .',
      '.  T        Z  G  Z      T    .',
      '.         ...........         .',
      '.         .         .         .',
      '.  H  H   . G     Z .  H  H   .',
      '.         .    H    .         .',
      '.         ...........         .',
      '. G  G  G              G  G  G.',
      '.              W              .',
      '.    H  H  H        H  H  H   .',
      '.              T              .',
      '.                             .',
      '...............................',
    ],
  },
]

export function getLastLevelNumber(): number {
  return levels.length
}

export function getLevel() {
  return levels[gameState.level]
}

export function startLevel() {
  go(Scene.Game)
}

export function nextLevel() {
  gameState.level++

  if (gameState.level < 0 || gameState.level >= getLastLevelNumber()) {
    resetGameState()
    resetZombieState()
  } else {
    saveGameState()
    saveZombieState()
  }

  startLevel()
}
