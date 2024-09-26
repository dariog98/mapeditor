import { faCircleChevronDown, faCircleChevronUp, faGrip, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LAYER_TYPES } from '../../constants/tools'

const CollisionLayers = ({ collisions, stageId, currentStage, currentLayer, handleSetStageLayer, handleAddCollisionLayer }) => {
    return (
        <div>
            <div className='px-3 py-1 d-flex bg-body-tertiary align-items-center'>
                <div className='user-select-none flex-grow-1'>Collisions</div>
                <div>
                    <div title='Add layer' className='icon-button' onClick={() => handleAddCollisionLayer(stageId)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
            </div>
            {
                collisions?.length > 0 &&
                collisions.map((_, layerIndex) => {
                    const isActive = stageId == currentStage && currentLayer.type == LAYER_TYPES.Collision && currentLayer.index == layerIndex
                    return (
                        <div
                            key={layerIndex}
                            className={`px-3 py-1 d-flex align-items-center ${isActive ? 'bg-success-subtle' : '' }`}
                        >
                            <div
                                className='flex-grow-1 d-flex align-items-center gap-2 cursor-pointer'
                                onClick={() => handleSetStageLayer(stageId, LAYER_TYPES.Collision, layerIndex)}
                            >
                                <FontAwesomeIcon icon={faGrip}/>
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
                                    layerIndex != collisions.length - 1 &&
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

export default CollisionLayers