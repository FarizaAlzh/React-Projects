import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Items from './pages/Items'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="items" element={<Items />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<ProtectedRoute><div style={{padding:20}}>Profile (protected)</div></ProtectedRoute>} />
    </Route>
  </Routes>
)

export default App
