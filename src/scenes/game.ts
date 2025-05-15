import { Scene, Size, Sprite, Tag } from '../constants'
import { addHuman, addPlayer } from '../gameobjects'
import { showModal } from '../helpers/modal'
import { levels, nextLevel } from '../levels'

scene(Scene.Game, (level = 0) => {
  const { map } = levels[level]

  let levelComplete = false

  onUpdate(() => {
    if (!levelComplete && get(Tag.Human).length === 0) {
      levelComplete = true
      showLevelCompleteModal()
    }
  })

  function showLevelCompleteModal() {
    showModal({
      message: 'Humans Defeated!',
      onContinue: () => nextLevel(),
    })
  }

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
