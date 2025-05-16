import { State, Tag } from '../constants'
import { getSelected, hasSelected, isAlive } from '../helpers'
import { mouseState } from '../states'

const CAMERA_SCROLL = 1.5
const RATIO_LOW = 0.05
const RATIO_HIGH = 0.95

export function addMouse() {
  onUpdate(() => {
    const { x, y } = mousePos()
    const camPos = getCamPos()
    const xRatio = x / width()
    const yRatio = y / height()

    if (xRatio < RATIO_LOW) {
      setCamPos(camPos.x - CAMERA_SCROLL, camPos.y)
    }

    if (xRatio > RATIO_HIGH) {
      setCamPos(camPos.x + CAMERA_SCROLL, camPos.y)
    }

    if (yRatio < RATIO_LOW) {
      setCamPos(camPos.x, camPos.y - CAMERA_SCROLL)
    }

    if (yRatio > RATIO_HIGH) {
      setCamPos(camPos.x, camPos.y + CAMERA_SCROLL)
    }
  })

  onMousePress('left', () => {
    mouseState.pressStartPosition = toWorld(mousePos())

    if (!mouseState.isHoveringZombie) {
      getSelected().forEach((zombie) => zombie.untag(Tag.Selected))
    }
  })

  const selection = add([
    rect(0, 0),
    pos(),
    color(BLUE),
    outline(1, BLUE),
    opacity(0.2),
    area(),
  ])

  selection.hidden = true

  onMouseDown('left', () => {
    selection.hidden = false

    const {
      pressStartPosition: { x: startX, y: startY },
    } = mouseState
    const { x: mouseX, y: mouseY } = toWorld(mousePos())

    selection.pos.x = startX
    selection.pos.y = startY

    selection.width = mouseX - startX
    selection.height = mouseY - startY

    if (selection.width < 0) {
      selection.pos.x = mouseX
      selection.width = Math.abs(selection.width)
    }

    if (selection.height < 0) {
      selection.pos.y = mouseY
      selection.height = Math.abs(selection.height)
    }
  })

  onMouseRelease('left', () => {
    selection.hidden = true

    selection.getCollisions().forEach((collision) => {
      collision.target.tag(Tag.Selected)
    })
  })

  onMousePress('right', () => {
    if (!hasSelected()) {
      return
    }

    const { x, y } = toWorld(mousePos())

    getSelected().forEach((zombie) => {
      if (isAlive(zombie)) {
        zombie.moveToPosition = { x, y }
        zombie.enterState(State.Move)
      }
    })
  })
}
