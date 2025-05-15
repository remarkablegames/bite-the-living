import { Scene, Size, Sprite } from '../constants'
import { addFloor, addHuman, addPlayer, addStatic } from '../gameobjects'
import { getLevel } from '../levels'

scene(Scene.Game, () => {
  const { map, title } = getLevel()

  add([text(title.text, { size: 14, font: 'Monospace' }), title.pos])

  addLevel(map, {
    tileWidth: Size.Tile,
    tileHeight: Size.Tile,
    tiles: {
      // floor
      ' ': addFloor,

      // tile
      '.': () => [
        rect(Size.Tile, Size.Tile),
        area(),
        body({ isStatic: true }),
        opacity(0),
      ],

      // table
      T: (pos) => {
        addStatic(Sprite.Table, pos)
        return addFloor()
      },

      // watercooler
      W: (pos) => {
        addStatic(Sprite.Watercooler, pos, new Rect(vec2(9, 1), 15, 30))
        return addFloor()
      },

      // human
      H: (pos) => {
        addHuman(pos)
        return addFloor()
      },

      // player
      P: (pos) => {
        addPlayer(pos)
        return addFloor()
      },
    },
  })
})
