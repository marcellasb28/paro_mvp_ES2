const pool = require('../config/db');

exports.calcularCustoRoteiro = async (req, res) => {
  const { id } = req.params;
  
  try {
    // 1. Busca os dados do roteiro (distância) e do motorista (rendimento do veículo)
    const [roteiros] = await pool.query(`
      SELECT r.distancia_total, m.rendimento_km_litro
      FROM Roteiro r
      JOIN Motorista m ON r.motorista_id = m.id
      WHERE r.id = ?
    `, [id]);

    if (roteiros.length === 0) {
      return res.status(404).json({ error: 'Roteiro não encontrado.' });
    }

    const distancia = parseFloat(roteiros[0].distancia_total);
    const rendimentoVeiculo = parseFloat(roteiros[0].rendimento_km_litro);

    // 2. Busca os parâmetros globais do sistema de custos
    const [parametros] = await pool.query('SELECT * FROM Parametro LIMIT 1');
    const param = parametros[0];

    const valorCombustivel = parseFloat(param.valor_combustivel);
    const custoFixoPorKm = parseFloat(param.custo_por_km);
    const rendimentoPadrao = parseFloat(param.km_litro_veiculo);

    // Se o motorista não tiver um rendimento cadastrado, usamos o global do sistema
    const rendimentoCalculo = rendimentoVeiculo > 0 ? rendimentoVeiculo : rendimentoPadrao;

    // 3. Aplica a Regra de Negócio Matemática (RN07)
    const custoCombustivel = (distancia / rendimentoCalculo) * valorCombustivel;
    const custoFixo = distancia * custoFixoPorKm;
    const custoTotal = custoCombustivel + custoFixo;

    // 4. Salva o custo calculado de volta na tabela do Roteiro
    await pool.query('UPDATE Roteiro SET custo_estimado = ? WHERE id = ?', [custoTotal.toFixed(2), id]);

    res.json({
      message: 'Custo calculado com sucesso!',
      custo_estimado: custoTotal.toFixed(2),
      detalhes: {
        distancia: distancia,
        custoCombustivel: custoCombustivel.toFixed(2),
        custoFixo: custoFixo.toFixed(2)
      }
    });

  } catch (error) {
    console.error('Erro ao calcular custo do roteiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao calcular custos.' });
  }
};