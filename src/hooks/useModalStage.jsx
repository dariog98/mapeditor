import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MODAL_MODE } from '../constants/tools'
import { schemaStage } from '../constants/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import useModal from './useModal'

const useModalStage = ({ handleAddStage }) => {
    const { show, handleOpen: handleOpenModal, handleClose } = useModal()
    const form = useForm({ resolver: yupResolver(schemaStage) })
    const [mode, setMode] = useState(MODAL_MODE.Add)

    const handleConfirm = async (data) => {
        const { id, title, backgroundColor, width, height } = data
        handleAddStage(id, title, backgroundColor, Number(width), Number(height))
        handleClose()
    }

    const handleOpen = (mode, stage) => {
        setMode(mode || MODAL_MODE.Add)
        form.reset({ 
            id: stage?.id,
            title: stage?.title,
            width: stage?.gridSize?.width,
            height: stage?.gridSize?.height
        })
        handleOpenModal()
    }

    return {
        show,
        handleOpen,
        handleClose,
        form: { ...form, mode, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useModalStage