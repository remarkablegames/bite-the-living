import type { GameObj, OpacityComp } from 'kaplay'

import { Cursor, Sound, Sprite, Tag } from '../constants'
import { getRewards, playSound } from '../helpers'

const WIDTH = 300
const HEIGHT = 250
const MARGIN = 20
const PADDING = 10

export function addModal({ onClick = () => {} }) {
  const modal = add([
    rect(WIDTH, HEIGHT, { radius: 2 }),
    pos(center()),
    anchor('center'),
    color(5, 5, 5),
    outline(4, rgb(180, 30, 30)),
    fixed(),
  ])

  modal.add([
    sprite(Sprite.Win, { width: 175 }),
    pos(0, -MARGIN * 2.5),
    anchor('center'),
  ])

  getRewards().forEach(({ label, callback }, index) => {
    const reward = modal.add([
      text(`☐ ${label}`, { font: 'Monospace', size: 14 }),
      pos(0, MARGIN * index + PADDING),
      color(200, 200, 200),
      anchor('center'),
      area(),
      opacity(0.5),
      Tag.Reward,
      { callback },
    ])

    reward.onClick(() => {
      playSound(Sound.Score)
      modal.get(Tag.Reward).forEach((reward) => {
        reward.text = reward.text.replace('☑', '☐')
        reward.untag(Tag.Selected)
      })

      reward.text = reward.text.replace('☐', '☑')
      reward.tag(Tag.Selected)
    })
  })

  onHover(
    Tag.Reward,
    // @ts-expect-error Types of parameters are incompatible.
    (reward: GameObj<OpacityComp>) => {
      reward.opacity = 1
      setCursor(Cursor.Pointer)
    },
  )

  onHoverEnd(Tag.Reward, (reward) => {
    reward.opacity = 0.5
    setCursor(Cursor.Default)
  })

  const button = modal.add([
    sprite(Sprite.Continue, { width: 100 }),
    area(),
    scale(),
    pos(0, MARGIN * 3 + PADDING * 1.5),
    anchor('center'),
  ])

  button.onClick(() => {
    const reward = modal.get(Tag.Selected)[0]
    if (typeof reward?.callback === 'function') {
      reward.callback()
    }
    onClick()
  })

  button.onHover(() => {
    button.scaleTo(1.2)
    setCursor(Cursor.Pointer)
  })

  button.onHoverEnd(() => {
    button.scaleTo(1)
    setCursor(Cursor.Default)
  })

  return modal
}
