import { Position } from '../constants'

class MouseState {
  isHoveringZombie = false
  pressStartPosition = vec2(Position.OutOfBounds)
}

export let mouseState = new MouseState()

export function resetMouseState() {
  mouseState = new MouseState()
}
