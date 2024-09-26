import { faCircleChevronDown, faCircleChevronUp, faPlus, faLayerGroup, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LAYER_TYPES } from '../../constants/tools'

const TileLayers = ({ layers, stageId, currentLayer, currentStage, handleSetStageLayer, handleAddLayer }) => {
    return (
        <div>
            <div className='px-3 py-1 d-flex bg-body-tertiary align-items-center'>
                <div className='user-select-none flex-grow-1'>Layers</div>
                <div>
                    <div title='Add layer' className='icon-button' onClick={() => handleAddLayer(stageId)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
            </div>
            {
                layers?.length > 0 &&
                layers.map((_, layerIndex) => {
                    const isActive = stageId == currentStage && currentLayer.type == LAYER_TYPES.Tile && currentLayer.index == layerIndex
                    return (
                        <div
                            key={layerIndex}
                            className={`px-3 py-1 d-flex align-items-center ${isActive ? 'bg-success-subtle' : '' }`}
                        >
                            <div
                                className='flex-grow-1 d-flex align-items-center gap-2 cursor-pointer'
                                onClick={() => handleSetStageLayer(stageId, LAYER_TYPES.Tile, layerIndex)}
                            >
                                <FontAwesomeIcon icon={faLayerGroup}/>
                                <div className='user-select-none'>{layerIndex}</div>
                            </div>
                            <div className='d-flex gap-3'>
                                {
                                    layerIndex !== 0 &&
                                    <div className='icon-button'>
                                        <FontAwesomeIcon icon={faCircleChevronUp}/>
                                    </div>
                                }
                                {
                                    layerIndex !== layers.length - 1 &&
                                    <div className='icon-button'>
                                        <FontAwesomeIcon icon={faCircleChevronDown}/>
                                    </div>
                                }
                                <div className='icon-button'>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TileLayers