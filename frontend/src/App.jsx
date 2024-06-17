import react from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ListProjects from './pages/ListProjects'
import ProjectView from './pages/ProjectView'
import ChatbotPage from './pages/ChatbotPage'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/list_projects" element={
            <ProtectedRoute>
              <ListProjects />
            </ProtectedRoute>
          } />
          {/* get the note date from the path */}
          <Route path="/project/:id" element={
            <ProtectedRoute>
              <ProjectView />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          } />
            
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
