import { Sprite, Tag } from '../constants'

export function addEnemy(x: number, y: number) {
  return add([sprite(Sprite.Zombie1), pos(x, y), anchor('center'), Tag.Enemy])
}
