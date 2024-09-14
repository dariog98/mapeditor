import { useEffect } from 'react'
import { useRef } from 'react'

const Canvas = ({ map, stageId, tileset, scale, seeBorder, currentLayer, handleToolAction }) => {
    const canvasRef = useRef()
    const containerRef = useRef()

    const handleOnClick = (event) => {
        const rect = containerRef.current.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top
        handleToolAction(pointerX, pointerY)
    }

    useEffect(() => {
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
                stage.layers.map((layer, l) => layer.map((row, y) => row.map((tileId, x) => {
                    const tile = tileset.tiles[tileId]

                    if (tile) {
                        if (l !== currentLayer) {
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

                // Draw Grid
                if (seeBorder) {
                    context.globalCompositeOperation = 'source-over'
                    context.strokeStyle = '#ffffff25'
                    for (let y = 0; y < stage.gridSize.height; y++) {
                        for (let x = 0; x < stage.gridSize.width; x++) {
                            context.beginPath()
                            context.rect(x * tileset.tileSize.width * scale, y * tileset.tileSize.height * scale, tileset.tileSize.width * scale, tileset.tileSize.height * scale);
                            context.stroke()
                        }
                    }
                }
            }
        }
    }, [map, scale, stageId, currentLayer])

    return (
        <div ref={containerRef} className='border w-100 h-100 overflow-hidden' onClick={handleOnClick}>
            <canvas ref={canvasRef} style={{ width: '100%', imageRendering: 'pixelated', pointerEvents: 'none' }}/>
        </div>
    )
}

export default Canvas