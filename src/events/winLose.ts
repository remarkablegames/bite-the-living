import { hasHumans, hasZombies } from '../helpers'
import { nextLevel, startLevel } from '../levels'
import { showModal } from '../modals'

export function addWinLose() {
  onUpdate(() => {
    // win
    if (!hasHumans()) {
      return showModal({
        image: 'humansDefeated',
        buttonSprite: 'continueButton',
        onContinue: nextLevel,
      })
    }

    // lose
    if (!hasZombies()) {
      return startLevel()
    }
  })
}
