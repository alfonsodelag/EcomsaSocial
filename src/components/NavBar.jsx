import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './NavBar.css'

export default function NavBar() {
  const { user } = useContext(AuthContext)

  const employees = ['Alice Johnson', 'Bob Smith', 'Charlie Brown']
  const clients = ['Acme Corp', 'Globex Corporation', 'Soylent Corp']
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma']

  const [query, setQuery] = useState('')

  const results = query
    ? [
        ...employees
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => ({ type: 'Employee', name })),
        ...clients
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => ({ type: 'Client', name })),
        ...projects
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => ({ type: 'Project', name })),
      ]
    : []

  return (
    <nav className="navbar">
      <h1 className="logo">ECOMSA Social</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees, clients, projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && results.length > 0 && (
          <ul className="search-results">
            {results.map((result, index) => (
              <li key={index} className="search-result-item">
                {result.name} <span className="result-type">({result.type})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/clients">Clients</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/learning">Learning</NavLink></li>
        {user?.role === 'admin' && (
          <li><NavLink to="/admin">Admin</NavLink></li>
        )}
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
