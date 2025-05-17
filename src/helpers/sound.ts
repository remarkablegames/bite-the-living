import { Sound } from '../constants'

const sounds = {}

export function playSound(name: Sound) {
  // @ts-expect-error Property does not exist on type
  const sound = sounds[name] || (sounds[name] = play(name, { paused: true }))
  sound.stop()
  sound.play()
}
