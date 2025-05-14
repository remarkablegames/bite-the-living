import { Scene, Size, Sprite } from '../constants'
import { addHuman, addPlayer } from '../gameobjects'

scene(Scene.Game, () => {
  setCamScale(1)

  addLevel(
    [
      '          ',
      '          ',
      '          ',
      '          ',
      '          ',
      '          ',
      '          ',
      '          ',
      '          ',
    ],
    {
      tileWidth: Size.Tile,
      tileHeight: Size.Tile,
      tiles: {
        ' ': () => [sprite(Sprite.Floor)],
      },
    },
  )

  addLevel(
    [
      '        H ',
      '          ',
      '  P       ',
      '    H     ',
      '          ',
      '          ',
      '          ',
      '     H    ',
      '          ',
    ],
    {
      tileWidth: Size.Tile,
      tileHeight: Size.Tile,
      tiles: {
        P: (pos) => {
          addPlayer(pos.x * Size.Tile, pos.y * Size.Tile)
          return []
        },
        H: (pos) => {
          addHuman(pos.x * Size.Tile, pos.y * Size.Tile)
          return []
        },
      },
    },
  )
})
