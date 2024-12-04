import { useEffect } from 'react'
import { useRef } from 'react'
import { LAYER_TYPES } from '../../constants/tools'
import { ENTITIES } from '../../constants/tilesets'

const Canvas = ({ map, stageId, tileset, scale, offset, showGridBorders, currentLayer, handleToolAction, handleOffset }) => {
    const canvasRef = useRef()
    const containerRef = useRef()

    const handleOnClick = (event) => {
        const rect = containerRef.current.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top
        handleToolAction(pointerX, pointerY)
    }

    const handleOnMouseDown = (event) => {
        const starPoint = { x: event.clientX, y: event.clientY }

        const onMove = (event) => {
            const endPoint = { x: event.clientX, y: event.clientY }
            const newOffset = {
                x: offset.x + starPoint.x - endPoint.x,
                y: offset.y + starPoint.y - endPoint.y
            }

            handleOffset(newOffset)
        }

        const onUp = () => {
            containerRef.current.removeEventListener('mousemove', onMove)
            containerRef.current.removeEventListener('mouseup', onUp)
        }

        containerRef.current.addEventListener('mousemove', onMove)
        containerRef.current.addEventListener('mouseup', onUp)
    }

    const handleReDraw = async () => {
        const context = canvasRef.current.getContext('2d')
        const stage = map.stages[stageId]

        if (stage) {
            const texture = new Image()
            texture.src = tileset.texture
            await texture.decode()

            context.canvas.width  = containerRef.current.offsetWidth
            context.canvas.height = containerRef.current.offsetHeight

            context.imageSmoothingEnabled = false
            context.globalCompositeOperation = 'source-over'
            context.fillStyle = '#101010'
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

            // Draw Layers
            stage.layers.map((layer, l) => {
                if (!layer.isEnabled) return

                if (currentLayer.type == LAYER_TYPES.Tile && l > currentLayer.index) return

                layer.grid.map((row, y) => row.map((tileId, x) => {
                    const tile = tileset.tiles[tileId]

                    if (tile) {
                        if (currentLayer.type == LAYER_TYPES.Tile && currentLayer.index !== l) {
                            context.globalCompositeOperation = 'multiply'
                            context.fillStyle = '#ffffff90'
                        } else {
                            context.globalCompositeOperation = 'source-over'
                        }
                        
                        context.drawImage(
                            texture,
                            tile.x, tile.y,
                            tile.width, tile.height,
                            x * tileset.tileSize.width * scale - offset.x, y * tileset.tileSize.height * scale - offset.y,
                            tileset.tileSize.width * scale, tileset.tileSize.height * scale
                        )
                    }
                }))
            })

            // Draw Collisions
            if (currentLayer.type == LAYER_TYPES.Collision) {
                const collisions = stage.collisions[currentLayer.index]
                context.globalCompositeOperation = 'source-over'
                context.fillStyle = '#ff0000A0'

                for (let y = 0; y < stage.gridSize.height; y++) {
                    for (let x = 0; x < stage.gridSize.width; x++) {
                        if (collisions[y][x] === 1) {
                            context.fillRect(
                                x * tileset.tileSize.width * scale - offset.x,
                                y * tileset.tileSize.height * scale - offset.y,
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
                            x * tileset.tileSize.width * scale - offset.x,
                            y * tileset.tileSize.height * scale - offset.y,
                            tileset.tileSize.width * scale,
                            tileset.tileSize.height * scale
                        )
                    }
                }
            }
        }
    }

    useEffect(() => {
        handleReDraw()
    }, [map, scale, stageId, currentLayer, showGridBorders, offset])

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
        <div ref={containerRef} className='border w-100 h-100 overflow-hidden' onClick={handleOnClick} onMouseDown={handleOnMouseDown}>
            <canvas ref={canvasRef} style={{ width: '100%', imageRendering: 'pixelated', pointerEvents: 'none' }}/>
        </div>
    )
}

export default Canvas