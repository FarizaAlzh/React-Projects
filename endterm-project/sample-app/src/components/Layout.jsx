import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="hero-card card">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
