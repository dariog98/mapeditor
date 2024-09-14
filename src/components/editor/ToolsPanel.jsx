import { faPen, faEraser, faFillDrip, faFloppyDisk, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../basics'
import { TOOLS } from '../../constants/tools'

const BUTTON_STYLE = { width: '2.5rem', height: '2.5rem'}

const ToolsPanel = ({ currentTool, handleSetTool, handleScaleUp, handleScaleDown, handleSaveMap }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            <Button
                className='btn-outline-light'
                style={BUTTON_STYLE}
                icon={faPen}
                isActived={currentTool == TOOLS.Pencil}
                handleOnClick={() => handleSetTool(TOOLS.Pencil)}
            />
            <Button
                className='btn-outline-light'
                style={BUTTON_STYLE}
                icon={faEraser}
                isActived={currentTool == TOOLS.Eraser}
                handleOnClick={() => handleSetTool(TOOLS.Eraser)}
            />
            <Button
                className='btn-outline-light'
                style={BUTTON_STYLE}
                icon={faFillDrip}
                isActived={currentTool == TOOLS.Bucket}
                handleOnClick={() => handleSetTool(TOOLS.Bucket)}
            />

            <hr/>

            <Button
                className='btn-outline-secondary'
                style={BUTTON_STYLE}
                icon={faFloppyDisk}
                handleOnClick={handleSaveMap}
            />
            
            <Button
                className='btn-outline-secondary'
                style={BUTTON_STYLE}
                icon={faMagnifyingGlassPlus}
                handleOnClick={handleScaleUp}
            />
            <Button
                className='btn-outline-secondary'
                style={BUTTON_STYLE}
                icon={faMagnifyingGlassMinus}
                handleOnClick={handleScaleDown}
            />
        </div>
    )
}

export default ToolsPanel