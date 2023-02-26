import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from './Home'
import Users from './Users'

function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
  )
}

export default AllRoutes