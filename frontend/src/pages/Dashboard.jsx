import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Dados simulados do backend (minutos parados por dia)
const dadosGrafico = [
  { dia: '01/Set', minutos: 120 },
  { dia: '02/Set', minutos: 85 },
  { dia: '03/Set', minutos: 210 },
  { dia: '04/Set', minutos: 45 },
  { dia: '05/Set', minutos: 150 }
];

export default function Dashboard() {
  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: 'var(--preto-chumbo)', fontSize: '20px', fontWeight: '900' }}>
            Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span> | Painel
          </h1>
          <p style={{ color: 'var(--cinza-texto)', fontSize: '12px' }}>Visão Geral de Paradas</p>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--cinza-fundo)', padding: '15px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: 'var(--cinza-texto)' }}>Tempo Total (Mês)</p>
          <h3 style={{ fontSize: '22px', color: 'var(--preto-chumbo)' }}>610 min</h3>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFF3E0', padding: '15px', borderRadius: '8px', border: '1px solid var(--laranja-paro)' }}>
          <p style={{ fontSize: '12px', color: 'var(--laranja-paro)' }}>Custo Estimado</p>
          <h3 style={{ fontSize: '22px', color: 'var(--laranja-paro)' }}>R$ 345,00</h3>
        </div>
      </div>

      {/* Gráfico */}
      <div style={{ backgroundColor: '#fff', padding: '10px 0', borderRadius: '8px', border: '1px solid #eaeaea' }}>
        <h3 style={{ fontSize: '14px', margin: '0 0 15px 15px', color: 'var(--preto-chumbo)' }}>
          Tempo Parado (Últimos 5 dias)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dadosGrafico} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="dia" tick={{ fontSize: 12, fill: 'var(--cinza-texto)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--cinza-texto)' }} />
            <Tooltip cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="minutos" fill="var(--laranja-paro)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}