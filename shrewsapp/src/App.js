// type npm ci to rebuild the node modules if using different machine since node_modules are not committed

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage.js'
// import Register from './pages/RegisterPage.js'
import BookingPage from './pages/BookingPage.js'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path='/register' element={<Register />} />  */}
        <Route path='/booking' element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App