import type { AudioPlay } from 'kaplay'

import { Sound } from '../constants'

const sounds: Record<string, AudioPlay> = {}

export function playSound(name: Sound, { volume = 1 } = {}) {
  const sound = sounds[name] || (sounds[name] = play(name, { paused: true }))
  sound.stop()
  sound.volume = volume
  sound.play()
}
