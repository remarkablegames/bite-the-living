import { Sound } from '../constants'

loadMusic(Sound.Music, 'music/psycho_stance.ogg')

export const music = play(Sound.Music, {
  loop: true,
  paused: true,
})
