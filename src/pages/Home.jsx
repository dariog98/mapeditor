import { faFileCirclePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../components/basics'
import { useRef } from 'react'
import { useFile, useModalMap } from '../hooks'
import { ModalMap } from '../components/home'

const Home = ({ handleCurrentTab }) => {
    const { handleLoadFile } = useFile({ handleCurrentTab })
    const hiddenInputFile = useRef()
    const modal = useModalMap({ handleCurrentTab })

    const handleLoadMapButton = () => {
        hiddenInputFile.current.click()
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='d-flex flex-column gap-3 align-items-center'>
                <div>MapEditor</div>

                <Button
                    className='btn-primary'
                    icon={faFileCirclePlus}
                    text='New map'
                    handleOnClick={modal.handleOpen}
                />

                <Button
                    className='btn-danger'
                    icon={faFilePen}
                    text='Load map'
                    handleOnClick={handleLoadMapButton}
                />

                <input className='d-none' type='file' ref={hiddenInputFile} accept='.json' onChange={handleLoadFile}/>
            </div>

            <ModalMap showModal={modal.show} form={modal.form} handleClose={modal.handleClose}/>
        </div>
    )
}

export default Home