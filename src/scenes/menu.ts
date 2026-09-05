import { Cursor, Scene, Sound, Sprite } from '../constants'
import { playSound } from '../helpers'
import { startLevel } from '../levels'
import { gameState } from '../states'

const START_MARGIN_Y = 80
const TITLE_MARGIN_Y = 30

scene(Scene.Menu, () => {
  const { x, y } = center()

  if (import.meta.env.DEV) {
    const level = new URLSearchParams(location.search).get('level')
    if (level) {
      gameState.level = parseInt(level)
    }
  }

  add([rect(300, 300), pos(center()), anchor('center'), color(BLACK), fixed()])

  add([
    sprite(Sprite.Frame),
    pos(center()),
    anchor('center'),
    scale(0.33),
    fixed(),
  ])

  const title = add([
    sprite(Sprite.Title),
    pos(x, y - TITLE_MARGIN_Y),
    anchor('center'),
    scale(0.2),
    fixed(),
  ])

  const startButton = add([
    sprite(Sprite.Start),
    pos(x, y + START_MARGIN_Y),
    anchor('center'),
    area(),
    scale(0.1),
    fixed(),
  ])

  startButton.onHover(() => {
    startButton.scale = vec2(0.12)
    setCursor(Cursor.Pointer)
  })

  startButton.onHoverEnd(() => {
    startButton.scale = vec2(0.1)
    setCursor(Cursor.Default)
  })

  startButton.onClick(() => {
    playSound(Sound.Score)
    startLevel()
  })

  title.onUpdate(() => {
    const pulse = Math.sin(time() * 4) * 0.005
    title.scale = vec2(0.2 + pulse)
  })
})
