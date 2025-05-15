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
        addStatic({
          sprite: Sprite.Table,
          pos,
          shape: new Rect(vec2(2, 2), 30, 30),
        })
        return addFloor()
      },

      // watercooler
      W: (pos) => {
        addStatic({
          sprite: Sprite.Watercooler,
          pos,
          shape: new Rect(vec2(9, 1), 15, 30),
        })
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
