/* ═══════════════════════════════════════════════
   PROTOCOLO IAM — QUIZ ENGINE
   ═══════════════════════════════════════════════ */

const IAM = (() => {

  /* ─── PILARES ─── */
  const PILLARS = [
    "Aparência & Impacto",
    "Atitude Dominante",
    "Jogo Social",
    "Presença Magnética",
    "Magnetismo",
    "Ambição & Status",
    "Controle Emocional",
    "Energia"
  ];

  /* ─── PERGUNTAS (24 — 3 por pilar) ─── */
  const QUESTIONS = [
    /* PILAR 0 — Aparência & Impacto */
    {
      p: 0,
      q: "Quando você entra em um lugar novo, o que costuma acontecer?",
      o: [
        { t: "Passo completamente despercebido", s: 1 },
        { t: "Algumas pessoas notam, mas a maioria não", s: 2 },
        { t: "Costumo chamar atenção sem fazer nada especial", s: 4 },
        { t: "O ambiente responde quando eu entro", s: 5 }
      ]
    },
    {
      p: 0,
      q: "Sua relação com cuidado pessoal e apresentação no dia a dia é:",
      o: [
        { t: "Faço o básico quando lembro", s: 1 },
        { t: "Cuido mais quando tem algo importante", s: 2 },
        { t: "Tenho uma rotina consistente de cuidado", s: 4 },
        { t: "Minha apresentação é intencional — parte de como quero ser lido", s: 5 }
      ]
    },
    {
      p: 0,
      q: "Em situações sociais, como é sua postura e ocupação de espaço?",
      o: [
        { t: "Tendo a me encolher e ocupar pouco espaço", s: 1 },
        { t: "Normal — nem muito fechado, nem muito aberto", s: 3 },
        { t: "Me sinto confortável e occupo espaço de forma natural", s: 4 },
        { t: "Minha postura comunica domínio antes de eu abrir a boca", s: 5 }
      ]
    },

    /* PILAR 1 — Atitude Dominante */
    {
      p: 1,
      q: "Quando alguém tenta te testar ou diminuir publicamente, você:",
      o: [
        { t: "Fico sem reação — saio pelo silêncio", s: 1 },
        { t: "Respondo, mas fico desconfortável depois", s: 2 },
        { t: "Seguro o jogo com calma, sem escalar", s: 4 },
        { t: "Dissolvo com uma resposta que deixa claro quem eu sou", s: 5 }
      ]
    },
    {
      p: 1,
      q: "Seu contato visual com mulheres que te atraem costuma ser:",
      o: [
        { t: "Desvio fácil — fico desconfortável", s: 1 },
        { t: "Mantenho às vezes, mas não de forma consistente", s: 2 },
        { t: "Firme e natural, sem forçar", s: 4 },
        { t: "Uso o olhar como ferramenta de tensão e conexão", s: 5 }
      ]
    },
    {
      p: 1,
      q: "Em um grupo misto, quem costuma definir o ritmo da interação?",
      o: [
        { t: "Raramente sou eu — sigo mais do que lidero", s: 1 },
        { t: "Depende muito do grupo e do meu estado", s: 2 },
        { t: "Com frequência sou eu que defino o tom", s: 4 },
        { t: "De forma natural, sem precisar disputar espaço", s: 5 }
      ]
    },

    /* PILAR 2 — Jogo Social */
    {
      p: 2,
      q: "Como você se sente em ambientes com pessoas que não conhece?",
      o: [
        { t: "Evito ou fico na periferia do grupo", s: 1 },
        { t: "Participo, mas demoro para me soltar", s: 2 },
        { t: "Entro bem, faço conexões com facilidade", s: 4 },
        { t: "Circulo e conecto pessoas — viro ponto de referência", s: 5 }
      ]
    },
    {
      p: 2,
      q: "Como os outros te enxergam dentro dos seus grupos sociais?",
      o: [
        { t: "Não tenho clareza de como sou visto", s: 1 },
        { t: "Como alguém confiável, mas discreto", s: 2 },
        { t: "Como alguém com presença que as pessoas gostam de ter perto", s: 4 },
        { t: "Como referência — quem puxa o grupo", s: 5 }
      ]
    },
    {
      p: 2,
      q: "Em eventos ou bares, como costuma ser sua interação?",
      o: [
        { t: "Fico com quem já conheço", s: 1 },
        { t: "Falo com alguém novo só se der abertura clara", s: 2 },
        { t: "Crio novas conexões com frequência", s: 4 },
        { t: "Saio sempre com mais contatos do que entrei", s: 5 }
      ]
    },

    /* PILAR 3 — Presença Magnética */
    {
      p: 3,
      q: "Como você descreveria o impacto da sua voz em conversas?",
      o: [
        { t: "Falo baixo ou rápido demais quando estou nervoso", s: 1 },
        { t: "Normal — nem impactante, nem um problema", s: 3 },
        { t: "Clara e pausada — transmite calma naturalmente", s: 4 },
        { t: "Minha voz é algo que as pessoas comentam positivamente", s: 5 }
      ]
    },
    {
      p: 3,
      q: "Quando você fala, as pessoas ao redor costumam:",
      o: [
        { t: "Continuar o que estavam fazendo", s: 1 },
        { t: "Ouvir, mas sem muito engajamento", s: 2 },
        { t: "Prestar atenção de forma consistente", s: 4 },
        { t: "Parar o que fazem — você naturalmente comanda o espaço", s: 5 }
      ]
    },
    {
      p: 3,
      q: "Sua linguagem corporal com pessoas que te atraem é:",
      o: [
        { t: "Tensa ou fechada — fico rígido", s: 1 },
        { t: "Adequada, mas não muito expressiva", s: 3 },
        { t: "Aberta, leve e confortável", s: 4 },
        { t: "Expressiva e calibrada — comunica sem esforço", s: 5 }
      ]
    },

    /* PILAR 4 — Magnetismo */
    {
      p: 4,
      q: "Como você cria tensão ou interesse em alguém que te atrai?",
      o: [
        { t: "Não sei como fazer isso — fico no campo seguro", s: 1 },
        { t: "Tento dar sinais, mas sem controle do resultado", s: 2 },
        { t: "Consigo criar interesse de forma intencional", s: 4 },
        { t: "A tensão acontece naturalmente — sem precisar forçar", s: 5 }
      ]
    },
    {
      p: 4,
      q: "Você tende a flirtar de forma:",
      o: [
        { t: "Tímida ou praticamente inexistente", s: 1 },
        { t: "Ocasional, mas fico em dúvida se ficou claro", s: 2 },
        { t: "Direta e leve — sem drama", s: 4 },
        { t: "Precisa, intencional e eficaz", s: 5 }
      ]
    },
    {
      p: 4,
      q: "Quando alguém que te interessa manda sinais mistos, você:",
      o: [
        { t: "Fico confuso e recuo", s: 1 },
        { t: "Continuo, mas sem saber o que fazer com os sinais", s: 2 },
        { t: "Leio a situação e calibro minha resposta", s: 4 },
        { t: "Uso isso a meu favor — sei navegar ambiguidade", s: 5 }
      ]
    },

    /* PILAR 5 — Ambição & Status */
    {
      p: 5,
      q: "Como você descreveria sua direção de vida agora?",
      o: [
        { t: "Sem clareza — estou derivando um pouco", s: 1 },
        { t: "Tenho algumas metas, mas sem foco real", s: 2 },
        { t: "Tenho direção clara e estou construindo ativamente", s: 4 },
        { t: "Minha ambição é uma das primeiras coisas que as pessoas percebem", s: 5 }
      ]
    },
    {
      p: 5,
      q: "Quando fala sobre o que faz ou quer, sua energia é:",
      o: [
        { t: "Hesitante ou desanimada", s: 1 },
        { t: "Ok — nem empolgante, nem negativa", s: 2 },
        { t: "Presente e segura", s: 4 },
        { t: "Contagiante — as pessoas se empolgam quando te ouvem", s: 5 }
      ]
    },
    {
      p: 5,
      q: "Seu estilo de vida atual comunica que você está:",
      o: [
        { t: "Estagnado ou sem movimento visível", s: 1 },
        { t: "Se virando, mas sem grande impacto percebido", s: 2 },
        { t: "Em construção ativa — e isso é visível", s: 4 },
        { t: "Num nível que poucas pessoas ao seu redor atingiram", s: 5 }
      ]
    },

    /* PILAR 6 — Controle Emocional */
    {
      p: 6,
      q: "Quando sofre rejeição ou decepção em relacionamentos, você:",
      o: [
        { t: "Fico ruminando por dias — é intenso", s: 1 },
        { t: "Fico mal, mas passo", s: 3 },
        { t: "Processo rápido e sigo em frente", s: 4 },
        { t: "Uso como dado — sem espirais ou dramas", s: 5 }
      ]
    },
    {
      p: 6,
      q: "Em situações de pressão social ou tensão, seu estado interno é:",
      o: [
        { t: "Ansioso e difícil de controlar", s: 1 },
        { t: "Desconfortável, mas funcional", s: 3 },
        { t: "Estável — você consegue manter o eixo", s: 4 },
        { t: "Inalterado — você usa a pressão como combustível", s: 5 }
      ]
    },
    {
      p: 6,
      q: "Quando alguém que você está interessado esfria ou some, você:",
      o: [
        { t: "Fica ansioso e manda mensagem demais", s: 1 },
        { t: "Espera, mas fica agitado por dentro", s: 2 },
        { t: "Deixa espaço e foca em outras coisas", s: 4 },
        { t: "Continua com sua vida no mesmo ritmo — naturalmente", s: 5 }
      ]
    },

    /* PILAR 7 — Energia */
    {
      p: 7,
      q: "Quando você entra em um ambiente, a energia do lugar tende a:",
      o: [
        { t: "Não mudar — passo despercebido", s: 1 },
        { t: "Mudar levemente, dependendo do meu estado", s: 2 },
        { t: "Subir — as pessoas ficam mais presentes", s: 4 },
        { t: "Mudar de forma consistente — eu defino o tom", s: 5 }
      ]
    },
    {
      p: 7,
      q: "Como você descreveria sua vibe em dias comuns, sem evento especial?",
      o: [
        { t: "Baixa ou inconsistente", s: 1 },
        { t: "Normal — nem empolgante, nem negativa", s: 3 },
        { t: "Presente e estável — as pessoas gostam de estar perto", s: 4 },
        { t: "Alta de forma natural — energia que as pessoas sentem", s: 5 }
      ]
    },
    {
      p: 7,
      q: "Nas suas interações cotidianas, o que você transmite?",
      o: [
        { t: "Insegurança ou cautela excessiva", s: 1 },
        { t: "Neutralidade — nem muito, nem pouco", s: 3 },
        { t: "Calma intensa e foco que as pessoas percebem", s: 4 },
        { t: "Uma intensidade silenciosa que atrai sem esforço", s: 5 }
      ]
    }
  ];

  /* ─── STATE ─── */
  let state = {
    current: 0,
    answers: new Array(QUESTIONS.length).fill(null)
  };

  /* ─── UTILS ─── */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function calcScores() {
    const ps = new Array(8).fill(0);
    const pc = new Array(8).fill(0);
    state.answers.forEach((score, idx) => {
      if (score !== null) {
        const pilar = QUESTIONS[idx].p;
        ps[pilar] += score;
        pc[pilar]++;
      }
    });
    const perc = ps.map((s, i) => {
      const max = pc[i] * 5;
      return max > 0 ? Math.round((s / max) * 100) : 0;
    });
    const total = Math.round(perc.reduce((a, b) => a + b, 0) / 8);
    return { pillarScores: perc, totalScore: total };
  }

  /* ─── RENDER QUESTION ─── */
  function renderQuestion() {
    const idx = state.current;
    const q   = QUESTIONS[idx];
    const total = QUESTIONS.length;
    const pct = (idx / total) * 100;

    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progText').textContent = `Pergunta ${idx + 1} de ${total}`;
    document.getElementById('progPilar').textContent = `Pilar ${q.p + 1} / 8`;
    document.getElementById('qPilarTag').textContent = PILLARS[q.p];
    document.getElementById('qText').textContent = q.q;

    const letters = ['A','B','C','D'];
    const opts = shuffle(q.o);

    const container = document.getElementById('qOptions');
    container.innerHTML = '';
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'q-opt' + (state.answers[idx] === opt.s ? ' selected' : '');
      btn.innerHTML = `<span class="q-opt-letter">${letters[i]}</span><span>${opt.t}</span>`;
      btn.onclick = () => selectOpt(opt.s, btn);
      container.appendChild(btn);
    });

    const backBtn = document.getElementById('btnBack');
    if (backBtn) backBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';

    updateNextBtn();
  }

  function selectOpt(score, btn) {
    state.answers[state.current] = score;
    document.querySelectorAll('.q-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateNextBtn();
    setTimeout(() => advance(), 380);
  }

  function updateNextBtn() {
    const btn = document.getElementById('btnNextQ');
    if (!btn) return;
    const ready = state.answers[state.current] !== null;
    btn.classList.toggle('ready', ready);
    const isLast = state.current === QUESTIONS.length - 1;
    btn.textContent = isLast ? 'Ver resultado →' : 'Próxima →';
  }

  function advance() {
    if (state.answers[state.current] === null) return;
    if (state.current < QUESTIONS.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      showLeadGate();
    }
  }

  function back() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    }
  }

  function showLeadGate() {
    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('qNavBar').style.display = 'none';
    document.getElementById('leadGate').style.display = 'block';
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progText').textContent = 'Diagnóstico completo';
    document.getElementById('progPilar').textContent = '24 / 24';
  }

  function submitLead() {
    const name  = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!name || !email) {
      alert('Preencha nome e e-mail para continuar.');
      return;
    }

    const { pillarScores, totalScore } = calcScores();
    const result = { name, email, phone, pillarScores, totalScore, ts: Date.now() };
    try { localStorage.setItem('iamResult', JSON.stringify(result)); } catch(e) {}

    window.location.href = 'resultado.html';
  }

  /* ─── OPEN / CLOSE ─── */
  function open() {
    const overlay = document.getElementById('quizModal');
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset lead gate
    const lg = document.getElementById('leadGate');
    const qb = document.getElementById('quizBody');
    const qn = document.getElementById('qNavBar');
    if (lg) lg.style.display = 'none';
    if (qb) qb.style.display = 'block';
    if (qn) qn.style.display = 'flex';
    renderQuestion();
  }

  function close() {
    const overlay = document.getElementById('quizModal');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ─── KEYBOARD ─── */
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('quizModal');
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') close();
  });

  /* ─── PUBLIC API ─── */
  return { open, close, advance, back, submitLead };
})();
