import { Cursor } from '../constants'

export function addButton(
  buttonText: string,
  {
    height = 0,
    onClick = () => {},
    position = center(),
    size = 14,
    textColor = BLACK,
    width = 0,
  } = {},
) {
  const button = add([
    rect(width, height),
    pos(position),
    anchor('center'),
    area({ cursor: Cursor.Pointer }),
    scale(),
  ])

  button.add([
    text(buttonText, { size, font: 'Monospace' }),
    anchor('center'),
    color(textColor),
  ])

  button.onClick(onClick)

  button.onHover(() => {
    button.scaleTo(1.2)
  })

  button.onHoverEnd(() => {
    button.scaleTo(1)
    setCursor(Cursor.Default)
  })

  return button
}
