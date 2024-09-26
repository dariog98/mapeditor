import { useEffect } from 'react'
import { useRef } from 'react'
import { LAYER_TYPES } from '../../constants/tools'

const Canvas = ({ map, stageId, tileset, scale, showGridBorders, currentLayer, handleToolAction }) => {
    const canvasRef = useRef()
    const containerRef = useRef()

    const handleOnClick = (event) => {
        const rect = containerRef.current.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top
        handleToolAction(pointerX, pointerY)
    }

    const handleReDraw = () => {
        const context = canvasRef.current.getContext('2d')

        context.canvas.width  = containerRef.current.offsetWidth
        context.canvas.height = containerRef.current.offsetHeight

        context.imageSmoothingEnabled = false
        context.globalCompositeOperation = 'source-over'
        context.fillStyle = '#101010'
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        const stage = map.stages[stageId]
        if (stage) {
            const sprite = new Image()
            sprite.src = tileset.texture
            sprite.onload = function() {
                // Draw tiles
                stage.layers.map((layer, l) => layer.map((row, y) => row.map((tileId, x) => {
                    const tile = tileset.tiles[tileId]

                    if (tile) {
                        if (currentLayer.type == LAYER_TYPES.Tile && currentLayer.index !== l) {
                            context.globalCompositeOperation = 'multiply'
                            context.fillStyle = '#ffffff90'
                        } else {
                            context.globalCompositeOperation = 'source-over'
                        }

                        context.drawImage(
                            sprite,
                            tile.x, tile.y,
                            tile.width, tile.height,
                            x * tileset.tileSize.width * scale, y * tileset.tileSize.height * scale,
                            tileset.tileSize.width * scale, tileset.tileSize.height * scale
                        )
                    }
                })))

                // Draw Collisions
                if (currentLayer.type == LAYER_TYPES.Collision) {
                    const collisions = stage.collisions[currentLayer.index]
                    context.globalCompositeOperation = 'source-over'
                    context.fillStyle = '#ff0000A0'

                    for (let y = 0; y < stage.gridSize.height; y++) {
                        for (let x = 0; x < stage.gridSize.width; x++) {
                            if (collisions[y][x] === 1) {
                                context.fillRect(
                                    x * tileset.tileSize.width * scale,
                                    y * tileset.tileSize.height * scale,
                                    tileset.tileSize.width * scale,
                                    tileset.tileSize.height * scale
                                )
                            }
                        }
                    }
                }

                // Draw Grid
                if (showGridBorders) {
                    context.globalCompositeOperation = 'source-over'
                    context.strokeStyle = '#ffffff25'
                    
                    for (let y = 0; y < stage.gridSize.height; y++) {
                        for (let x = 0; x < stage.gridSize.width; x++) {
                            context.strokeRect(
                                x * tileset.tileSize.width * scale,
                                y * tileset.tileSize.height * scale,
                                tileset.tileSize.width * scale,
                                tileset.tileSize.height * scale
                            )
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        handleReDraw()
    }, [map, scale, stageId, currentLayer, showGridBorders])

    /*
    useEffect(() => {
        const canvas = canvasRef.current

        canvas.addEventListener('click', () => {
            handleReDraw()
        })

        handleReDraw()
    }, [])
    */

    return (
        <div ref={containerRef} className='border w-100 h-100 overflow-hidden' onClick={handleOnClick}>
            <canvas ref={canvasRef} style={{ width: '100%', imageRendering: 'pixelated', pointerEvents: 'none' }}/>
        </div>
    )
}

export default Canvas