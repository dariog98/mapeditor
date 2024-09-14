import { faPlus, faLayerGroup, faMap, faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../basics'

const Layers = ({ map, currentStage, currentLayer, handleModalStageOpen, handleSetStageLayer }) => {
    return (
        <div className='d-flex flex-column gap-3' style={{ width: '20%' }}>
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
                    Object.keys(map.stages).map(stageId => { 
                        const stage = map.stages[stageId]
                        return (
                            <div key={stageId} className='rounded-3'>
                                <div className='border px-3 py-1 bg-secondary-subtle user-select-none d-flex align-items-center gap-2'>
                                    <FontAwesomeIcon icon={faMapLocation}/>
                                    {`${stage.name} (id: ${stageId})`}
                                </div>
                                <>
                                    {
                                        stage.layers.map((layer, index) => {
                                            const isActive = stageId == currentStage && index == currentLayer
                                            return (
                                                <div
                                                    key={index}
                                                    className={`border px-3 py-1 cursor-pointer d-flex align-items-center gap-2 ${isActive ? 'bg-success-subtle' : '' }`}
                                                    onClick={() => handleSetStageLayer(stageId, index)}
                                                >
                                                    <FontAwesomeIcon icon={faLayerGroup}/>
                                                    <div className='user-select-none'>{index}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Layers