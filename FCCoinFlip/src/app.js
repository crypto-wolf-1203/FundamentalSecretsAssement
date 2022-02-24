import React from 'react'
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'

import { Home } from './pages/Home'

export const App = () => {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Navigate to='/home' />}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  )
}
