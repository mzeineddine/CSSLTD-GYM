import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NoSidebarLayout from './components/NoSideBarLayout'
import WithSidebarLayout from './components/WithSideBarLayout'


function App() {
  return (
      <Routes>
        <Route element={<NoSidebarLayout />}>
          <Route path='/' element={<Login />} />
        </Route>

        <Route element={<WithSidebarLayout />}>
          <Route path="/home" element={<Dashboard />} />
          {/* <Route path="/member" element={<Member />} /> */}
          {/* <Route path="/home" element={<Calendar />} /> */}
          {/* <Route path="/staff" element={<Staff />} /> */}
          {/* <Route path="/balance" element={<Balance />} /> */}
          {/* <Route path="/expense" element={<Expense />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
  )
}

export default App
