import { LocalStorage, Scene } from '../constants'

export const levels = [
  // 0
  {
    instructions: 'WASD or arrow keys to move',
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
    instructions: 'Eat the humans',
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
    instructions: 'Time is running out',
    map: [
      '............',
      '.          .',
      '. P        .',
      '.          .',
      '.........  .',
      '.          .',
      '.     H    .',
      '.          .',
      '.  .........',
      '.          .',
      '.     H    .',
      '.          .',
      '............',
    ],
  },
]

export function startLevel() {
  go(Scene.Game, getData(LocalStorage.Level) || 0)
}

export function nextLevel() {
  let level = getData(LocalStorage.Level, 0)! + 1

  if (level < 0 || level >= levels.length) {
    level = 0
  }

  setData(LocalStorage.Level, level)
  go(Scene.Game, level)
}
