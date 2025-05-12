import { Scene } from '../constants'
import { addHuman, addPlayer } from '../gameobjects'

scene(Scene.Game, () => {
  addPlayer()

  for (let i = 0; i < 3; i++) {
    const x = rand(0, width())
    const y = rand(0, height())
    addHuman(x, y)
  }
})
