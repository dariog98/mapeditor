import { createBrowserRouter } from 'react-router-dom'
import { Editor, Home } from './pages'
import APP_ROUTES from './constants/routes'

const Router = createBrowserRouter([
    {
        path: APP_ROUTES.Home,
        element: (
            <Home/>
        )
    },
])

export default Router