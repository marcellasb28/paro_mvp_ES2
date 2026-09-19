import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [resumo, setResumo] = useState({ tempoMes: 0, custoMes: 0 });
  const [loading, setLoading] = useState(true);
  const [calculando, setCalculando] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3333/api/dashboard/resumo');
      if (response.ok) {
        const data = await response.json();
        setDadosGrafico(data.grafico);
        setHistorico(data.historico);
        setResumo(data.resumo);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    carregarDados();
  }, [carregarDados]);

  const calcularCustoFinal = async () => {
    setCalculando(true);
    try {
      const response = await fetch('http://localhost:3333/api/roteiros/1/calcular-custo', {
        method: 'PUT'
      });
      if (response.ok) {
        alert('Custo recalculado com sucesso com base na distância e combustível!');
        await carregarDados(); 
      }
    } catch (error) {
      // Correção do 'no-unused-vars': agora a variável error está sendo utilizada
      console.error('Erro de conexão na API de cálculo:', error);
      alert('Erro ao calcular custos.');
    } finally {
      setCalculando(false);
    }
  };

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: 'var(--preto-chumbo)', fontSize: '20px', fontWeight: '900' }}>
            Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span> | Painel
          </h1>
          <p style={{ color: 'var(--cinza-texto)', fontSize: '12px' }}>Visão Geral de Paradas</p>
        </div>
        
        {/* BOTÃO DE CÁLCULO FINANCEIRO */}
        <button 
          onClick={calcularCustoFinal}
          disabled={calculando}
          style={{
            backgroundColor: 'var(--preto-chumbo)', color: '#fff', border: 'none',
            padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          {calculando ? 'Calculando...' : 'Calcular Custo do Roteiro'}
        </button>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando painel...</p>
      ) : (
        <>
          {/* Cards de Resumo */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <div style={{ flex: 1, backgroundColor: 'var(--cinza-fundo)', padding: '15px', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: 'var(--cinza-texto)' }}>Tempo Total</p>
              <h3 style={{ fontSize: '22px', color: 'var(--preto-chumbo)' }}>{resumo.tempoMes} min</h3>
            </div>
            <div style={{ flex: 1, backgroundColor: '#FFF3E0', padding: '15px', borderRadius: '8px', border: '1px solid var(--laranja-paro)' }}>
              <p style={{ fontSize: '12px', color: 'var(--laranja-paro)' }}>Custo Estimado</p>
              <h3 style={{ fontSize: '22px', color: 'var(--laranja-paro)' }}>
                R$ {Number(resumo.custoMes).toFixed(2).replace('.', ',')}
              </h3>
            </div>
          </div>

          {/* Gráfico */}
          <div style={{ backgroundColor: '#fff', padding: '10px 0', borderRadius: '8px', border: '1px solid #eaeaea', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 15px 15px', color: 'var(--preto-chumbo)' }}>Tempo Parado (Por dia)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dadosGrafico} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="minutos" fill="var(--laranja-paro)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* NOVO: Tabela de Histórico (RF07) */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '14px', margin: '15px', color: 'var(--preto-chumbo)' }}>Histórico de Paradas do Dia</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead style={{ backgroundColor: 'var(--cinza-fundo)' }}>
                <tr>
                  <th style={{ padding: '10px 15px' }}>Ponto</th>
                  <th style={{ padding: '10px 15px' }}>Endereço</th>
                  <th style={{ padding: '10px 15px' }}>Chegada</th>
                  <th style={{ padding: '10px 15px' }}>Saída</th>
                  <th style={{ padding: '10px 15px' }}>Tempo</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item, index) => (
                  <tr key={index} style={{ borderTop: '1px solid #eaeaea' }}>
                    <td style={{ padding: '10px 15px', fontWeight: 'bold' }}>{item.ordem_roteiro}</td>
                    <td style={{ padding: '10px 15px' }}>{item.endereco}</td>
                    <td style={{ padding: '10px 15px' }}>{item.chegada || '--'}</td>
                    <td style={{ padding: '10px 15px' }}>{item.saida || '--'}</td>
                    <td style={{ padding: '10px 15px', color: 'var(--laranja-paro)', fontWeight: 'bold' }}>
                      {item.tempo_parado} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}