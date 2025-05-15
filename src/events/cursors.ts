import { Animation } from '../constants'
import { isAlive } from '../helpers'
import { playerState } from '../states'
import type { Player } from '../types'

export enum Key {
  Left = 'left',
  A = 'a',
  Right = 'right',
  D = 'd',
  Up = 'up',
  W = 'w',
  Down = 'down',
  S = 's',
}

export function addCursorKeys(player: Player) {
  player.play(Animation.Idle, { loop: true })

  player.onKeyDown((key) => {
    if (!isAlive(player)) {
      return
    }

    switch (key) {
      case Key.Left:
      case Key.A:
        player.flipX = false
        player.move(-playerState.speed, 0)
        break

      case Key.Right:
      case Key.D:
        player.flipX = true
        player.move(playerState.speed, 0)
        break

      case Key.Up:
      case Key.W:
        player.move(0, -playerState.speed)
        break

      case Key.Down:
      case Key.S:
        player.move(0, playerState.speed)
        break
    }
  })

  player.onKeyPress((key) => {
    if (isAlive(player) && Object.values(Key).includes(key as Key)) {
      player.play(Animation.Run, { loop: true })
    }
  })

  player.onKeyRelease((key) => {
    if (isAlive(player) && Object.values(Key).includes(key as Key)) {
      player.play(Animation.Idle, { loop: true })
    }
  })
}
