import { Tag } from '../constants'

/*
-Revitalize (Player Health Boost) //ANCHOR
-Speedster (Player Speed Boost) //RANDOM
-Camoflauge (Player Proximity Decrease) //RANDOM
-Recovery (Max Health Increase) //RANDOM
-Hypnosis (humans are drawn to zombie) //RANDOM
-Reinforcements (add an NPC zombie spawn) //RANDOM
-Infection (dead humans spawn zombies and powerups apply to other zombies) //UNLOCK AFTER FIRST LEVEL
-Title should say "Choose your powerup"
*/

export interface ModalOptions {
  message: string
  buttonText?: string
  onContinue: () => void
  modalWidth?: number
  modalHeight?: number
}

export function showRewards({
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
    Tag.Modal,
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
    Tag.Modal,
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
    Tag.Modal,
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
    destroyAll(Tag.Modal)
    onContinue()
  })

  onKeyPress('space', () => {
    if (get(Tag.Modal).length > 0) {
      destroyAll(Tag.Modal)
      onContinue()
    }
  })
}
