import * as yup from 'yup'

const schemaMap = yup.object({
    id: yup.string().required(),
    title: yup.string().required(),
})

const schemaStage = yup.object({
    id: yup.string().required(),
    title: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
})

export {
    schemaMap,
    schemaStage
}