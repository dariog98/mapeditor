import { faFileCirclePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../components/basics'
import { useRef } from 'react'
import { useEditorContext } from '../components/providers/EditorProvider'

const Home = ({ handleCurrentTab }) => {
    const editor = useEditorContext()
    const hiddenInputFile = useRef()

    const handleLoadMapButton = () => {
        hiddenInputFile.current.click()
    }

    const handleInputFile = (event) => {
        const files = event.target.files

        if (files && files.length) {
            const file = files[0]

            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                const text = event.target.result
                const data = JSON.parse(text)
                editor.createNewMap(data?.id ?? 'unknow')
                Object.keys(data.stages).map(stageId => {
                    const stage = data.stages[stageId]
                    editor.addNewStage(stageId, stage.name, stage.backgroundColor, stage.gridSize.width, stage.gridSize.height, stage.tilesetId, stage.layers)
                })
                handleCurrentTab('Editor')
            }
            fileReader.readAsText(file)
        }
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='d-flex flex-column gap-3 align-items-center'>
                <div>MapEditor</div>

                <Button
                    className='btn-primary'
                    icon={faFileCirclePlus}
                    text='New map'
                />

                <Button
                    className='btn-danger'
                    icon={faFilePen}
                    text='Load map'
                    handleOnClick={handleLoadMapButton}
                />

                <input className='d-none' type='file' ref={hiddenInputFile} accept='.json' onChange={handleInputFile}/>
            </div>
        </div>
    )
}

export default Home