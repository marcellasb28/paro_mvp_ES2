const pool = require('../config/db');

exports.getResumoDashboard = async (req, res) => {
  try {
    const [linhasGrafico] = await pool.query(`
      SELECT DATE_FORMAT(data, '%d/%m') as dia, SUM(tempo_total_parado) as minutos 
      FROM Roteiro GROUP BY data ORDER BY data ASC LIMIT 5
    `);

    const [linhasTotal] = await pool.query(`
      SELECT SUM(tempo_total_parado) as total_minutos, SUM(custo_estimado) as total_custo FROM Roteiro
    `);

    // NOVA CONSULTA: Busca o histórico detalhado dos pontos (Exigência RF07)
    const [linhasHistorico] = await pool.query(`
      SELECT 
        ordem_roteiro, 
        endereco, 
        DATE_FORMAT(data_hora_chegada, '%H:%i:%s') as chegada, 
        DATE_FORMAT(data_hora_saida, '%H:%i:%s') as saida, 
        tempo_parado_calculado as tempo_parado
      FROM Ponto 
      WHERE roteiro_id = 1 
      ORDER BY ordem_roteiro ASC
    `);

    res.json({
      grafico: linhasGrafico,
      historico: linhasHistorico, // Enviando o histórico para o React
      resumo: {
        tempoMes: linhasTotal[0].total_minutos || 0,
        custoMes: linhasTotal[0].total_custo || 0
      }
    });
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};