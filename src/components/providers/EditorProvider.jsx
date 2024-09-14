import { createContext, useContext } from 'react'
import { useEditor } from '../../hooks'

const editorContext = createContext()

const EditorProvider = ({ children }) => {
    const editorController = useEditor()

    return (
        <editorContext.Provider value={editorController}>
            {children}
        </editorContext.Provider>
    )
}

const useEditorContext = () => {
    return useContext(editorContext)
}

export { EditorProvider, useEditorContext }