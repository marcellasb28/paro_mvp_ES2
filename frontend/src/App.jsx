import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroPonto from './pages/RegistroPonto';
import Dashboard from './pages/Dashboard'; // Importação nova

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<RegistroPonto />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;