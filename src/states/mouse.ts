import { Position } from '../constants'
import type { Zombie } from '../types'

class MouseState {
  isHoveringZombie = false
  hoveredZombie: Zombie | null = null
  pressStartPosition = vec2(Position.OutOfBounds)
}

export let mouseState = new MouseState()

export function resetMouseState() {
  mouseState = new MouseState()
}
