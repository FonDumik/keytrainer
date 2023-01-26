import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Klavaogr = lazy(() => import('./Klavaogr/ui'))
const StartPage = lazy(() => import('./StartPage'))

const Routing = () => {
    return(
        <Routes>
            <Route path='/' element={<StartPage />}></Route>
            <Route path='/klavaogr' element={<Klavaogr />}></Route>
        </Routes>
    )
}

export default Routing