import { Cursor, Scene, Size, Sprite, Tag } from '../constants'
import { addCollision, addMouse, addWinLose } from '../events'
import {
  addFloor,
  addGunman,
  addHuman,
  addStatic,
  addZombie,
} from '../gameobjects'
import { getTileVec2, music } from '../helpers'
import { getLevel } from '../levels'

scene(Scene.Game, () => {
  music.stop()
  music.play()
  setCursor(Cursor.Default)

  const { map, title } = getLevel()

  add([text(title.text, { size: 14, font: 'Monospace' }), title.pos])

  addLevel(map, {
    tileWidth: Size.Tile,
    tileHeight: Size.Tile,
    tiles: {
      // camera
      C: ({ x, y }) => {
        setCamPos(x * Size.Tile, y * Size.Tile)
        return addFloor()
      },

      // floor
      ' ': addFloor,

      // tile
      '.': () => [
        rect(Size.Tile, Size.Tile),
        area(),
        body({ isStatic: true }),
        opacity(0),
        Tag.Static,
      ],

      // table
      T: (pos) =>
        addStatic({
          sprite: Sprite.Table,
          pos,
          shape: new Rect(vec2(2, 2), 30, 30),
        }),

      // watercooler
      W: (pos) =>
        addStatic({
          sprite: Sprite.Watercooler,
          pos,
          shape: new Rect(vec2(9, 1), 15, 30),
        }),

      // human
      H: (pos) => {
        addHuman(getTileVec2(pos))
        return addFloor()
      },

      // gunman
      G: (pos) => {
        addGunman(getTileVec2(pos))
        return addFloor()
      },

      // zombie
      Z: (pos) => {
        addZombie(getTileVec2(pos))
        return addFloor()
      },
    },
  })

  addMouse()
  addCollision()
  addWinLose()
})
