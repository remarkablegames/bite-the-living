import type { Vec2 } from 'kaplay'

const COLOR = new Color(175, 225, 175) // Celadon

export function addTarget(position: Vec2) {
  const target = add([
    pos(position),
    anchor('center'),
    circle(16, { fill: false }),
    outline(2.5, COLOR),
    scale(1),
    lifespan(1, { fade: 0.5 }),
    opacity(),
  ])

  target.onUpdate(() => {
    target.scaleBy(0.9)
  })

  return target
}
