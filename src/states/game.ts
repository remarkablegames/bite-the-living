import { LocalStorage } from '../constants'
import { getLocalStorage, setLocalStorage } from '../helpers'

class GameState {
  level = 0
}

export let gameState = new GameState()
Object.assign(gameState, getLocalStorage(LocalStorage.Game))

export function saveGameState() {
  setLocalStorage(LocalStorage.Game, gameState)
}

export function resetGameState() {
  gameState = new GameState()
  saveGameState()
}
