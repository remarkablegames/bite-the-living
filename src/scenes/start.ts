import './game'
import './menu'
import './preload'

import { Scene } from '../constants'

export function start() {
  go(Scene.Preload)
}
