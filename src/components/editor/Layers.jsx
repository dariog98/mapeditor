import { faPen, faPlus, faMap, faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../basics'
import { MODAL_MODE } from '../../constants/tools'
import TileLayers from './TileLayers'
import CollisionLayers from './CollisionLayers'

const Layers = ({ map, currentStage, currentLayer, handleModalStageOpen, handleSetStageLayer, handleDeleteStage, handleAddLayer }) => {
    return (
        <div className='d-flex flex-column gap-3 overflow-auto' style={{ minWidth: '300px' }}>
            <div className='user-select-none d-flex align-items-center gap-2'>
                <FontAwesomeIcon icon={faMap}/>
                {map?.id}
            </div>

            <Button
                className='btn-primary'
                icon={faPlus}
                text='Add Stage'
                handleOnClick={handleModalStageOpen}
            />

            <div className='d-flex flex-column gap-3'>
                {
                    map?.stages &&
                    Object.keys(map.stages).map(id => { 
                        const stage = map.stages[id]
                        return (
                            <div key={stage.id} className='border'>
                                <div className='px-3 py-1 bg-secondary-subtle d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center gap-2 user-select-none'>
                                        <FontAwesomeIcon icon={faMapLocation}/>
                                        {`${stage.title} (id: ${stage.id})`}
                                    </div>
                                    <div className='d-flex gap-3'>
                                        <div
                                            className='icon-button'
                                            title='Edit stage'
                                            onClick={() => handleModalStageOpen(MODAL_MODE.Edit, stage)}>
                                            <FontAwesomeIcon icon={faPen}/>
                                        </div>
                                    </div>
                                </div>
                                <TileLayers
                                    stageId={id}
                                    layers={stage.layers}
                                    currentLayer={currentLayer}
                                    currentStage={currentStage}
                                    handleSetStageLayer={handleSetStageLayer}
                                    handleAddLayer={handleAddLayer}
                                />
                                <CollisionLayers
                                    stageId={id}
                                    collisions={stage.collisions}
                                    currentLayer={currentLayer}
                                    currentStage={currentStage}
                                    handleSetStageLayer={handleSetStageLayer}
                                    handleAddLayer={handleAddLayer}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Layers