// ═══════════════════════════════════════════════
// PROTOCOLO IAM — Backend de Cálculo
// Vercel Serverless Function
// Toda a lógica de pontuação fica aqui — nunca no front.
// ═══════════════════════════════════════════════

// ─── MODELOS DE PONTUAÇÃO ───────────────────────
// Cada modelo define quantos pontos cada letra vale.
// O usuário nunca vê isso.
const MODELOS = {
  A: { A: 4, B: 2, C: 5, D: 1, E: 3 },
  B: { A: 3, B: 5, C: 2, D: 4, E: 1 },
  C: { A: 2, B: 4, C: 3, D: 5, E: 1 },
};

// ─── DISTRIBUIÇÃO DOS MODELOS POR PILAR ────────
// Pilar 1→A, 2→B, 3→C, 4→A, 5→B, 6→C, 7→A, 8→B
// Cada pilar tem 3 perguntas — 8 pilares × 3 = 24 perguntas
const MODELO_POR_PERGUNTA = [
  'A','A','A', // Pilar 1 — Impacto Visual
  'B','B','B', // Pilar 2 — Presença em Interações
  'C','C','C', // Pilar 3 — Jogo Social
  'A','A','A', // Pilar 4 — Comunicação
  'B','B','B', // Pilar 5 — Magnetismo
  'C','C','C', // Pilar 6 — Direção de Vida
  'A','A','A', // Pilar 7 — Controle Emocional
  'B','B','B', // Pilar 8 — Energia Social
];

const PILARES = [
  'Impacto Visual',
  'Presença em Interações',
  'Jogo Social',
  'Comunicação',
  'Magnetismo',
  'Direção de Vida',
  'Controle Emocional',
  'Energia Social',
];

// ─── HANDLER ────────────────────────────────────
export default function handler(req, res) {

  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  const { respostas } = req.body;

  // Validação básica
  if (!Array.isArray(respostas) || respostas.length !== 24) {
    return res.status(400).json({ erro: 'Envie exatamente 24 respostas.' });
  }

  const letrasValidas = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < respostas.length; i++) {
    if (!letrasValidas.includes(respostas[i])) {
      return res.status(400).json({ erro: `Resposta inválida na posição ${i + 1}.` });
    }
  }

  // ─── CÁLCULO ──────────────────────────────────
  let scoreTotal = 0;
  const scoresPorPilar = new Array(8).fill(0);

  respostas.forEach((letra, idx) => {
    const modelo = MODELO_POR_PERGUNTA[idx];
    const pontos = MODELOS[modelo][letra];
    const pilarIdx = Math.floor(idx / 3);

    scoreTotal += pontos;
    scoresPorPilar[pilarIdx] += pontos;
  });

  // Converte cada pilar para 0–100
  // Máximo por pilar = 3 perguntas × 5 pontos = 15
  const pilaresPercentual = scoresPorPilar.map(s => Math.round((s / 15) * 100));

  // IAM = (score_total / 120) * 100
  const iam = Math.round((scoreTotal / 120) * 100);

  // ─── RESPOSTA ─────────────────────────────────
  return res.status(200).json({
    iam,
    scoreTotal,
    pilares: PILARES.map((nome, i) => ({
      nome,
      score: pilaresPercentual[i],
    })),
  });
}
