import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App