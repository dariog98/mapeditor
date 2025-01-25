import { EMPTY_TILE } from './tools'

class LayerCollision {
    constructor(width, height, grid, isEnabled) {
        this.isEnabled = isEnabled ?? true
        this.grid = Array.from(Array(height), () => new Array(width).fill(0))

        if (grid) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const collision = grid?.[y]?.[x] ?? 0
                    this.grid[y][x] = collision
                }
            }
        }
    }

    toggleEnabled() {
        this.isEnabled = !this.isEnabled
    }

    disable() {
        this.isEnabled = false
    }

    enable() {
        this.isEnabled = true
    }
}

class LayerTile {
    constructor(width, height, grid, isEnabled) {
        this.isEnabled = isEnabled ?? true
        this.grid = Array.from(Array(height), () => new Array(width).fill(EMPTY_TILE))

        if (grid) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const tileId = grid?.[y]?.[x] ?? EMPTY_TILE
                    this.grid[y][x] = tileId
                }
            }
        }
    }

    toggleEnabled() {
        this.isEnabled = !this.isEnabled
    }

    disable() {
        this.isEnabled = false
    }

    enable() {
        this.isEnabled = true
    }
}

class Stage {
    constructor(id, title, tilesetId, gridSize, backgroundColor, player) {
        this.id = id
        this.title = title
        this.tilesetId = tilesetId
        this.gridSize = gridSize
        this.backgroundColor = backgroundColor ?? '#000000'
        this.player = player ?? { position: { x: 0, y: 0 }, layer: 1 }
        this.layers = []
        this.triggers = []
        this.entities = []
        this.collisions = []
    }

    addLayerTile(grid, isEnabled) {
        const newLayer = new LayerTile(this.gridSize.width, this.gridSize.height, grid, isEnabled)
        this.layers.push(newLayer)
    }

    removeLayerTile(layerIndex) {
        this.layers.splice(layerIndex, 1)
    }

    updateLayerTile(layerIndex, x, y, value) {
        this.layers[layerIndex][y][x] = value
    }

    getLayerTileValue(layerIndex, x, y) {
        return this.layers[layerIndex][y][x]
    }

    addLayerCollision(grid, isEnabled) {
        const newLayer = new LayerCollision(this.gridSize.width, this.gridSize.height, grid, isEnabled)
        this.collisions.push(newLayer)
    }

    updateLayerCollision(layerIndex, x, y, value) {
        this.collisions[layerIndex][y][x] = value
    }

    removeLayerCollision(layerIndex) {
        this.collisions.splice(layerIndex, 1)
    }

    getLayerCollisionValue(layerIndex, x, y) {
        return this.collisions[layerIndex][y][x]
    }
}

class Map {
    constructor(id, title) {
        this.id = id
        this.title = title
        this.stages = {}
    }

    addStage(stageId, newStage) {
        this.stages[stageId] = newStage
    }

    removeStage(stageId) {
        this.stages[stageId] = undefined
    }

    getStage(stageId) {
        return this.stages[stageId]
    }
}

export { Map, Stage }