import { Position, Sound, State, Tag } from '../constants'
import { addTarget } from '../gameobjects'
import { getSelected, hasSelected, isAlive, isWin, playSound } from '../helpers'
import { mouseState } from '../states'

const CAMERA_SCROLL = 1.5
const RATIO_LOW = 0.1
const RATIO_HIGH = 1 - RATIO_LOW

export function addMouse() {
  onUpdate(() => {
    if (isWin()) {
      return
    }

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
    if (isWin()) {
      return
    }

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
    if (isWin()) {
      return
    }

    const {
      pressStartPosition: { x: startX, y: startY },
    } = mouseState
    const { x: mouseX, y: mouseY } = toWorld(mousePos())

    if (startX === Position.OutOfBounds && startY === Position.OutOfBounds) {
      return
    }

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

    selection.hidden = false
  })

  onMouseRelease('left', () => {
    selection.hidden = true

    if (isWin()) {
      return
    }

    const collisions = selection
      .getCollisions()
      .filter(({ target }) => target.is(Tag.Zombie))

    if (collisions.length) {
      playSound(Sound.Grunt)

      collisions.forEach((collision) => {
        collision.target.tag(Tag.Selected)
      })
    }
  })

  onMousePress('right', () => {
    if (!hasSelected() || isWin()) {
      return
    }

    const position = toWorld(mousePos())

    const zombies = getSelected().filter((zombie) => isAlive(zombie))

    if (zombies.length) {
      addTarget(position)
      play(Sound.Rasp)

      zombies.forEach((zombie) => {
        zombie.moveToPosition = { x: position.x, y: position.y }
        zombie.enterState(State.Move)
      })
    }
  })
}
