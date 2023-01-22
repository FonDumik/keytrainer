import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const MainPage = lazy(() => import('./MainPage/ui'))

const Routing = () => {
    return(
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
        </Routes>
    )
}

export default Routing