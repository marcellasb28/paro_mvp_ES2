import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegistroPonto from './pages/RegistroPonto';
import Dashboard from './pages/Dashboard';
import CadastroMotorista from './pages/CadastroMotorista';
import MontagemRoteiro from './pages/MontagemRoteiro';
import Home from './pages/Home';
import MenuGerente from './components/MenuGerente';
import Parametrizacao from './pages/Parametrizacao';

function LayoutApp() {
  const location = useLocation();
  const rotasGerente = ['/dashboard', '/cadastro-motorista', '/montagem-roteiro', '/parametros'];
  const mostrarMenu = rotasGerente.includes(location.pathname);
  
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {mostrarMenu && <MenuGerente />}
      <div style={{ flex: 1, display: 'flex', backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motoboy" element={<RegistroPonto />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro-motorista" element={<CadastroMotorista />} />
          <Route path="/montagem-roteiro" element={<MontagemRoteiro />} />
          <Route path="/parametros" element={<Parametrizacao />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutApp />
    </Router>
  );
}

export default App;