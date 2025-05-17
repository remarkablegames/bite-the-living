import type { AreaComp, GameObj, ScaleComp } from 'kaplay'

import { Cursor } from '../constants'

export function addModal({
  buttonSprite = '',
  buttonText = 'Continue',
  imageSprite = '',
  message = '',
  modalHeight = 160,
  modalWidth = 300,
  onClick = () => {},
}) {
  const { x, y } = center()
  const margin = 40

  const modal = add([
    rect(modalWidth, modalHeight, { radius: 2 }),
    pos(x, y),
    anchor('center'),
    fixed(),
    color(5, 5, 5),
    outline(4, rgb(180, 30, 30)),
    opacity(0.95),
  ])

  if (imageSprite) {
    add([
      sprite(imageSprite),
      scale(0.2),
      pos(x, y - 30),
      anchor('center'),
      fixed(),
    ])
  } else if (message) {
    add([
      text(message, {
        size: 22,
        // @ts-expect-error: outline is runtime-supported
        outline: { color: rgb(80, 0, 0), width: 2 },
      }),
      pos(x, y - margin),
      anchor('center'),
      fixed(),
      color(230, 230, 230),
    ])
  }

  let button: GameObj<AreaComp | ScaleComp>

  if (buttonSprite) {
    button = add([
      sprite(buttonSprite),
      area({ cursor: Cursor.Pointer }),
      scale(0.07),
      pos(x, y + margin),
      anchor('center'),
      fixed(),
    ])
  } else {
    button = add([
      text(`[ ${buttonText} ]`, {
        size: 20,
        // @ts-expect-error: outline is runtime-supported
        outline: { color: rgb(60, 0, 0), width: 2 },
      }),
      area({ scale: vec2(1.3), cursor: Cursor.Pointer }),
      pos(x, y + margin),
      anchor('center'),
      fixed(),
      color(200, 0, 0),
      scale(1),
      outline(2, rgb(255, 60, 60)),
    ])
  }

  button.onClick(() => {
    modal.destroy()
    onClick()
  })

  const buttonScale = button.scale

  button.onHover(() => {
    button.scaleBy(1.2)
  })

  button.onHoverEnd(() => {
    button.scaleTo(buttonScale)
    setCursor(Cursor.Default)
  })

  return modal
}
