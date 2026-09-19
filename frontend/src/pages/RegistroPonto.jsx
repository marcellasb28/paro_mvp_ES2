import { useState } from 'react';

export default function RegistroPonto() {
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
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--preto-chumbo)', fontSize: '24px', fontWeight: '900' }}>
          Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span>
        </h1>
        <p style={{ color: 'var(--cinza-texto)', fontSize: '14px' }}>Roteiro em andamento</p>
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