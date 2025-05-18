import { Animation, Scene, Sound, Sprite } from '../constants'

scene(Scene.Preload, async () => {
  loadSprite(Sprite.Pistol, 'sprites/weapons/pistol.png', {
    sliceX: 5,
    sliceY: 1,
    anims: {
      [Animation.Idle]: 4,
      [Animation.Shoot]: { from: 0, to: 4 },
    },
  })

  const sprites1 = [
    [Sprite.Zombie1, 'sprites/zombies/zombie1.png'],
    [Sprite.Zombie2, 'sprites/zombies/zombie2.png'],
  ]

  sprites1.forEach(([name, source]) => {
    loadSprite(name, source, {
      sliceX: 8,
      sliceY: 6,
      anims: {
        [Animation.Idle]: { from: 0, to: 5, loop: true },
        [Animation.Run]: { from: 8, to: 15, loop: true },
        [Animation.Knocked]: { from: 16, to: 21, loop: true },
        [Animation.Hit]: { from: 24, to: 26 },
        [Animation.Death]: { from: 40, to: 47 },
        [Animation.Death2]: { from: 32, to: 39 },
      },
    })
  })

  const sprites2 = [
    [Sprite.Human1, 'sprites/humans/human1.png'],
    [Sprite.Zombie3, 'sprites/zombies/zombie3.png'],
    [Sprite.Zombie4, 'sprites/zombies/zombie4.png'],
  ]

  sprites2.forEach(([name, source]) => {
    loadSprite(name, source, {
      sliceX: 8,
      sliceY: 5,
      anims: {
        [Animation.Idle]: { from: 0, to: 5, loop: true },
        [Animation.Run]: { from: 8, to: 15, loop: true },
        [Animation.Knocked]: { from: 16, to: 21, loop: true },
        [Animation.Hit]: { from: 24, to: 26 },
        [Animation.Death]: { from: 32, to: 39 },
      },
    })
  })

  loadSprite(Sprite.Continue, 'sprites/ui/continue.png')
  loadSprite(Sprite.Frame, 'sprites/ui/menu_frame.png')
  loadSprite(Sprite.Start, 'sprites/ui/start.png')
  loadSprite(Sprite.Title, 'sprites/ui/title.png')
  loadSprite(Sprite.Win, 'sprites/ui/humans_defeated.png')

  loadSound(Sound.Exhale, 'sounds/exhale.ogg')
  loadSound(Sound.Explode, 'sounds/explode.ogg')
  loadSound(Sound.Grunt, 'sounds/grunt.ogg')
  loadSound(Sound.Hit, 'sounds/hit.mp3')
  loadSound(Sound.Rasp, 'sounds/rasp.ogg')
  loadSound(Sound.Score, 'sounds/score.mp3')

  await loadSpriteAtlas('tilesets/interior.png', {
    [Sprite.Floor]: {
      x: 224,
      y: 32,
      width: 32,
      height: 32,
    },

    [Sprite.Table]: {
      x: 256,
      y: 32,
      width: 32,
      height: 32,
    },

    [Sprite.Watercooler]: {
      x: 256,
      y: 424,
      width: 32,
      height: 32,
    },
  })

  go(Scene.Menu)
})
