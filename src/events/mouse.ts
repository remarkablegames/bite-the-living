import { State } from '../constants'
import { getSelected, hasSelected, isAlive } from '../helpers'

export function addMouse() {
  onMousePress((mouseButton) => {
    if (mouseButton !== 'right' || !hasSelected()) {
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
