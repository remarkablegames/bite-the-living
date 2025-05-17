import { LocalStorage, Scene } from '../constants'

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
]

function getLevelNumber(): number {
  return getData(LocalStorage.Level, 0) || 0
}

export function getLevel() {
  return levels[getLevelNumber()]
}

export function startLevel() {
  go(Scene.Game)
}

export function nextLevel() {
  let level = getLevelNumber() + 1

  if (level < 0 || level >= levels.length) {
    level = 0
  }

  setData(LocalStorage.Level, level)
  startLevel()
}
