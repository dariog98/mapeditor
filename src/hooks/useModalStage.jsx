import { useForm } from 'react-hook-form'
import useModal from './useModal'

const useModalStage = ({ handleAddStage }) => {
    const { show, handleOpen, handleClose } = useModal()
    const form = useForm({ /*resolver: yupResolver(schemaPatient)*/ })

    const handleConfirm = async (data) => {
        const { id, title, backgroundColor, width, height } = data
        handleAddStage(id, title, backgroundColor, Number(width), Number(height))
        handleClose()
    }

    return {
        show,
        handleOpen,
        handleClose,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useModalStage