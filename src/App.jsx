import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Search from './pages/Search'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Learning from './pages/Learning'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard'
import { AuthContext } from './context/AuthContext'
import './App.css'

export default function App() {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/learning" element={<Learning />} />
          <Route
            path="/admin"
            element={
              user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  )
}
