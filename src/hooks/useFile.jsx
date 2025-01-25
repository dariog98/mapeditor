import { useEditorContext } from '../components/providers/EditorProvider'

const useFile = ({ handleCurrentTab }) => {
    const editor = useEditorContext()

    const handleNewFile = () => {

    }

    const handleLoadFile = (event) => {
        const files = event.target.files

        if (files && files.length) {
            const file = files[0]

            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                const text = event.target.result
                const data = JSON.parse(text)
                editor.createNewMap(data?.id ?? 'unknown')
                Object.keys(data.stages).map(stageId => {
                    const { title, backgroundColor, gridSize, tilesetId, playerDefaults, layers, collisions, triggers, entities } = data.stages[stageId]
                    editor.addNewStage(
                        stageId,
                        title,
                        backgroundColor,
                        gridSize.width,
                        gridSize.height,
                        tilesetId,
                        playerDefaults,
                        layers,
                        collisions,
                        triggers,
                        entities
                    )
                })
                handleCurrentTab('Editor')
            }
            fileReader.readAsText(file)
        }
    }

    return {
        handleNewFile,
        handleLoadFile
    }
}

export default useFile