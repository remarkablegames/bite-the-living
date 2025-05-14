import { LocalStorage, Scene } from '../constants'

export const levels = [
  {
    map: [
      '................',
      '.              .',
      '.              .',
      '.  P    H      .',
      '.              .',
      '................',
    ],
  },

  {
    map: [
      '............',
      '.          .',
      '.          .',
      '.          .',
      '.          .',
      '.          .',
      '.     H    .',
      '.          .',
      '.     P    .',
      '.          .',
      '.     H    .',
      '.          .',
      '.          .',
      '.          .',
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
