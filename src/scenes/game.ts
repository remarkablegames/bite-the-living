import { Scene, Size, Sprite } from '../constants'
import { addHuman, addPlayer, addTable } from '../gameobjects'
import { getLevel } from '../levels'

scene(Scene.Game, () => {
  const { map, title } = getLevel()

  add([text(title.text, { size: 14, font: 'Monospace' }), title.pos])

  addLevel(map, {
    tileWidth: Size.Tile,
    tileHeight: Size.Tile,
    tiles: {
      // floor
      ' ': () => [sprite(Sprite.Floor)],

      // tile
      '.': () => [
        rect(Size.Tile, Size.Tile),
        area(),
        body({ isStatic: true }),
        opacity(0),
      ],

      // table
      T: (pos) => {
        addTable(pos)
        return [sprite(Sprite.Floor)]
      },

      // human
      H: (pos) => {
        addHuman(pos)
        return [sprite(Sprite.Floor)]
      },

      // player
      P: (pos) => {
        addPlayer(pos)
        return [sprite(Sprite.Floor)]
      },
    },
  })
})
