(function () {
  // ─── CONSTANTES ─────────────────────────────
  const PILARES = [
    'Aparência & Impacto', 'Atitude Dominante', 'Jogo Social',
    'Presença Magnética', 'Magnetismo Sexual', 'Ambição & Status',
    'Controle Emocional', 'Energia Sexual',
  ];

  // ─── CARREGAR DADOS ──────────────────────────
  let resultado;
  try { resultado = JSON.parse(localStorage.getItem('iamResult')); } catch (e) { /* noop */ }

  if (!resultado || !resultado.totalScore || !Array.isArray(resultado.pillarScores)) {
    window.location.href = 'index.html';
    return;
  }

  const { name, totalScore, pillarScores, pontosFortes, gargalos, pilarPrioritario } = resultado;

  // ─── CLASSIFICAÇÃO ───────────────────────────
  function getClass(score) {
    if (score >= 85) return { label: 'Presença Magnética',        color: '#10b981' };
    if (score >= 70) return { label: 'Alto Potencial',            color: '#3b82f6' };
    if (score >= 55) return { label: 'Potencial em Desenvolvimento', color: '#f59e0b' };
    if (score >= 40) return { label: 'Presença Fraca',            color: '#f97316' };
    return               { label: 'Invisível Social',             color: '#ef4444' };
  }

  const cl = getClass(totalScore);

  // ─── NOME ────────────────────────────────────
  const nomeEl = document.getElementById('resultadoNome');
  if (nomeEl) nomeEl.textContent = name + ', aqui está seu diagnóstico completo';

  // ─── CLASSIFICAÇÃO ───────────────────────────
  const classEl = document.getElementById('classificacao');
  if (classEl) {
    classEl.textContent = cl.label;
    classEl.style.color = cl.color;
    classEl.style.borderColor = cl.color;
  }

  // ─── SCORE ANIMADO ───────────────────────────
  const scoreEl    = document.getElementById('scoreNumber');
  const progressEl = document.getElementById('scoreProgress');
  const CIRCUM     = 263.89;

  if (progressEl) {
    progressEl.style.stroke = cl.color;
    progressEl.style.strokeDashoffset = String(CIRCUM);
  }

  if (scoreEl && progressEl) {
    const startTime = performance.now();
    const DURATION  = 2000;
    function animate(now) {
      const t = Math.min((now - startTime) / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      scoreEl.textContent = Math.round(ease * totalScore);
      progressEl.style.strokeDashoffset = String(CIRCUM - CIRCUM * ease * totalScore / 100);
      if (t < 1) requestAnimationFrame(animate);
      else scoreEl.textContent = totalScore;
    }
    requestAnimationFrame(animate);
  }

  // ─── RADAR CHART ─────────────────────────────
  if (window.Chart && pillarScores) {
    const ctx = document.getElementById('radarChart');
    if (ctx) {
      new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
          labels: PILARES.map(p => p.split(' & ')[0]),
          datasets: [{
            data: pillarScores,
            backgroundColor: 'rgba(41,82,163,0.15)',
            borderColor: 'rgba(41,82,163,0.8)',
            borderWidth: 2,
            pointBackgroundColor: '#2952a3',
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              min: 0, max: 100,
              ticks: { display: false },
              grid: { color: 'rgba(255,255,255,0.05)' },
              pointLabels: { color: '#8a92a4', font: { size: 11 } },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    }
  }

  // ─── PILARES LIST ─────────────────────────────
  const pilaresListEl = document.getElementById('pilaresList');
  if (pilaresListEl && pillarScores) {
    pillarScores.forEach((score, i) => {
      const item = document.createElement('div');
      item.className = 'pilar-item';
      item.innerHTML =
        `<span class="pilar-item-nome">${PILARES[i]}</span>` +
        `<span class="pilar-item-score">${score}</span>`;
      pilaresListEl.appendChild(item);
    });
  }

  // ─── PONTOS FORTES & GARGALOS ─────────────────
  // Recalcula localmente se não veio no payload
  const pilaresOrdenados = PILARES
    .map((nome, i) => ({ nome, score: pillarScores[i] }))
    .sort((a, b) => b.score - a.score);

  const fortes = pontosFortes || pilaresOrdenados.slice(0, 3);
  const fracos  = gargalos    || pilaresOrdenados.slice(-3).reverse();

  const fortesEl   = document.getElementById('pontosFortes');
  const gargalosEl = document.getElementById('gargalos');

  if (fortesEl) {
    fortes.forEach(p => {
      const el = document.createElement('div');
      el.className = 'card-lista-item';
      el.innerHTML = `<strong>${p.nome}</strong> — ${p.score}/100`;
      fortesEl.appendChild(el);
    });
  }

  if (gargalosEl) {
    fracos.forEach(p => {
      const el = document.createElement('div');
      el.className = 'card-lista-item';
      el.innerHTML = `<strong>${p.nome}</strong> — ${p.score}/100`;
      gargalosEl.appendChild(el);
    });
  }

  // ─── DIAGNÓSTICO ──────────────────────────────
  const diagBox = document.getElementById('diagnosticoBox');
  if (diagBox) {
    let msg;
    if (totalScore >= 70) {
      msg = 'você possui um nível sólido de atratividade comportamental. Existem pilares que, quando otimizados, vão elevar sua percepção para o próximo nível.';
    } else if (totalScore >= 50) {
      msg = 'você está na média — o que significa que você não se destaca. As pessoas percebem você, mas raramente de forma intensa o suficiente para agir.';
    } else {
      msg = 'sua presença está abaixo do limiar de atração. Isso não é sobre aparência. São padrões comportamentais que podem ser corrigidos com o protocolo certo.';
    }
    diagBox.innerHTML =
      `<h3 class="diagnostico-titulo">Você está em: ${cl.label}</h3>` +
      `<p class="diagnostico-texto">Seu índice IAM de <strong>${totalScore}/100</strong> indica que ${msg}</p>`;
  }

  // ─── ANÁLISE POR PILAR ────────────────────────
  const analiseEl = document.getElementById('analiseSuperficial');
  if (analiseEl && pillarScores) {
    const html = pillarScores.map((score, i) => {
      const nivel = score >= 70 ? 'Ponto forte' : score >= 45 ? 'Em desenvolvimento' : 'Gargalo crítico';
      const cor   = score >= 70 ? '#10b981'     : score >= 45 ? '#f59e0b'            : '#ef4444';
      return `<div class="pilar-analise">
        <div class="pilar-analise-titulo" style="display:flex;justify-content:space-between;align-items:center">
          <span>${PILARES[i]}</span>
          <span style="font-size:0.75rem;color:${cor}">${nivel} · ${score}/100</span>
        </div>
        <div class="pilar-analise-texto">
          ${getPilarTexto(PILARES[i], score)}
        </div>
      </div>`;
    }).join('');
    analiseEl.innerHTML = html;
  }

  // ─── PILAR PRIORITÁRIO ────────────────────────
  const prioritarioEl = document.getElementById('pilarPrioritario');
  const pp = pilarPrioritario || fracos[0];
  if (prioritarioEl && pp) {
    prioritarioEl.innerHTML =
      `<div class="prioritario-label">Foco principal agora</div>` +
      `<h3 class="prioritario-titulo">${pp.nome}</h3>` +
      `<p class="prioritario-texto">Este é o pilar com maior impacto no seu resultado agora. ` +
      `Seu score atual é <strong>${pp.score}/100</strong>. ` +
      `Corrigir este pilar primeiro vai gerar o maior salto no seu índice IAM.</p>`;
  }

  // ─── TEXTOS POR PILAR ─────────────────────────
  function getPilarTexto(nome, score) {
    const alto = score >= 70;
    const map = {
      'Aparência & Impacto': alto
        ? 'Sua aparência já comunica intenção. Você entende que visual é linguagem.'
        : 'Sua aparência ainda não está comunicando o que você é. Pequenos ajustes de estilo e cuidado pessoal têm alto retorno de percepção.',
      'Atitude Dominante': alto
        ? 'Você ocupa espaço com naturalidade. Seu contato visual e posicionamento social transmitem confiança.'
        : 'Você cede espaço com frequência — em conversas, em grupos, em situações de pressão. Isso reduz sua percepção de valor.',
      'Jogo Social': alto
        ? 'Sua rede social funciona como amplificador de status. Você sabe circular e conectar pessoas.'
        : 'Seu jogo social está limitado. Isso reduz oportunidades e diminui sua percepção de status no ambiente.',
      'Presença Magnética': alto
        ? 'Sua voz, ritmo e expressão corporal trabalham a seu favor. As pessoas prestam atenção quando você fala.'
        : 'Sua presença verbal e corporal não está criando impacto. Voz baixa, ritmo acelerado e postura fechada drenam atração.',
      'Magnetismo Sexual': alto
        ? 'Você cria tensão de forma calibrada. Há atração percebida nas suas interações.'
        : 'Você não está criando tensão sexual nas interações. As conversas ficam no campo da amizade ou neutralidade.',
      'Ambição & Status': alto
        ? 'Você projeta direção e propósito. Isso aumenta sua percepção de valor a médio e longo prazo.'
        : 'Falta clareza de direção visível. Sem propósito percebido, seu status social não cresce.',
      'Controle Emocional': alto
        ? 'Você mantém compostura sob pressão. Isso é raramente encontrado e altamente valorizado.'
        : 'Sua reatividade emocional está visível. Isso diminui percepção de solidez e segurança.',
      'Energia Sexual': alto
        ? 'Sua energia é percebida no ambiente. Você altera a dinâmica dos espaços que ocupa.'
        : 'Sua energia está baixa ou opaca. As pessoas não sentem sua presença como força — ela passa despercebida.',
    };
    return map[nome] || '';
  }
})();
