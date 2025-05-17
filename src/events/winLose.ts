import { Cursor } from '../constants'
import { isLose, isWin } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { addModal } from '../modals'
import { resetMouseState } from '../states'

export function addWinLose() {
  const updateEvent = onUpdate(() => {
    if (isWin()) {
      updateEvent.cancel()
      setCursor(Cursor.Default)
      resetMouseState()

      return addModal({ onClick: nextLevel })
    }

    if (isLose()) {
      return startLevel()
    }
  })
}
