import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">ECOMSA Social</h1>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/clients">Clients</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/learning">Learning</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    </nav>
  )
}
