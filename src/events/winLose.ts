import { isLose, isWin } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { showModal } from '../modals'

export function addWinLose() {
  onUpdate(() => {
    if (isWin()) {
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
