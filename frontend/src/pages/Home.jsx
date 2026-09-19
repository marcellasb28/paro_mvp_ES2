import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--preto-chumbo)', fontSize: '32px', fontWeight: '900' }}>
          Parô<span style={{ color: 'var(--laranja-paro)' }}>?</span>
        </h1>
        <p style={{ color: 'var(--cinza-texto)', fontSize: '16px' }}>Sabe quanto custou.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '300px' }}>
        <button 
          onClick={() => navigate('/motoboy')}
          style={{
            padding: '18px', fontSize: '16px', fontWeight: 'bold', color: '#fff',
            backgroundColor: 'var(--laranja-paro)', border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}
        >
          🛵 Entrar como Motoboy
        </button>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '18px', fontSize: '16px', fontWeight: 'bold', color: '#fff',
            backgroundColor: 'var(--preto-chumbo)', border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}
        >
          📊 Acesso Gerencial
        </button>
      </div>
    </div>
  );
}