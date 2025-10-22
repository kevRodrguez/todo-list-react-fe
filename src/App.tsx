
import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import TodosPage from './pages/todos'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoginForm } from './components/login-form'

function App() {

  return (
    <AuthProvider>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginForm />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/todos" element={<TodosPage />} />
        
      </Route>


      <Route path="/" element={<Navigate to="/todos" replace />} />
    
      {/* Redirigir a login todo otro tipo de ruta */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
      
    </AuthProvider>
  )
}

export default App
