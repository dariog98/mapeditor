import { useState } from 'react'
import { TILESETS } from '../constants/tilesets'
import { EMPTY_TILE, LAYER_TYPES, TOOLS } from '../constants/tools'
import useMap from './useMap'

const useEditor = () => {
    const [scale, setScale] = useState(1)
    const [showGridBorders, setShowGridBorders] = useState(true)
    const [currentLayer, setCurrentLayer] = useState({})
    const [currentStage, setCurrentStage] = useState(undefined)
    const [currentTool, setCurrentTool] = useState(TOOLS.Pencil)
    const [currentTile, setCurrentTile] = useState('0000')
    const { map, createNewMap, addNewStage, deleteStage, handleSetTiles, addNewLayer } = useMap()

    const TOOL_ACTIONS = {
        [TOOLS.Pencil]: (stageId, layer, tile, value) => {
            if (layer.type == LAYER_TYPES.Collision) {
                handleSetTiles(stageId, layer, [ tile ], 1)
            } else {
                handleSetTiles(stageId, layer, [ tile ], value)
            }
        },
        [TOOLS.Bucket]: (stageId, layerIndex, originTile, value) => {
            const stage = map.stages[stageId]
            const currentTileValue = stage.layers[layerIndex][originTile.y][originTile.x]
            const checked = Array.from(Array(stage.gridSize.height), () => Array(stage.gridSize.width).fill(false))
            const tiles = []

            const dfs = (tile) => {
                if (
                    !(tile.y >= 0 && tile.y <= stage.gridSize.height - 1) ||
                    !(tile.x >= 0 && tile.x <= stage.gridSize.width - 1) ||
                    checked[tile.y][tile.x]
                ) {
                    return
                }

                checked[tile.y][tile.x] = true

                if (stage.layers[layerIndex][tile.y][tile.x] === currentTileValue) {
                    tiles.push(tile)
                    dfs({ x: tile.x, y: tile.y - 1 })
                    dfs({ x: tile.x, y: tile.y + 1 })
                    dfs({ x: tile.x - 1, y: tile.y })
                    dfs({ x: tile.x + 1, y: tile.y })
                }
            }

            dfs(originTile)
            handleSetTiles(stageId, layerIndex, tiles, value)        
        },
        [TOOLS.Eraser]: (stageId, layer, tile) => {
            if (layer.type == LAYER_TYPES.Collision) {
                handleSetTiles(stageId, layer, [ tile ], 0)
            } else {
                handleSetTiles(stageId, layer, [ tile ], EMPTY_TILE)
            }
        },
    }

    const handleSetTool = (toolId) => {
        setCurrentTool(toolId)
    }

    const handleScaleUp = () => {
        setScale(scale + 1)
    }

    const handleScaleDown = () => {
        setScale(current => Math.max(current - 1, 1))
    }

    const handleSetStageLayer = (stageId, typeLayer, indexLayer) => {
        setCurrentStage(stageId)
        setCurrentLayer({ type: typeLayer, index: indexLayer })
    }

    const getCurrentStage = () => {
        return map?.stages[currentStage]
    }

    const getCurrentTileset = () => {
        const stage = getCurrentStage()
        return TILESETS[stage?.tilesetId ?? 'vampire']
    }

    const handleToolAction = (pointerX, pointerY) => {
        const tileset = getCurrentTileset()
        const x = Math.floor(pointerX / (tileset.tileSize.width * scale))
        const y = Math.floor(pointerY / (tileset.tileSize.width * scale))
        TOOL_ACTIONS[currentTool](currentStage, currentLayer, { x, y }, currentTile)
    }

    const handleSaveMap = () => {
        const data = JSON.stringify(map)
        const file = new Blob([data], { type: 'text/plain' })
        
        const link = document.createElement('a')
        link.href = URL.createObjectURL(file)
        link.download = `${map.id}.json`
        link.click()
        URL.revokeObjectURL(link.href)
    }

    const toggleShowGridBorders = () => {
        setShowGridBorders(current => !current)
    }

    return {
        scale,
        handleScaleUp,
        handleScaleDown,
        currentTool,
        handleSetTool,
        currentTile,
        handleSetTile: setCurrentTile,
        currentStage,
        handleSetStage: setCurrentStage,
        currentLayer,
        handleSetStageLayer,
        getCurrentStage,
        getCurrentTileset,
        handleToolAction,
        handleSaveMap,
        showGridBorders,
        toggleShowGridBorders,
        map,
        createNewMap,
        addNewStage,
        handleDeleteStage: deleteStage,
        handleSetTiles,
        handleAddLayer: addNewLayer,
    }
}

export default useEditor