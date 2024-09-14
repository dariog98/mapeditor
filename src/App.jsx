import { useState } from 'react'
import { TABS } from './constants/tabs'

const App = () => {
    const [currentTab, setCurrentTab] = useState('Home')
    const CurrentTab = TABS[currentTab]
    return <CurrentTab handleCurrentTab={setCurrentTab}/>
}

export default App
