import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage.js'
import Register from './pages/RegisterPage.js'

function App () {
  const [backendData, setBackendData] = useState ([{}])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/register' element={<Register />}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App