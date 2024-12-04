import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal } from '../basics'

const ModalMap = ({ showModal, handleClose, form }) => {
    return (
        <Modal show={showModal} title='New map' handleClose={handleClose}>
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

                <div className='d-flex justify-content-end gap-3'>
                    <Button
                        className='btn-success'
                        text='Create'
                        icon={faCheck}
                        handleOnClick={form.handleSubmit}
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

export default ModalMap