import { State, Tag } from '../constants'
import { getSelected, hasSelected, isAlive } from '../helpers'
import { mouseState } from '../states'

export function addMouse() {
  onMousePress('left', () => {
    if (!mouseState.isHoveringZombie) {
      getSelected().forEach((zombie) => zombie.untag(Tag.Selected))
    }
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
