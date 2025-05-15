import { addHuman, addZombie } from '../gameobjects'

export type Human = ReturnType<typeof addHuman>
export type Zombie = ReturnType<typeof addZombie>
