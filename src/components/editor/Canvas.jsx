import { useEffect, useRef, useState } from 'react'
import { LAYER_TYPES } from '../../constants/tools'
import { ENTITIES } from '../../constants/tilesets'

const Canvas = ({ map, stageId, tileset, scale, offset, showGridBorders, currentLayer, handleToolAction, handleOffset }) => {
    const canvasRef = useRef()
    const containerRef = useRef()
    const [startPoint, setStartPoint] = useState()
    //const [endPoint, setEndPoint] = useState()
    const [isDrawing, setIsDrawing] = useState(false)

    const handleOnMouseDown = (event) => {
        event.stopPropagation()
        const rect = containerRef.current.getBoundingClientRect()
        const eventPosition = { x: event.clientX, y: event.clientY }
        const canvasPosition = { x: event.clientX - rect.left, y: event.clientY - rect.top }
        setStartPoint(canvasPosition)
        setIsDrawing(true)
    }

    const handleOnMouseUp = (event) => {
        //event.stopPropagation()
        //const rect = containerRef.current.getBoundingClientRect()
        //const x = event.clientX - rect.left
        //const y = event.clientY - rect.top
        setIsDrawing(false)
        //console.log(startPoint, { x, y })
        ////handleToolAction(startPoint, { x, y })
    }

    const handleOnMouseMove = (event) => {
        event.stopPropagation()
        if (isDrawing) {
            const rect = containerRef.current.getBoundingClientRect()
            const eventPosition = { x: event.clientX, y: event.clientY }
            const canvasPosition = { x: event.clientX - rect.left, y: event.clientY - rect.top }
            handleToolAction(startPoint, canvasPosition)
        }
    }

    const handleReDraw = async () => {
        const context = canvasRef.current.getContext('2d')
        const stage = map.stages[stageId]

        if (stage) {
            const texture = new Image()
            texture.src = tileset.texture
            await texture.decode()

            const entities = new Image()
            const data = ENTITIES[map.stages[stageId].tilesetId]

            if (data) {
                entities.src = data?.texture
                await entities.decode()    
            }

            context.canvas.width  = containerRef.current.offsetWidth
            context.canvas.height = containerRef.current.offsetHeight

            context.imageSmoothingEnabled = false
            context.globalCompositeOperation = 'source-over'
            context.fillStyle = '#101010'
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

            // Draw Layers
            stage.layers.map((layer, layerIndex) => {
                if (!layer.isEnabled) return
                if (currentLayer.type == LAYER_TYPES.Tile && layerIndex > currentLayer.index) return

                if (currentLayer.type == LAYER_TYPES.Tile && currentLayer.index !== layerIndex) {
                    context.globalCompositeOperation = 'multiply'
                    context.fillStyle = '#ffffff90'
                } else {
                    context.globalCompositeOperation = 'source-over'
                }

                // Draw Layer
                layer.grid.map((row, y) => row.map((tileId, x) => {
                    const tile = tileset.tiles[tileId]

                    if (tile) {
                        context.drawImage(
                            texture,
                            tile.x, tile.y,
                            tile.width, tile.height,
                            x * tileset.tileSize.width * scale - offset.x, y * tileset.tileSize.height * scale - offset.y,
                            tileset.tileSize.width * scale, tileset.tileSize.height * scale
                        )
                    }
                }))

                // Draw entities
                stage.entities.filter(entity => entity.layer === layerIndex).map(entity => {
                    const data =  ENTITIES[map.stages[stageId].tilesetId].entities[entity.entityId]
                    context.drawImage(
                        entities,
                        data.position.x, data.position.y,
                        data.size.width, data.size.height,
                        (entity.position.x - data.offset.x) * scale, (entity.position.y - data.offset.y) * scale,
                        data.size.width * scale, data.size.height * scale,
                    )
                })
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

    return (
        <div
            className='border w-100 h-100 overflow-hidden'
            ref={containerRef}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            onMouseMove={handleOnMouseMove}
        >
            <canvas ref={canvasRef} style={{ width: '100%', imageRendering: 'pixelated', pointerEvents: 'none' }}/>
        </div>
    )
}

export default Canvas