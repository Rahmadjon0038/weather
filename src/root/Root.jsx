import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Week from '../pages/week/Week'
import NootFound from '../components/NootFound'
import Navbar from '../components/navbar/Navbar'
import Day from '../pages/month/Day'

function Root() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/week' element={<Week />} />
                <Route path='/day' element={<Day  />} />
                <Route path='/' element={<Navigate to={'home'} />} />
                <Route path='*' element={<NootFound />} />
            </Routes>
        </>
    )
}

export default Root
