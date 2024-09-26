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
                    const stage = data.stages[stageId]
                    editor.addNewStage(
                        stageId,
                        stage.title,
                        stage.backgroundColor,
                        stage.gridSize.width,
                        stage.gridSize.height,
                        stage.tilesetId,
                        stage.layers,
                        stage.collisions
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