import { LocalStorage, Scene } from '../constants'

const levels = [
  // 0
  {
    title: {
      text: 'WASD or arrow keys to move',
      pos: pos(32, 8),
    },
    map: [
      '................',
      '.              .',
      '.              .',
      '.  P    H      .',
      '.              .',
      '................',
    ],
  },

  // 1
  {
    title: {
      text: 'Eat the humans',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '.          .',
      '.          .',
      '.     H    .',
      '.     P    .',
      '.     H    .',
      '.          .',
      '.          .',
      '............',
    ],
  },

  // 2
  {
    title: {
      text: 'Time is running out',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '. P     T  .',
      '.          .',
      '.........  .',
      '.          .',
      '.     H    .',
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
      text: 'You are being watched!',
      pos: pos(32, 8),
    },
    map: [
      '............',
      '.          .',
      '. H     T  .',
      '.          .',
      '.....  .....',
      '.          .',
      '.     P    .',
      '.          .',
      '.....  .....',
      '.          .',
      '.  W  H    .',
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
