import { useEffect } from 'react'
import { useRef } from 'react'

const TileButton = ({ tileset, tileId, isActive, handleOnClick }) => {
    const canvasRef = useRef()

    useEffect(() => {
        const data = tileset?.tiles[tileId]
        if (data) {
            const context = canvasRef.current.getContext('2d')
            const image = new Image()
            image.onload = function() {
                context.imageSmoothingEnabled = false
                context.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
            image.src = tileset?.texture
        }
    }, [tileId])

    return <div>
        <div className='border overflow-hidden' onClick={handleOnClick} style={{ width: '3rem', height: '3rem', imageRendering: 'pixelated', opacity: isActive ? 1 : 0.5 }}>
            <canvas ref={canvasRef} className='tile'/>
        </div>
    </div>
}

const TilesPanel = ({ tileset, currentTile, handleSetTile }) => {
    return (
        <div className='overflow-auto' style={{ width: '300px' }}>
            <div className='tiles-panel'>
                {
                    Object.keys(tileset.tiles).map(tileId =>
                        <TileButton
                            key={tileId}
                            tileset={tileset}
                            tileId={tileId}
                            isActive={currentTile === tileId}
                            handleOnClick={() => handleSetTile(tileId)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default TilesPanel