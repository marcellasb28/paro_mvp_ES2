import { Link, useLocation } from 'react-router-dom';

export default function MenuGerente() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    color: location.pathname === path ? '#fff' : 'var(--cinza-texto)',
    backgroundColor: location.pathname === path ? 'var(--laranja-paro)' : 'transparent',
    whiteSpace: 'nowrap' // Evita que o texto de um mesmo botão quebre ao meio
  });

  return (
    <nav style={{ 
      backgroundColor: 'var(--preto-chumbo)', 
      padding: '15px 20px', 
      display: 'flex', 
      flexWrap: 'wrap', // Permite que os botões desçam para a próxima linha se faltar espaço
      justifyContent: 'center', // Centraliza os itens para o layout ficar equilibrado
      gap: '15px', 
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <span style={{ color: '#fff', fontWeight: '900', fontSize: '18px', marginRight: 'auto' }}>
        Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span>
      </span>
      <Link to="/dashboard" style={linkStyle('/dashboard')}>Painel</Link>
      <Link to="/cadastro-motorista" style={linkStyle('/cadastro-motorista')}>Novo Motorista</Link>
      <Link to="/montagem-roteiro" style={linkStyle('/montagem-roteiro')}>Montar Roteiro</Link>
      <Link to="/parametros" style={linkStyle('/parametros')}>Configurações</Link>
      <Link to="/" style={{ textDecoration: 'none', color: '#ff6b6b', fontWeight: 'bold', marginLeft: '10px' }}>Sair</Link>
    </nav>
  );
}