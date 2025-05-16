import { State, Tag } from '../constants'
import { getSelected, hasSelected, isAlive } from '../helpers'
import { mouseState } from '../states'

export function addMouse() {
  onMousePress('left', () => {
    mouseState.pressStartPosition = mousePos()

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
    const { x: mouseX, y: mouseY } = mousePos()

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

    const { x, y } = mousePos()

    getSelected().forEach((zombie) => {
      zombie.moveToPosition = { x, y }

      if (isAlive(zombie)) {
        zombie.enterState(State.Move)
      }
    })
  })
}
