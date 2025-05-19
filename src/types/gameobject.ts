import { addBullet, addHuman, addZombie } from '../gameobjects'

export type Bullet = ReturnType<typeof addBullet>
export type Human = ReturnType<typeof addHuman>
export type Zombie = ReturnType<typeof addZombie>
