import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext)
  const [age, setAge] = useState(user?.age || '')
  const [position, setPosition] = useState(user?.position || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [photo, setPhoto] = useState(user?.photo || '')
  const [preview, setPreview] = useState(user?.photo || '')
  if (!user) return <Navigate to="/login" replace />

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result.toString())
        setPreview(reader.result.toString())
      }
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateProfile({ age, position, bio, photo })
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <form onSubmit={handleSubmit}>
        {preview && (
          <img
            src={preview}
            alt="Profile"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          value={position}
          onChange={e => setPosition(e.target.value)}
          placeholder="Job Title"
        />
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Short biography"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
