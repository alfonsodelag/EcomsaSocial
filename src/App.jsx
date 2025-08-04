import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Search from './pages/Search'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Learning from './pages/Learning'
import Profile from './pages/Profile'
import './App.css'

export default function App() {
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}
