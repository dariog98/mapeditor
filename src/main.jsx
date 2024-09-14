import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/courier-prime'
import './bootstrap.css'
import './index.css'
import { EditorProvider } from './components/providers/EditorProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <EditorProvider>
            <App/>
        </EditorProvider>
    </React.StrictMode>
)
