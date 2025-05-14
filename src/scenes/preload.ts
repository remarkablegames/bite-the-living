import { Animation, Scene, Sprite } from '../constants'
import { startLevel } from '../levels'

scene(Scene.Preload, async () => {
  loadSprite(Sprite.Zombie1, 'sprites/zombies/zombie1.png', {
    sliceX: 8,
    sliceY: 6,
    anims: {
      [Animation.Idle]: { from: 0, to: 5 },
      [Animation.Run]: { from: 8, to: 15 },
      [Animation.Knocked]: { from: 16, to: 21 },
      [Animation.Hit]: { from: 24, to: 26 },
      [Animation.Death]: { from: 32, to: 39 },
      [Animation.Death2]: { from: 40, to: 47 },
    },
  })

  loadSprite(Sprite.Human1, 'sprites/humans/human1.png', {
    sliceX: 8,
    sliceY: 5,
    anims: {
      [Animation.Idle]: { from: 0, to: 5 },
      [Animation.Run]: { from: 8, to: 15 },
      [Animation.Knocked]: { from: 16, to: 21 },
      [Animation.Hit]: { from: 24, to: 26 },
      [Animation.Death]: { from: 32, to: 39 },
    },
  })

  await loadSpriteAtlas('tilesets/interior.png', {
    [Sprite.Floor]: {
      x: 224,
      y: 32,
      width: 32,
      height: 32,
    },
  })

  startLevel()
})
