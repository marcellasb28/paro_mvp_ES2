import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroPonto from './pages/RegistroPonto';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* A rota principal vai direto para a tela do Motoboy no MVP */}
          <Route path="/" element={<RegistroPonto />} />
          
          {/* Deixando o espaço pronto para a tela do Gerente */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;