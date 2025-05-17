import { Cursor } from '../constants'
import { isLose, isWin } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { showModal } from '../modals'
import { resetMouseState } from '../states'

export function addWinLose() {
  const updateEvent = onUpdate(() => {
    if (isWin()) {
      updateEvent.cancel()
      setCursor(Cursor.Default)
      resetMouseState()

      return showModal({
        image: 'humansDefeated',
        buttonSprite: 'continueButton',
        onContinue: nextLevel,
      })
    }

    if (isLose()) {
      return startLevel()
    }
  })
}
