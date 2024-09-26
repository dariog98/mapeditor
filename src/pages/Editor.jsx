
import { useModalStage } from '../hooks'
import { useEditorContext } from '../components/providers/EditorProvider'
import { Canvas, Layers, ModalStage, TilesPanel, ToolsPanel } from '../components/editor'

const Editor = () => {
    const editor = useEditorContext()
    const modalStage = useModalStage({ handleAddStage: editor.addNewStage })

    return (
        <div className='vh-100 vw-100 d-flex gap-4 p-4'>
            <ToolsPanel
                currentTool={editor.currentTool}
                handleSetTool={editor.handleSetTool}
                handleScaleUp={editor.handleScaleUp}
                handleScaleDown={editor.handleScaleDown}
                handleSaveMap={editor.handleSaveMap}
                showGridBorders={editor.showGridBorders}
                handleShowGridBorders={editor.toggleShowGridBorders}
            />

            <Canvas 
                map={editor.map}
                stageId={editor.currentStage}
                tileset={editor.getCurrentTileset()}
                scale={editor.scale}
                showGridBorders={editor.showGridBorders}
                currentLayer={editor.currentLayer}
                handleToolAction={editor.handleToolAction}
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

            <ModalStage
                showModal={modalStage.show}
                handleClose={modalStage.handleClose}
                form={modalStage.form}
            />
        </div>
    )
}

export default Editor