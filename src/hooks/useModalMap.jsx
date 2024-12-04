import { useForm } from 'react-hook-form'
import { schemaMap } from '../constants/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEditorContext } from '../components/providers/EditorProvider'
import useModal from './useModal'

const useModalStage = ({ handleCurrentTab }) => {
    const editor = useEditorContext()
    const { show, handleOpen: handleOpenModal, handleClose } = useModal()
    const form = useForm({ resolver: yupResolver(schemaMap) })

    const handleConfirm = async (data) => {
        editor.createNewMap(data?.id, data?.title)
        handleCurrentTab('Editor')
    }

    const handleOpen = () => {
        form.reset({})
        handleOpenModal()
    }

    return {
        show,
        handleOpen,
        handleClose,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useModalStage