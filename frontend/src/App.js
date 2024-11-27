import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Protect from './components/Protect'

const App = () => {
  return (
    <Routes>
      {/*public routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* protected routes */}
      <Route element={<Protect />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App