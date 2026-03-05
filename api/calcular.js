// ═══════════════════════════════════════════════
// PROTOCOLO IAM — Backend de Cálculo v3.0
// Sistema de PESOS implementado
// ═══════════════════════════════════════════════

// ─── MODELOS DE PONTUAÇÃO ───────────────────────
const MODELOS = {
  A: { A: 4, B: 2, C: 5, D: 1, E: 3 },
  B: { A: 3, B: 5, C: 2, D: 4, E: 1 },
  C: { A: 2, B: 4, C: 3, D: 5, E: 1 },
};

// ─── DISTRIBUIÇÃO DOS MODELOS POR PERGUNTA ────────
const MODELO_POR_PERGUNTA = [
  'A', 'B', 'C',  // Pilar 1 — Aparência & Impacto
  'A', 'B', 'C',  // Pilar 2 — Atitude Dominante
  'C', 'A', 'B',  // Pilar 3 — Jogo Social
  'A', 'B', 'C',  // Pilar 4 — Presença Magnética
  'B', 'C', 'A',  // Pilar 5 — Magnetismo Sexual
  'C', 'A', 'B',  // Pilar 6 — Ambição & Status
  'B', 'C', 'A',  // Pilar 7 — Controle Emocional
  'A', 'B', 'C',  // Pilar 8 — Energia Sexual
];

const PILARES = [
  'Aparência & Impacto',
  'Atitude Dominante',
  'Jogo Social',
  'Presença Magnética',
  'Magnetismo Sexual',
  'Ambição & Status',
  'Controle Emocional',
  'Energia Sexual',
];

// ─── SISTEMA DE PESOS ────────────────────────────
const PESOS = {
  'Aparência & Impacto': 14,
  'Atitude Dominante': 18,
  'Jogo Social': 15,
  'Presença Magnética': 14,
  'Magnetismo Sexual': 18,
  'Ambição & Status': 13,
  'Controle Emocional': 9,
  'Energia Sexual': 5,
};

// ─── HANDLER ────────────────────────────────────
export default function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  const { respostas } = req.body;

  // Validação
  if (!Array.isArray(respostas) || respostas.length !== 24) {
    return res.status(400).json({ erro: 'Envie exatamente 24 respostas.' });
  }

  const letrasValidas = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < respostas.length; i++) {
    if (!letrasValidas.includes(respostas[i])) {
      return res.status(400).json({ 
        erro: `Resposta inválida na posição ${i + 1}.` 
      });
    }
  }

  // ─── CÁLCULO COM PESOS ──────────────────────────
  const scoresPorPilar = new Array(8).fill(0);

  // Calcular score bruto de cada pilar (0-15)
  respostas.forEach((letra, idx) => {
    const modelo = MODELO_POR_PERGUNTA[idx];
    const pontos = MODELOS[modelo][letra];
    const pilarIdx = Math.floor(idx / 3);
    scoresPorPilar[pilarIdx] += pontos;
  });

  // Converter cada pilar para 0-100
  const pilaresPercentual = scoresPorPilar.map(s => Math.round((s / 15) * 100));

  // Calcular IAM PONDERADO pelos pesos
  let iamPonderado = 0;
  pilaresPercentual.forEach((score, idx) => {
    const pilarNome = PILARES[idx];
    const peso = PESOS[pilarNome];
    iamPonderado += (score * peso) / 100;
  });
  const iam = Math.round(iamPonderado);

  // ─── ENCONTRAR PILAR PRIORITÁRIO ─────────────────
  const pilaresComDados = PILARES.map((nome, i) => ({
    nome,
    score: pilaresPercentual[i],
    peso: PESOS[nome],
  }));

  // Pilar prioritário = maior peso com score < 55
  let pilarPrioritario = pilaresComDados
    .filter(p => p.score < 55)
    .sort((a, b) => b.peso - a.peso)[0];

  // Se todos acima de 55, pegar o de menor score
  if (!pilarPrioritario) {
    pilarPrioritario = pilaresComDados
      .sort((a, b) => a.score - b.score)[0];
  }

  // ─── ENCONTRAR PILARES FORTES E GARGALOS ──────────
  const pilaresOrdenados = [...pilaresComDados].sort((a, b) => b.score - a.score);
  const pontosFortes = pilaresOrdenados.slice(0, 3).map(p => ({ nome: p.nome, score: p.score }));
  const gargalos = pilaresOrdenados.slice(-3).reverse().map(p => ({ nome: p.nome, score: p.score }));

  // ─── RESPOSTA ─────────────────────────────────
  return res.status(200).json({
    iam,
    pilares: PILARES.map((nome, i) => ({
      nome,
      score: pilaresPercentual[i],
      peso: PESOS[nome],
    })),
    pilarPrioritario: {
      nome: pilarPrioritario.nome,
      score: pilarPrioritario.score,
      peso: pilarPrioritario.peso,
    },
    pontosFortes,
    gargalos,
  });
}
