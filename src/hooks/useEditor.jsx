import { useState } from 'react'
import useMap from './useMap'
import { TILESETS } from '../constants/tilesets'

const useEditor = () => {
    const [scale, setScale] = useState(1)
    const [showGridBorders, setShowGridBorders] = useState(true)
    const [currentLayer, setCurrentLayer] = useState(0)
    const [currentStage, setCurrentStage] = useState(undefined)
    const [currentTool, setCurrentTool] = useState('pencil')
    const [currentTile, setCurrentTile] = useState('0000')
    const { map, createNewMap, addNewStage, handleSetTiles } = useMap()

    const handleSetTool = (toolId) => {
        setCurrentTool(toolId)
    }

    const handleScaleUp = () => {
        setScale(scale + 1)
    }

    const handleScaleDown = () => {
        setScale(current => Math.max(current - 1, 1))
    }

    const handleSetStageLayer = (stageId, indexLayer) => {
        setCurrentStage(stageId)
        setCurrentLayer(indexLayer)
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
        handleSetTiles(currentStage, currentLayer, [ { x, y } ], currentTile)
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
        map,
        createNewMap,
        addNewStage,
        handleSetTiles,
        getCurrentStage,
        getCurrentTileset,
        handleToolAction,
        handleSaveMap,
        showGridBorders,
        toggleShowGridBorders,
    }
}

export default useEditor