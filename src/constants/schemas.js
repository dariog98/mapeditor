import * as yup from 'yup'

const schemaStage = yup.object({
    id: yup.string().required(),
    title: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
})

export {
    schemaStage
}