import { useState } from 'react';

export default function RegistroPonto() {
  const [chegada, setChegada] = useState(null);
  const [saida, setSaida] = useState(null);
  const [loading, setLoading] = useState(false);

  // No sistema real, esse ID viria da lista de pontos do roteiro do dia.
  // Para o MVP, estamos fixando o ID 1 para testes.
  const pontoId = 1; 

  const registrarChegada = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3333/api/pontos/${pontoId}/chegada`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setChegada(new Date().toLocaleTimeString());
        alert('Chegada registrada com sucesso no sistema!');
      } else {
        alert('Falha ao registrar chegada.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const registrarSaida = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3333/api/pontos/${pontoId}/saida`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setSaida(new Date().toLocaleTimeString());
        alert('Saída registrada! Tempo parado calculado com sucesso.');
      } else {
        alert('Falha ao registrar saída.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, justifyContent: 'center' }}>
        <button 
          onClick={registrarChegada}
          disabled={chegada !== null || loading}
          style={{
            padding: '18px', fontSize: '16px', fontWeight: 'bold', color: '#fff',
            backgroundColor: (chegada !== null || loading) ? '#ccc' : 'var(--preto-chumbo)',
            border: 'none', borderRadius: '8px', cursor: (chegada !== null || loading) ? 'not-allowed' : 'pointer',
            transition: '0.3s'
          }}
        >
          {loading && !chegada ? 'Registrando...' : chegada ? `Chegada: ${chegada}` : 'Registrar Chegada'}
        </button>

        <button 
          onClick={registrarSaida}
          disabled={chegada === null || saida !== null || loading}
          style={{
            padding: '18px', fontSize: '16px', fontWeight: 'bold', color: '#fff',
            backgroundColor: (chegada === null || saida !== null || loading) ? '#ccc' : 'var(--laranja-paro)',
            border: 'none', borderRadius: '8px', cursor: (chegada === null || saida !== null || loading) ? 'not-allowed' : 'pointer',
            transition: '0.3s'
          }}
        >
          {loading && chegada && !saida ? 'Registrando...' : saida ? `Saída: ${saida}` : 'Registrar Saída'}
        </button>
      </div>
    </div>
  );
}