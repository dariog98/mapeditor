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
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const { map, createNewMap, addNewStage, deleteStage, handleSetTiles, addNewLayer } = useMap()

    const TOOL_ACTIONS = {
        [TOOLS.Pencil]: (stageId, layer, tileValue, startPoint, endPoint) => {
            const tiles = []
            const startTile = getPositionInCanvas(startPoint)
            const endTile = getPositionInCanvas(endPoint)

            const minX = Math.min(startTile.x, endTile.x)
            const maxX = Math.max(startTile.x, endTile.x)
            const minY = Math.min(startTile.y, endTile.y)
            const maxY = Math.max(startTile.y, endTile.y)

            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    tiles.push({ x, y })
                }
            }

            if (layer.type == LAYER_TYPES.Collision) {
                handleSetTiles(stageId, layer, tiles, 1)
            } else {
                handleSetTiles(stageId, layer, tiles, tileValue)
            }
        },
        [TOOLS.Eraser]: (stageId, layer, tileValue, startPoint, endPoint) => {
            const tiles = []
            const startTile = getPositionInCanvas(startPoint)
            const endTile = getPositionInCanvas(endPoint)

            const minX = Math.min(startTile.x, endTile.x)
            const maxX = Math.max(startTile.x, endTile.x)
            const minY = Math.min(startTile.y, endTile.y)
            const maxY = Math.max(startTile.y, endTile.y)

            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    tiles.push({ x, y })
                }
            }

            if (layer.type == LAYER_TYPES.Collision) {
                handleSetTiles(stageId, layer, tiles, 0)
            } else {
                handleSetTiles(stageId, layer, tiles, EMPTY_TILE)
            }
        },
        [TOOLS.Offset]: (stageId, layer, tileValue, startPoint, endPoint) => {
            const difference = {
                x: startPoint.x - endPoint.x,
                y: startPoint.y - endPoint.y
            }
            const newOffset = {
                x: difference.x,
                y: difference.y
            }
            setOffset(newOffset)
        }
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

    const handleToolAction = (startPoint, endPoint) => {
        const toolFunction = TOOL_ACTIONS[currentTool]
        toolFunction(
            currentStage,
            currentLayer,
            currentTile,
            startPoint,
            endPoint,
        )
    }

    const getPositionInCanvas = (point) => {
        const tileset = getCurrentTileset()
        const position = {
            x: Math.floor((point.x + offset.x) / (tileset.tileSize.width * scale)),
            y: Math.floor((point.y + offset.y) / (tileset.tileSize.width * scale)),
        }
        return position
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
        offset,
        handleOffset: setOffset,
    }
}

export default useEditor