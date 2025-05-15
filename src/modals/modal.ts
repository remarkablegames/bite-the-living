export interface ModalOptions {
  message: string
  buttonText?: string
  onContinue: () => void
  modalWidth?: number
  modalHeight?: number
}

export function showModal({
  message,
  buttonText = 'Continue',
  onContinue,
  modalWidth = 300,
  modalHeight = 160,
}: ModalOptions) {
  const centerX = width() / 2
  const centerY = height() / 2

  add([
    rect(modalWidth, modalHeight, { radius: 16 }),
    pos(centerX, centerY),
    anchor('center'),
    fixed(),
    color(10, 10, 20),
    outline(5, rgb(0, 255, 180)),
    opacity(0.95),
    z(100),
    'modal',
  ])

  add([
    text(message, {
      size: 22,
      // @ts-expect-error: outline is supported at runtime but not typed
      outline: { color: rgb(0, 255, 255), width: 2 },
    }),
    pos(centerX, centerY - 40),
    anchor('center'),
    fixed(),
    color(200, 255, 255),
    z(101),
    'modal',
  ])

  const button = add([
    text(`[ ${buttonText} ]`, {
      size: 20,
      // @ts-expect-error: outline is supported at runtime but not typed
      outline: { color: rgb(255, 0, 255), width: 2 },
    }),
    area({ scale: vec2(1.3) }),
    pos(centerX, centerY + 40),
    anchor('center'),
    fixed(),
    color(255, 0, 255),
    scale(1),
    z(101),
    'modal',
  ])

  button.onHover(() => {
    button.scale = vec2(1.1)
    button.color = rgb(0, 255, 180)
  })

  button.onHoverEnd(() => {
    button.scale = vec2(1)
    button.color = rgb(255, 0, 255)
  })

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
