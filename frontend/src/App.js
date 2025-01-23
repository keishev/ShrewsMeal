import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage.js'
import Register from './pages/RegisterPage.js'
import Booking from './pages/BookingPage.js'

function App () {
  const [backendData, setBackendData] = useState ([{}])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/register' element={<Register />}> </Route>
        <Route path='/booking' element={<Booking />}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App