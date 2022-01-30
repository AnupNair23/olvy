import { useState, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { Footer, Navbar, Services } from './components'

function App() {


  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <Navbar />
      <Services />
      <div className='absolute bottom-1.5 left-1.5'>
        <Footer />
      </div>
    </div>
  )
}

export default App
