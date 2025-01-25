import { useState } from 'react'
import { EMPTY_TILE, LAYER_TYPES } from '../constants/tools'

const useMap = () => {
    const [data, setData] = useState(undefined)

    const createNewMap = (mapId, title) => {
        setData({
            id: mapId,
            title: title,
            stages: {}
        })
    }

    const addNewStage = (stageId, title, backgroundColor, gridWidth, gridHeight, tilesetId, playerDefaults, layers, collisions, triggers, entities) => {
        const id = stageId

        setData(current => {
            const stage = {
                id: stageId,
                title,
                backgroundColor,
                playerDefaults,
                gridSize: { width: gridWidth, height: gridHeight },
                tilesetId,
                triggers: triggers ?? [],
                layers: [],
                collisions: [
                    Array.from(Array(gridHeight), () => new Array(gridWidth).fill(0))
                ],
                entities: entities ?? []
            }

            for (let l = 0; l < layers?.length; l++) {
                const isEnabled = layers?.[l]?.isEnabled ?? true
                const grid = Array.from(Array(gridHeight), () => new Array(gridWidth).fill(EMPTY_TILE))
                for (let y = 0; y < gridHeight; y++) {
                    for (let x = 0; x < gridWidth; x++) {
                        const tileId = layers?.[l]?.grid?.[y]?.[x] ?? EMPTY_TILE
                        grid[y][x] = tileId
                    }
                }
                stage.layers.push({ isEnabled, grid })
            }

            for (let l = 0; l < collisions?.length; l++) {
                for (let y = 0; y < gridHeight; y++) {
                    for (let x = 0; x < gridWidth; x++) {
                        const isCollision = collisions?.[l]?.[y]?.[x] ?? 0

                        if (!stage.collisions[l]) {
                            stage.collisions.push([])
                        }

                        if (!stage.collisions[l][y]) {
                            stage.collisions[l].push([])
                        }

                        stage.collisions[l][y][x] = isCollision
                    }
                }
            }

            current.stages[id] = stage

            return current
        })
    }

    const handleSetTiles = (stageId, layer, tiles, value) => {
        const layers = data.stages[stageId].layers
        const collisions = data.stages[stageId].collisions

        tiles.forEach(tile => {
            if (
                (tile.y >= 0 && tile.y <= data.stages[stageId].gridSize.height - 1) &&
                (tile.x >= 0 && tile.x <= data.stages[stageId].gridSize.width - 1)
            ) {
                if (layer.type == LAYER_TYPES.Collision) {
                    collisions[layer.index][tile.y][tile.x] = value
                } else {
                    layers[layer.index].grid[tile.y][tile.x] = value
                }
            }
        })

        setData(current => {
            const temp = { ...current }
            temp.stages[stageId].layers = layers
            temp.stages[stageId].collisions = collisions
            return temp
        })
    }

    const deleteStage = (stageId) => {
        setData(current => {
            const stages = current.stages
            delete stages[stageId]
            return {
                ...current,
                stages
            }
        })
    }

    const addNewLayer = (stageId) => {
        const stages = data.stages
        const stage = data.stages[stageId]
        const newLayer = {
            isEnabled: true,
            grid: Array.from(Array(stage.gridSize.height), () => new Array(stage.gridSize.width).fill(EMPTY_TILE))
        }
        stages[stageId].layers.push(newLayer)
        setData(current => {
            return { ...current, stages }
        })
    }

    const addNewCollisionLayer = (stageId) => {
        const stages = data.stages
        const stage = data.stages[stageId]
        const collision = Array.from(Array(stage.gridSize.height), () => new Array(stage.gridSize.width).fill(0))
        stages[stageId].collisions.push(collision)
        setData(current => {
            return { ...current, stages }
        })
    }
    
    return {
        map: data,
        handleSetTiles,
        createNewMap,
        addNewStage,
        deleteStage,
        addNewLayer,
        addNewCollisionLayer,
    }
}

export default useMap