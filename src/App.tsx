
import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import TodosPage from './pages/todos'

function App() {

  return (
    <Routes>
      <Route path="/todos" element={<TodosPage />} />

      <Route path="/" element={<Navigate to="/todos" replace />} />

    </Routes>
  )
}

export default App
