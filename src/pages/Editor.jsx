
import { useModalStage } from '../hooks'
import { useEditorContext } from '../components/providers/EditorProvider'
import { Canvas, Layers, ModalStage, TilesPanel, ToolsPanel } from '../components/editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const Editor = () => {
    const editor = useEditorContext()
    const modalStage = useModalStage({ handleAddStage: editor.addNewStage })

    return (
        <div className='vh-100 vw-100 d-flex flex-column px-4'>
            <div className='d-flex align-items-center gap-3' style={{ minHeight: '3rem' }}>
                <div className='user-select-none d-flex align-items-center gap-2'>
                    <FontAwesomeIcon icon={faMap}/>
                    {`${editor.map.title ?? 'Unknown'} (id: ${editor.map.id})`}
                </div>

                <ToolsPanel
                    currentTool={editor.currentTool}
                    handleSetTool={editor.handleSetTool}
                    handleScaleUp={editor.handleScaleUp}
                    handleScaleDown={editor.handleScaleDown}
                    handleSaveMap={editor.handleSaveMap}
                    showGridBorders={editor.showGridBorders}
                    handleShowGridBorders={editor.toggleShowGridBorders}
                />
            </div>

            <div className='d-flex gap-4' style={{ maxHeight: 'calc(100vh - 4rem)'}}>
            <Canvas 
                map={editor.map}
                stageId={editor.currentStage}
                tileset={editor.getCurrentTileset()}
                scale={editor.scale}
                offset ={editor.offset}
                showGridBorders={editor.showGridBorders}
                currentLayer={editor.currentLayer}
                handleToolAction={editor.handleToolAction}
                handleOffset={editor.handleOffset}
            />

            <TilesPanel
                tileset={editor.getCurrentTileset()}
                currentTile={editor.currentTile}
                handleSetTile={editor.handleSetTile}
            />

            <Layers
                map={editor.map}
                currentStage={editor.currentStage}
                currentLayer={editor.currentLayer}
                handleSetStageLayer={editor.handleSetStageLayer}
                handleModalStageOpen={modalStage.handleOpen}
                handleDeleteStage={editor.handleDeleteStage}
                handleAddLayer={editor.handleAddLayer}
            />
            </div>

            <ModalStage
                showModal={modalStage.show}
                handleClose={modalStage.handleClose}
                form={modalStage.form}
            />
        </div>
    )
}

export default Editor