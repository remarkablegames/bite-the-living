import type { GameObj } from 'kaplay'

const CELL_SIZE = 100

class SpatialGrid {
  private grid = new Map<string, Set<GameObj>>()

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / CELL_SIZE)
    const cellY = Math.floor(y / CELL_SIZE)
    return `${String(cellX)},${String(cellY)}`
  }

  add(entity: GameObj, x: number, y: number): void {
    const key = this.getCellKey(x, y)
    let cell = this.grid.get(key)
    if (!cell) {
      cell = new Set()
      this.grid.set(key, cell)
    }
    cell.add(entity)
  }

  remove(entity: GameObj, x: number, y: number): void {
    const key = this.getCellKey(x, y)
    const cell = this.grid.get(key)
    if (cell) {
      cell.delete(entity)
      if (cell.size === 0) {
        this.grid.delete(key)
      }
    }
  }

  update(
    entity: GameObj,
    oldX: number,
    oldY: number,
    newX: number,
    newY: number,
  ): void {
    const oldKey = this.getCellKey(oldX, oldY)
    const newKey = this.getCellKey(newX, newY)

    if (oldKey === newKey) {
      return
    }

    this.remove(entity, oldX, oldY)
    this.add(entity, newX, newY)
  }

  getNearby(x: number, y: number, radius = 1): GameObj[] {
    const nearby: GameObj[] = []
    const centerCellX = Math.floor(x / CELL_SIZE)
    const centerCellY = Math.floor(y / CELL_SIZE)

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const key = `${String(centerCellX + dx)},${String(centerCellY + dy)}`
        const cell = this.grid.get(key)
        if (cell) {
          nearby.push(...cell)
        }
      }
    }

    return nearby
  }

  clear(): void {
    this.grid.clear()
  }
}

export const spatialGrid = new SpatialGrid()

export function registerEntity(entity: GameObj, x: number, y: number): void {
  spatialGrid.add(entity, x, y)
}

export function unregisterEntity(entity: GameObj, x: number, y: number): void {
  spatialGrid.remove(entity, x, y)
}

export function updateEntityPosition(
  entity: GameObj,
  oldX: number,
  oldY: number,
  newX: number,
  newY: number,
): void {
  spatialGrid.update(entity, oldX, oldY, newX, newY)
}

export function getNearbyEntities(x: number, y: number, radius = 1): GameObj[] {
  return spatialGrid.getNearby(x, y, radius)
}
