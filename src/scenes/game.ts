import { LocalStorage, Scene, Size, Sprite } from '../constants'
import { addHuman, addPlayer } from '../gameobjects'
import { levels } from '../levels'

scene(Scene.Game, (level = 0) => {
  setData(LocalStorage.Level, level)

  if (level < 0 || level >= levels.length) {
    level = 0
  }

  const { map } = levels[level]

  addLevel(map, {
    tileWidth: Size.Tile,
    tileHeight: Size.Tile,
    tiles: {
      ' ': () => [sprite(Sprite.Floor)],

      '.': () => [
        rect(Size.Tile, Size.Tile),
        area(),
        body({ isStatic: true }),
        opacity(0),
      ],

      P: (pos) => {
        addPlayer(pos.x * Size.Tile, pos.y * Size.Tile)
        return [sprite(Sprite.Floor)]
      },

      H: (pos) => {
        addHuman(pos.x * Size.Tile, pos.y * Size.Tile)
        return [sprite(Sprite.Floor)]
      },
    },
  })
})
