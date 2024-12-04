import { EMPTY_TILE } from './tools'

class Layer {
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

    addLayer(grid, isEnabled) {
        const newLayer = new Layer(this.gridSize.width, this.gridSize.height, grid, isEnabled)
        this.layers.push(newLayer)
    }

    removeLayer(layerIndex) {
        this.layers.splice(layerIndex, 1)
    }

    updateLayer(layerIndex, x, y, value) {
        this.layers[layerIndex][y][x] = value
    }

    getLayerTileValue(layerIndex, x, y) {
        return this.layers[layerIndex][y][x]
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
}

export { Map, Stage }