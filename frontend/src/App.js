import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Protect from './components/Protect'
import UnAuthorized from './components/UnAuthorized'
import Admin from './pages/Admin'
import Moderator from './pages/Moderator'
import Super_Admin from './pages/Super_Admin'
import AuthRoute from './components/AuthRoute'

const App = () => {
  return (
    <Routes>
      {/*public routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* protected routes */}
      <Route element={<Protect />}>
        <Route path='/' element={<Home />} />

        <Route element={<AuthRoute role="Admin" />} >
          <Route path='/admin' element={<Admin />} />
        </Route>

        <Route element={<AuthRoute role="Moderator" />} >
          <Route path='/mod' element={<Moderator />} />
        </Route>

        <Route element={<AuthRoute role="Super Admin" />} >
          <Route path='/super-admin' element={<Super_Admin />} />
        </Route>

        <Route path='/unauthorized' element={<UnAuthorized />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App