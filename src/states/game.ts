import { getLocalStorage, setLocalStorage } from '../helpers'

class GameState {
  level = 0
}

export let gameState = new GameState()
Object.assign(gameState, getLocalStorage('game'))

export function saveGameState() {
  setLocalStorage('game', gameState)
}

export function resetGameState() {
  gameState = new GameState()
  saveGameState()
}
