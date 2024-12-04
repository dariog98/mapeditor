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
        const { id, title, backgroundColor, width, height, tilesetId, layers, collisions, triggers, playerX, playerY, playerLayer } = data
        const player = { position: { x: playerX ?? 0, y: playerY ?? 0 }, layer: playerLayer ?? 1 }
        handleAddStage(id, title, backgroundColor, Number(width), Number(height), tilesetId, player, layers, collisions, triggers)
        handleClose()
    }

    const handleOpen = (mode, stage) => {
        setMode(mode || MODAL_MODE.Add)
        form.reset({ 
            id: stage?.id,
            title: stage?.title,
            width: stage?.gridSize?.width,
            height: stage?.gridSize?.height,
            tilesetId: stage?.tilesetId,
            backgroundColor: stage?.backgroundColor,
            layers: stage?.layers,
            collisions: stage?.collisions,
            triggers: stage?.triggers,
            playerX: stage?.player?.position?.x,
            playerY: stage?.player?.position?.y,
            playerLayer: stage?.player?.layer,
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