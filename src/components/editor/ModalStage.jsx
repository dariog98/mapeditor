import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal, Select } from '../basics'
import { MODAL_MODE } from '../../constants/tools'
import { TILESETS } from '../../constants/tilesets'

const ModalStage = ({ showModal, handleClose, form }) => {
    return (
        <Modal show={showModal} title={form.mode == MODAL_MODE.Add ? 'Add stage' : 'Edit stage'} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <Input
                    form={form}
                    before='Id'
                    name='id'
                    type='text'
                />

                <Input
                    form={form}
                    before='Title'
                    name='title'
                    type='text'
                />

                <Select
                    form={form}
                    before='Tileset'
                    name='tilesetId'
                    options={Object.keys(TILESETS).map(key => ({ value: key, label: key }))}                    
                />

                <Input
                    form={form}
                    before='Background'
                    name='backgroundColor'
                    type='color'
                />

                <div className='d-flex gap-3'>
                    <Input
                        form={form}
                        before='Width'
                        name='width'
                        type='number'
                        placeholder='0'
                    />

                    <Input
                        form={form}
                        before='Height'
                        name='height'
                        type='number'
                        placeholder='0'
                    />
                </div>

                <div>
                    <div>Player</div>
                    <div className='d-flex gap-3'>
                        <Input
                            form={form}
                            before='X'
                            name='playerX'
                            type='number'
                            placeholder='0'
                        />

                        <Input
                            form={form}
                            before='Y'
                            name='playerY'
                            type='number'
                            placeholder='0'
                        />

                        <Input
                            form={form}
                            before='Layer'
                            name='playerLayer'
                            type='number'
                            placeholder='0'
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-end gap-3'>
                    <Button
                        className='btn-success'
                        text='Add'
                        icon={faCheck}
                        handleOnClick={form.handleSubmit}
                        //isLoading={isLoading}
                        //isDisabled={isLoading}
                    />

                    <Button
                        className='btn-danger'
                        text='Cancel'
                        icon={faX}
                        handleOnClick={handleClose}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ModalStage