import { Cursor, Sprite } from '../constants'
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

      return addModal({
        imageSprite: Sprite.Win,
        buttonSprite: Sprite.Continue,
        onClick: nextLevel,
      })
    }

    if (isLose()) {
      return startLevel()
    }
  })
}
