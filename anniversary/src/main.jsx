import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import ScrollyPage from './pages/ScrollyPage.jsx'
import Anniversary2025Page from './pages/Anniversary2025Page.jsx'
import ValentinePage from './pages/ValentinePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ScrollyPage />} />
          <Route path="/anniversary-2025" element={<Anniversary2025Page />} />
          <Route path="/valentine" element={<ValentinePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
