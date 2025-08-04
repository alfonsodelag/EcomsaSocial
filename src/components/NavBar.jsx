import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './NavBar.css'

export default function NavBar() {
  const { user } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <h1 className="logo">ECOMSA Social</h1>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/clients">Clients</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/learning">Learning</NavLink></li>
        {user ? (
          <li><NavLink to="/profile">Profile</NavLink></li>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}
