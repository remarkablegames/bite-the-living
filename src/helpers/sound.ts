import type { AudioPlay } from 'kaplay'

import { Sound } from '../constants'

const sounds: Partial<Record<string, AudioPlay>> = {}

export function playSound(name: Sound, { volume = 1 } = {}) {
  let sound = sounds[name]
  if (!sound) {
    sound = play(name, { paused: true })
    sounds[name] = sound
  }

  sound.stop()
  sound.volume = volume
  sound.play()
}
