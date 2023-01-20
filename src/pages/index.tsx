import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const MainPage = lazy(() => import('./MainPage'))

const Routing = () => {
    return(
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
        </Routes>
    )
}

export default Routing