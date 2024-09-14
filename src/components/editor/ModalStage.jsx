import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal } from '../basics'

const ModalStage = ({ showModal, handleClose, form, isLoading }) => {
    return (
        <Modal show={showModal} title='Add stage' handleClose={handleClose}>
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

                <div className='d-flex gap-3'>
                    <Input
                        form={form}
                        before='Width'
                        name='width'
                        type='number'
                    />

                    <Input
                        form={form}
                        before='Height'
                        name='height'
                        type='number'
                    />
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