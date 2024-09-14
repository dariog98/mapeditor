import { useState } from 'react'
import { EMPTY_TILE } from '../constants/tools'

const useMap = () => {
    const [data, setData] = useState(undefined)

    const handleSetTiles = (stageId, layer, tiles, value) => {
        const stageLayers = data.stages[stageId].layers.map(row => row.map(tileId => tileId))

        tiles.forEach(tile => {
            if (
                (tile.y >= 0 && tile.y <= data.stages[stageId].gridSize.height - 1) &&
                (tile.x >= 0 && tile.x <= data.stages[stageId].gridSize.width - 1)
            ) {
                stageLayers[layer][tile.y][tile.x] = value
            }
        })

        setData(current => {
            const temp = { ...current }
            temp.stages[stageId].layers = stageLayers
            return temp
        })
    }

    const createNewMap = (mapId) => {
        setData({
            id: mapId,
            stages: {}
        })
    }

    const addNewStage = (stageId, name, backgroundColor, gridWidth, gridHeight, tilesetId, layers) => {
        setData(current => {
            current.stages[stageId] = {
                name,
                backgroundColor,
                gridSize: { width: gridWidth, height: gridHeight },
                tilesetId,
                layers: [
                    Array.from(Array(gridHeight), () => new Array(gridWidth).fill(EMPTY_TILE))
                ]
            }

            for (let l = 0; l < layers?.length; l++) {
                for (let y = 0; y < gridHeight; y++) {
                    for (let x = 0; x < gridWidth; x++) {
                        const tileId = layers?.[l]?.[y]?.[x] ?? EMPTY_TILE

                        if (!current.stages[stageId].layers[l]) {
                            current.stages[stageId].layers.push([])
                        }

                        if (!current.stages[stageId].layers[l][y]) {
                            current.stages[stageId].layers[l].push([])
                        }

                        current.stages[stageId].layers[l][y][x] = tileId
                    }
                }
            }

            return current
        })
    }
    
    return {
        map: data,
        handleSetTiles,
        createNewMap,
        addNewStage,
    }
}

export default useMap