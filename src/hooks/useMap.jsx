import { useState } from 'react'
import { EMPTY_TILE, LAYER_TYPES } from '../constants/tools'

const useMap = () => {
    const [data, setData] = useState(undefined)

    const handleSetTiles = (stageId, layer, tiles, value) => {
        const layers = data.stages[stageId].layers.map(row => row.map(tileId => tileId))
        const collisions = data.stages[stageId].collisions.map(row => row.map(tileId => tileId))

        tiles.forEach(tile => {
            if (
                (tile.y >= 0 && tile.y <= data.stages[stageId].gridSize.height - 1) &&
                (tile.x >= 0 && tile.x <= data.stages[stageId].gridSize.width - 1)
            ) {
                if (layer.type == LAYER_TYPES.Collision) {
                    collisions[layer.index][tile.y][tile.x] = value
                } else {
                    layers[layer.index][tile.y][tile.x] = value
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

    const createNewMap = (mapId) => {
        setData({
            id: mapId,
            stages: {}
        })
    }

    const addNewStage = (stageId, title, backgroundColor, gridWidth, gridHeight, tilesetId, layers, collisions) => {
        const id = stageId

        setData(current => {
            const stage = {
                id: stageId,
                title,
                backgroundColor,
                gridSize: { width: gridWidth, height: gridHeight },
                tilesetId,
                layers: [
                    Array.from(Array(gridHeight), () => new Array(gridWidth).fill(EMPTY_TILE))
                ],
                collisions: [
                    Array.from(Array(gridHeight), () => new Array(gridWidth).fill(0))
                ]
            }

            for (let l = 0; l < layers?.length; l++) {
                for (let y = 0; y < gridHeight; y++) {
                    for (let x = 0; x < gridWidth; x++) {
                        const tileId = layers?.[l]?.[y]?.[x] ?? EMPTY_TILE

                        if (!stage.layers[l]) {
                            stage.layers.push([])
                        }

                        if (!stage.layers[l][y]) {
                            stage.layers[l].push([])
                        }

                        stage.layers[l][y][x] = tileId
                    }
                }
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
        const layer = Array.from(Array(stage.gridSize.height), () => new Array(stage.gridSize.width).fill(EMPTY_TILE))
        stages[stageId].layers.push(layer)
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
    }
}

export default useMap