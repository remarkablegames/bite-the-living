import { Scene, Size, Sprite } from '../constants'
import { addHuman, addPlayer } from '../gameobjects'

scene(Scene.Game, () => {
  addLevel(
    [
      '............',
      '.        H .',
      '.          .',
      '.  P       .',
      '.    H     .',
      '.          .',
      '.          .',
      '.          .',
      '.     H    .',
      '.          .',
      '............',
    ],
    {
      tileWidth: Size.Tile,
      tileHeight: Size.Tile,
      tiles: {
        '.': () => [
          rect(Size.Tile, Size.Tile),
          area(),
          body({ isStatic: true }),
          opacity(0),
        ],
        ' ': () => [sprite(Sprite.Floor)],
        P: (pos) => {
          addPlayer(pos.x * Size.Tile, pos.y * Size.Tile)
          return [sprite(Sprite.Floor)]
        },
        H: (pos) => {
          addHuman(pos.x * Size.Tile, pos.y * Size.Tile)
          return [sprite(Sprite.Floor)]
        },
      },
    },
  )
})
