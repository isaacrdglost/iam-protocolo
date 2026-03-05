// ═══════════════════════════════════════════════
// PROTOCOLO IAM — Backend de Cálculo v2.0
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

// ─── DISTRIBUIÇÃO DOS MODELOS POR PERGUNTA ────────
// Baseado nas perguntas embaralhadas do script.js
// Cada pilar tem 3 perguntas — 8 pilares × 3 = 24 perguntas
const MODELO_POR_PERGUNTA = [
  // PILAR 1 — Aparência & Impacto (perguntas 1-3)
  'A', 'B', 'C',
  
  // PILAR 2 — Atitude Dominante (perguntas 4-6)
  'A', 'B', 'C',
  
  // PILAR 3 — Jogo Social (perguntas 7-9)
  'C', 'A', 'B',
  
  // PILAR 4 — Presença Magnética (perguntas 10-12)
  'A', 'B', 'C',
  
  // PILAR 5 — Magnetismo Sexual (perguntas 13-15)
  'B', 'C', 'A',
  
  // PILAR 6 — Ambição & Status (perguntas 16-18)
  'C', 'A', 'B',
  
  // PILAR 7 — Controle Emocional (perguntas 19-21)
  'B', 'C', 'A',
  
  // PILAR 8 — Energia Sexual (perguntas 22-24)
  'A', 'B', 'C',
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
      return res.status(400).json({ 
        erro: `Resposta inválida na posição ${i + 1}. Recebido: "${respostas[i]}"` 
      });
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
