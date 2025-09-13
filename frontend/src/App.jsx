import React from 'react'
import Navbar from './components/NavBar'
import HomePage from './pages/Homepage'
import ProductPage from './pages/ProductPage'
import { Route, Routes } from 'react-router-dom'
import { useThemeStore } from './store/useThemeStore'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const {theme} = useThemeStore()
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster />
    </div>
  )
} 
