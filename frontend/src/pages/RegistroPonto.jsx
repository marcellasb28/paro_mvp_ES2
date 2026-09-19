import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroPonto() {
  const navigate = useNavigate(); // 2. Inicie o hook do React Router
  const [chegada, setChegada] = useState(null);
  const [saida, setSaida] = useState(null);

  const registrarChegada = () => {
    setChegada(new Date().toLocaleTimeString());
    // Aqui depois chamaremos a rota do back-end para salvar no banco
  };

  const registrarSaida = () => {
    setSaida(new Date().toLocaleTimeString());
    // Aqui chamaremos a rota para atualizar a saída e calcular o tempo
  };

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: 'var(--preto-chumbo)', fontSize: '20px', fontWeight: '900' }}>
            Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span> | Rota
          </h1>
          <p style={{ color: 'var(--cinza-texto)', fontSize: '12px' }}>Registro de Paradas</p>
        </div>
        
        {/* 3. Adicione o botão de Sair aqui! */}
        <button 
          onClick={() => navigate('/')}
          style={{ 
            padding: '8px 15px', 
            backgroundColor: '#ff6b6b', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}
        >
          ⬅ Sair da Rota
        </button>
      </header>

      <section style={{ backgroundColor: 'var(--cinza-fundo)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '5px' }}>Ponto Atual: 4</h2>
        <p style={{ fontWeight: 'bold' }}>Av. João César, 1000</p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button 
          onClick={registrarChegada}
          disabled={chegada !== null}
          style={{
            padding: '18px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: chegada ? '#ccc' : 'var(--preto-chumbo)',
            border: 'none',
            borderRadius: '8px',
            cursor: chegada ? 'not-allowed' : 'pointer'
          }}
        >
          {chegada ? `Chegada: ${chegada}` : 'Registrar Chegada'}
        </button>

        <button 
          onClick={registrarSaida}
          disabled={chegada === null || saida !== null}
          style={{
            padding: '18px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: (chegada === null || saida !== null) ? '#ccc' : 'var(--laranja-paro)',
            border: 'none',
            borderRadius: '8px',
            cursor: (chegada === null || saida !== null) ? 'not-allowed' : 'pointer'
          }}
        >
          {saida ? `Saída: ${saida}` : 'Registrar Saída'}
        </button>
      </div>
    </div>
  );
}