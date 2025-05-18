import { Scene, Sound } from '../constants'
import { addButton } from '../gameobjects'
import { playSound } from '../helpers'
import { startLevel } from '../levels'
import { gameState } from '../states'

scene(Scene.Menu, () => {
  const { x, y } = center()
  const margin = 20

  if (import.meta.env.DEV) {
    gameState.level = Number(new URLSearchParams(location.search).get('level'))
  }

  add([
    text('Bite the Living', { size: 20, font: 'Monospace' }),
    pos(x, y - margin),
    anchor('center'),
  ])

  addButton('Start', {
    onClick: () => {
      playSound(Sound.Score)
      startLevel()
    },
    position: vec2(x, y + margin),
    width: 80,
    height: 20,
  })
})
