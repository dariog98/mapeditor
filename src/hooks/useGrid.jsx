import { useState } from 'react'

const useGrid = (layers, rows, columns) => {
    //const [grid, setGrid] = useState(Array.from(Array(rows), () => new Array(columns).fill('****')))
    const [grid, setGrid] = useState(Array.from(Array(layers), () => Array.from(Array(rows), () => new Array(columns).fill('****'))))

    const handleSetTile = (layer, x, y, value) => {
        const tempGrid = grid.map(row => row.map(tileId => tileId))
        tempGrid[layer][y][x] = value
        setGrid(tempGrid)
    }

    return {
        grid,
        handleSetTile
    }
}

export default useGrid