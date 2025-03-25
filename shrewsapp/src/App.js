// type npm ci to rebuild the node modules if using different machine since node_modules are not committed

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage.js'
import Register from './pages/RegistrationPage.js'
import BookingPage from './pages/BookingPage.js'
import Dashboard from './pages/Dashboard.js'
import TenantProfile from './pages/TenantProfile.js'
import CookSettings from './pages/CookSettings.js'

import ProtectedRoute from './ProtectedRoute.js'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={["COOK"]} />}>
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["COOK"]} />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["COOK"]} />}>
          <Route path='/cook-settings' element={<CookSettings />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={["TENANT"]} />}>
          <Route path='/booking' element={<BookingPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["TENANT"]} />}>
          <Route path='/tenant-profile' element={<TenantProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App