import { Scene, Sound, Sprite } from '../constants'
import { playSound } from '../helpers'
import { startLevel } from '../levels'
import { gameState } from '../states'

scene(Scene.Menu, () => {
  const { x, y } = center()
  const startMargin = 80
  const titleMargin = 30

  if (import.meta.env.DEV) {
    gameState.level = Number(new URLSearchParams(location.search).get('level'))
  }

  add([
    rect(400, 300, { radius: 8 }),
    pos(center()),
    anchor('center'),
    color(10, 10, 10),
    outline(4, rgb(180, 30, 30)),
    z(-1),
    fixed(),
  ])

  const title = add([
    sprite(Sprite.Title),
    pos(x, y - titleMargin),
    anchor('center'),
    scale(0.2),
    fixed(),
  ])

  const startButton = add([
    sprite(Sprite.Start),
    pos(x, y + startMargin),
    anchor('center'),
    area(),
    scale(0.1),
    fixed(),
  ])

  startButton.onHover(() => {
    startButton.scale = vec2(0.12)
  })

  startButton.onHoverEnd(() => {
    startButton.scale = vec2(0.1)
  })

  startButton.onClick(() => {
    playSound(Sound.Score)
    startLevel()
  })

  onUpdate(() => {
    const pulse = Math.sin(time() * 4) * 0.005
    title.scale = vec2(0.2 + pulse)
  })
})
