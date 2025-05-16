import { GameObj } from 'kaplay'

export interface ModalOptions {
  message?: string
  image?: string
  buttonText?: string
  buttonSprite?: string
  onContinue: () => void
  modalWidth?: number
  modalHeight?: number
}

export function showModal({
  message,
  image,
  buttonText = 'Continue',
  buttonSprite,
  onContinue,
  modalWidth = 300,
  modalHeight = 160,
}: ModalOptions) {
  const centerX = width() / 2
  const centerY = height() / 2

  add([
    rect(modalWidth, modalHeight, { radius: 2 }),
    pos(centerX, centerY),
    anchor('center'),
    fixed(),
    color(5, 5, 5),
    outline(4, rgb(180, 30, 30)),
    opacity(0.95),
    z(100),
    'modal',
  ])

  if (image) {
    add([
      sprite(image),
      scale(0.2),
      pos(centerX, centerY - 30),
      anchor('center'),
      fixed(),
      z(101),
      'modal',
    ])
  } else if (message) {
    add([
      text(message, {
        size: 22,
        // @ts-expect-error: outline is runtime-supported
        outline: { color: rgb(80, 0, 0), width: 2 },
      }),
      pos(centerX, centerY - 40),
      anchor('center'),
      fixed(),
      color(230, 230, 230),
      z(101),
      'modal',
    ])
  }

  let button: GameObj

  if (buttonSprite) {
    button = add([
      sprite(buttonSprite),
      area(),
      scale(0.07),
      pos(centerX, centerY + 40),
      anchor('center'),
      fixed(),
      z(101),
      'modal',
    ])
  } else {
    button = add([
      text(`[ ${buttonText} ]`, {
        size: 20,
        // @ts-expect-error: outline is runtime-supported
        outline: { color: rgb(60, 0, 0), width: 2 },
      }),
      area({ scale: vec2(1.3) }),
      pos(centerX, centerY + 40),
      anchor('center'),
      fixed(),
      color(200, 0, 0),
      scale(1),
      z(101),
      outline(2, rgb(255, 60, 60)),
      'modal',
    ])
  }

  button.onClick(() => {
    destroyAll('modal')
    onContinue()
  })

  onKeyPress('space', () => {
    if (get('modal').length > 0) {
      destroyAll('modal')
      onContinue()
    }
  })
}
