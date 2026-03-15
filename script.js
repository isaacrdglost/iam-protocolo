// ═══════════════════════════════════════════════
// PROTOCOLO IAM — Quiz Engine (Front)
// Perguntas embaralhadas - sem padrão óbvio
// Pontuação protegida no back-end
// ═══════════════════════════════════════════════

const IAM = (() => {

  // ─── PERGUNTAS EMBARALHADAS ────────────────
  // SEM 1ª pessoa, opções neutras, pontuação não-linear
  const PERGUNTAS = [

    // PILAR 1 — Aparência & Impacto (3 perguntas)
    {
      pilar: 'Aparência & Impacto',
      texto: 'Ao escolher roupas para sair, qual situação é mais comum?',
      opcoes: [
        { letra: 'A', texto: 'Escolher algo confortável que já funciona bem' },
        { letra: 'B', texto: 'Pegar o que estiver limpo sem pensar muito' },
        { letra: 'C', texto: 'Adaptar o estilo baseado no ambiente' },
        { letra: 'D', texto: 'Manter sempre o mesmo estilo como identidade' },
        { letra: 'E', texto: 'Experimentar looks diferentes dependendo da ocasião' },
      ],
    },
    {
      pilar: 'Aparência & Impacto',
      texto: 'Quanto tempo é dedicado ao cuidado pessoal diário (cabelo, barba, pele)?',
      opcoes: [
        { letra: 'A', texto: 'Mais de 30 minutos com produtos específicos' },
        { letra: 'B', texto: 'O mínimo necessário, só o básico' },
        { letra: 'C', texto: 'Entre 10-20 minutos com uma rotina' },
        { letra: 'D', texto: 'Cerca de 5-10 minutos, nada elaborado' },
        { letra: 'E', texto: '20-30 minutos, cuidado consistente' },
      ],
    },
    {
      pilar: 'Aparência & Impacto',
      texto: 'Quando alguém entra arrumado em um ambiente, como as pessoas geralmente reagem?',
      opcoes: [
        { letra: 'A', texto: 'Olhares discretos mas sem comentários' },
        { letra: 'B', texto: 'Elogios espontâneos são comuns' },
        { letra: 'C', texto: 'Às vezes comentam que está bem' },
        { letra: 'D', texto: 'Ninguém nota particularmente' },
        { letra: 'E', texto: 'Pessoas comentam entre si' },
      ],
    },

    // PILAR 2 — Atitude Dominante (3 perguntas)
    {
      pilar: 'Atitude Dominante',
      texto: 'Em uma festa onde quase ninguém é conhecido:',
      opcoes: [
        { letra: 'A', texto: 'Ficar no canto esperando alguém iniciar' },
        { letra: 'B', texto: 'Puxar conversa naturalmente com quem estiver perto' },
        { letra: 'C', texto: 'Procurar rapidamente alguém familiar' },
        { letra: 'D', texto: 'Conectar-se naturalmente com várias pessoas' },
        { letra: 'E', texto: 'Circular pelo ambiente observando primeiro' },
      ],
    },
    {
      pilar: 'Atitude Dominante',
      texto: 'Durante conversa com alguém atraente, o contato visual costuma ser:',
      opcoes: [
        { letra: 'A', texto: 'Dominar a conversa com presença visual intensa' },
        { letra: 'B', texto: 'Praticamente nenhum, olhar para os lados' },
        { letra: 'C', texto: 'Olhar de vez em quando mas desviar rápido' },
        { letra: 'D', texto: 'Sustentar o olhar com segurança' },
        { letra: 'E', texto: 'Manter contato visual confortável' },
      ],
    },
    {
      pilar: 'Atitude Dominante',
      texto: 'Quando alguém desafia ou discorda publicamente:',
      opcoes: [
        { letra: 'A', texto: 'Fazer uma piada para desarmar a situação' },
        { letra: 'B', texto: 'Ficar sem reação e desconfortável' },
        { letra: 'C', texto: 'Concordar para evitar conflito' },
        { letra: 'D', texto: 'Responder com firmeza mantendo a calma' },
        { letra: 'E', texto: 'Posicionar-se mas ficar um pouco abalado' },
      ],
    },

    // PILAR 3 — Jogo Social (3 perguntas)
    {
      pilar: 'Jogo Social',
      texto: 'Em um evento de networking ou social:',
      opcoes: [
        { letra: 'A', texto: 'Conversar com várias pessoas ao longo do evento' },
        { letra: 'B', texto: 'Ficar com quem já conhece o tempo todo' },
        { letra: 'C', texto: 'As pessoas vêm naturalmente' },
        { letra: 'D', texto: 'Falar com 1-2 pessoas novas se surgir oportunidade' },
        { letra: 'E', texto: 'Fazer questão de conhecer gente nova e conectar pessoas' },
      ],
    },
    {
      pilar: 'Jogo Social',
      texto: 'O círculo social atual pode ser descrito como:',
      opcoes: [
        { letra: 'A', texto: 'Praticamente inexistente ou muito limitado' },
        { letra: 'B', texto: 'Rede social ativa com muitas pessoas' },
        { letra: 'C', texto: 'Apenas 2-3 amigos próximos' },
        { letra: 'D', texto: 'Vários grupos diferentes, sempre tem programação' },
        { letra: 'E', texto: 'Um grupo fixo que se vê regularmente' },
      ],
    },
    {
      pilar: 'Jogo Social',
      texto: 'Ao contar uma história em grupo:',
      opcoes: [
        { letra: 'A', texto: 'Todos param para ouvir, vira centro de atenção' },
        { letra: 'B', texto: 'As pessoas mal prestam atenção' },
        { letra: 'C', texto: 'Alguns ouvem mas a energia é baixa' },
        { letra: 'D', texto: 'As pessoas riem e se engajam' },
        { letra: 'E', texto: 'A maioria acompanha se for interessante' },
      ],
    },

    // PILAR 4 — Presença Magnética (3 perguntas)
    {
      pilar: 'Presença Magnética',
      texto: 'A voz em conversas geralmente soa:',
      opcoes: [
        { letra: 'A', texto: 'Firme e pausada, com presença' },
        { letra: 'B', texto: 'Baixa e rápida, como se tivesse pressa' },
        { letra: 'C', texto: 'Normal mas sem muito impacto' },
        { letra: 'D', texto: 'Comandante — domina naturalmente' },
        { letra: 'E', texto: 'Clara e audível na maioria das vezes' },
      ],
    },
    {
      pilar: 'Presença Magnética',
      texto: 'Gestos e expressões ao falar:',
      opcoes: [
        { letra: 'A', texto: 'Bem travado, quase não gesticula' },
        { letra: 'B', texto: 'Totalmente fluido, corpo acompanha a fala' },
        { letra: 'C', texto: 'Movimentos contidos, braços cruzados às vezes' },
        { letra: 'D', texto: 'Expressivo, o corpo acompanha a mensagem' },
        { letra: 'E', texto: 'Natural, usa gestos quando necessário' },
      ],
    },
    {
      pilar: 'Presença Magnética',
      texto: 'Com que frequência pedem para repetir o que foi dito?',
      opcoes: [
        { letra: 'A', texto: 'Sempre, ninguém entende de primeira' },
        { letra: 'B', texto: 'Nunca, há clareza total na comunicação' },
        { letra: 'C', texto: 'Frequentemente' },
        { letra: 'D', texto: 'Raramente' },
        { letra: 'E', texto: 'De vez em quando' },
      ],
    },

    // PILAR 5 — Magnetismo Sexual (3 perguntas)
    {
      pilar: 'Magnetismo Sexual',
      texto: 'Ao flertar com alguém:',
      opcoes: [
        { letra: 'A', texto: 'Criar conexão mas sem tensão sexual' },
        { letra: 'B', texto: 'Dominar completamente, a tensão é palpável' },
        { letra: 'C', texto: 'Não saber como fazer isso, ficar travado' },
        { letra: 'D', texto: 'Flertar naturalmente, criar tensão sexual sutil' },
        { letra: 'E', texto: 'Tentar mas geralmente soa estranho ou forçado' },
      ],
    },
    {
      pilar: 'Magnetismo Sexual',
      texto: 'Uso de toque físico casual (ombro, braço) ao conversar:',
      opcoes: [
        { letra: 'A', texto: 'Nunca, há medo de invadir espaço' },
        { letra: 'B', texto: 'É parte natural da comunicação' },
        { letra: 'C', texto: 'Raramente, só se a pessoa tocar primeiro' },
        { letra: 'D', texto: 'Frequentemente, de forma calibrada' },
        { letra: 'E', texto: 'Às vezes, quando parece natural' },
      ],
    },
    {
      pilar: 'Magnetismo Sexual',
      texto: 'Como as pessoas geralmente percebem:',
      opcoes: [
        { letra: 'A', texto: 'Como amigo legal mas sem atração' },
        { letra: 'B', texto: 'Claramente como alguém desejável' },
        { letra: 'C', texto: 'Como cara gente boa, nada além disso' },
        { letra: 'D', texto: 'Geralmente há interesse romântico/sexual' },
        { letra: 'E', texto: 'Depende, às vezes rola química' },
      ],
    },

    // PILAR 6 — Ambição & Status (3 perguntas)
    {
      pilar: 'Ambição & Status',
      texto: 'Quando perguntam "o que você anda fazendo?":',
      opcoes: [
        { letra: 'A', texto: 'Mencionar trabalho/estudos de forma neutra' },
        { letra: 'B', texto: 'Falar com paixão visível sobre objetivos' },
        { letra: 'C', texto: 'Não ter resposta clara, estar meio perdido' },
        { letra: 'D', texto: 'Falar dos projetos com clareza' },
        { letra: 'E', texto: 'Falar algo genérico sem muito entusiasmo' },
      ],
    },
    {
      pilar: 'Ambição & Status',
      texto: 'Sobre metas para os próximos 12 meses:',
      opcoes: [
        { letra: 'A', texto: 'Não há, viver mais no automático' },
        { letra: 'B', texto: 'Visão de longo prazo com execução diária' },
        { letra: 'C', texto: 'Ideias vagas mas nada concreto' },
        { letra: 'D', texto: 'Metas claras e já em ação' },
        { letra: 'E', texto: 'Algumas metas definidas' },
      ],
    },
    {
      pilar: 'Ambição & Status',
      texto: 'As pessoas veem como alguém que:',
      opcoes: [
        { letra: 'A', texto: 'Está meio parado, sem muita direção' },
        { letra: 'B', texto: 'Está claramente no caminho do sucesso' },
        { letra: 'C', texto: 'Está tentando mas progredindo devagar' },
        { letra: 'D', texto: 'Está construindo algo sólido' },
        { letra: 'E', texto: 'Está caminhando, fazendo as coisas' },
      ],
    },

    // PILAR 7 — Controle Emocional (3 perguntas)
    {
      pilar: 'Controle Emocional',
      texto: 'Quando algo irrita ou frustra:',
      opcoes: [
        { letra: 'A', texto: 'Explodir ou ficar visivelmente abalado' },
        { letra: 'B', texto: 'Nada tira do eixo, controle total' },
        { letra: 'C', texto: 'Ficar irritado mas tentar esconder' },
        { letra: 'D', texto: 'Raramente perder a compostura' },
        { letra: 'E', texto: 'Manter a calma na maioria das vezes' },
      ],
    },
    {
      pilar: 'Controle Emocional',
      texto: 'Ao levar um fora ou rejeição:',
      opcoes: [
        { letra: 'A', texto: 'Ficar destruído, pensar nisso por dias' },
        { letra: 'B', texto: 'Nem registrar, rejeição não afeta' },
        { letra: 'C', texto: 'Ficar bem mal, demorar para superar' },
        { letra: 'D', texto: 'Aceitar numa boa, não abala muito' },
        { letra: 'E', texto: 'Ficar chateado mas seguir em frente' },
      ],
    },
    {
      pilar: 'Controle Emocional',
      texto: 'Perceber quando alguém está chateado sem a pessoa falar:',
      opcoes: [
        { letra: 'A', texto: 'Nunca, só se alguém contar' },
        { letra: 'B', texto: 'Sempre, muito perceptivo emocionalmente' },
        { letra: 'C', texto: 'Raramente notar os sinais' },
        { letra: 'D', texto: 'Geralmente ler bem as emoções das pessoas' },
        { letra: 'E', texto: 'Às vezes perceber' },
      ],
    },

    // PILAR 8 — Energia Sexual (3 perguntas)
    {
      pilar: 'Energia Sexual',
      texto: 'Nível de energia no dia a dia:',
      opcoes: [
        { letra: 'A', texto: 'Baixo, viver cansado e desmotivado' },
        { letra: 'B', texto: 'Intenso, as pessoas sentem a energia' },
        { letra: 'C', texto: 'Mediano, só ter energia quando preciso' },
        { letra: 'D', texto: 'Alto na maior parte do tempo' },
        { letra: 'E', texto: 'Razoável, varia bastante' },
      ],
    },
    {
      pilar: 'Energia Sexual',
      texto: 'Quando alguém chega em um lugar, a energia do ambiente muda?',
      opcoes: [
        { letra: 'A', texto: 'Não, ninguém nota a presença' },
        { letra: 'B', texto: 'Sempre, muda a vibe do lugar' },
        { letra: 'C', texto: 'Às vezes alguém percebe' },
        { letra: 'D', texto: 'Geralmente a entrada é notada' },
        { letra: 'E', texto: 'As pessoas próximas notam' },
      ],
    },
    {
      pilar: 'Energia Sexual',
      texto: 'Como as pessoas costumam descrever:',
      opcoes: [
        { letra: 'A', texto: 'Apático, sem graça, meio negativo' },
        { letra: 'B', texto: 'Magnético, todo mundo quer estar perto' },
        { letra: 'C', texto: 'Tranquilo mas sem muito brilho' },
        { letra: 'D', texto: 'Animado, positivo, energético' },
        { letra: 'E', texto: 'Legal, de boa, nada excepcional' },
      ],
    },
  ];

  // ─── STATE ──────────────────────────────────
  let state = {
    atual: 0,
    respostas: new Array(PERGUNTAS.length).fill(null),
  };

  // ─── RENDER ─────────────────────────────────
  function renderPergunta() {
    const idx = state.atual;
    const total = PERGUNTAS.length;
    const q = PERGUNTAS[idx];
    const pct = ((idx + 1) / total) * 100;
    const pilarNum = Math.floor(idx / 3) + 1;

    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progText').textContent = `Pergunta ${idx + 1} de ${total}`;
    document.getElementById('progPilar').textContent = `Pilar ${pilarNum} / 8`;
    document.getElementById('qPilarTag').textContent = q.pilar;
    document.getElementById('qText').textContent = q.texto;

    const container = document.getElementById('qOptions');
    container.innerHTML = '';

    q.opcoes.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'q-opt' + (state.respostas[idx] === opt.letra ? ' selected' : '');
      btn.innerHTML = `<span class="q-opt-letter">${opt.letra}</span><span>${opt.texto}</span>`;
      btn.onclick = () => selecionarOpcao(opt.letra, btn);
      container.appendChild(btn);
    });

    const btnBack = document.getElementById('btnBack');
    if (btnBack) btnBack.style.visibility = idx === 0 ? 'hidden' : 'visible';

    atualizarBtnNext();
  }

  function selecionarOpcao(letra, btn) {
    state.respostas[state.atual] = letra;
    document.querySelectorAll('.q-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    atualizarBtnNext();
    setTimeout(() => avancar(), 350);
  }

  function atualizarBtnNext() {
    const btn = document.getElementById('btnNextQ');
    if (!btn) return;
    const pronto = state.respostas[state.atual] !== null;
    btn.classList.toggle('ready', pronto);
    const isUltima = state.atual === PERGUNTAS.length - 1;
    btn.textContent = isUltima ? 'Ver resultado →' : 'Próxima →';
  }

  function avancar() {
    if (state.respostas[state.atual] === null) return;
    if (state.atual < PERGUNTAS.length - 1) {
      state.atual++;
      renderPergunta();
    } else {
      mostrarLeadGate();
    }
  }

  function voltar() {
    if (state.atual > 0) {
      state.atual--;
      renderPergunta();
    }
  }

  // ─── LEAD GATE ──────────────────────────────
  function mostrarLeadGate() {
    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('qNavBar').style.display = 'none';
    document.getElementById('leadGate').style.display = 'block';
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progText').textContent = 'Completo';
    document.getElementById('progPilar').textContent = '24 / 24';
  }

  // ─── SUBMIT ─────────────────────────────────
  async function enviarLead() {
    const nome = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!nome || !email) {
      alert('Preencha nome e e-mail para continuar.');
      return;
    }

    const btnSubmit = document.querySelector('#leadGate .btn-primary');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = 'Calculando seu IAM...';
    btnSubmit.disabled = true;

    try {
      const res = await fetch('/api/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas: state.respostas }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.erro || `Erro ${res.status}`);
      }

      const dados = await res.json();

      const payload = {
        name: nome,
        email,
        phone,
        pillarScores: dados.pilares.map(p => p.score),
        totalScore: dados.iam,
        pontosFortes: dados.pontosFortes,
        gargalos: dados.gargalos,
        pilarPrioritario: dados.pilarPrioritario,
        timestamp: Date.now(),
      };

      localStorage.setItem('iamResult', JSON.stringify(payload));
      window.location.href = 'resultado.html';

    } catch (err) {
      console.error('Erro ao calcular resultado:', err);
      btnSubmit.textContent = textoOriginal;
      btnSubmit.disabled = false;
      alert('Algo deu errado. Tente novamente em instantes.');
    }
  }

  // ─── ABRIR / FECHAR MODAL ───────────────────
  function abrir() {
    const overlay = document.getElementById('quizModal');
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset visual
    const lg = document.getElementById('leadGate');
    const qb = document.getElementById('quizBody');
    const qn = document.getElementById('qNavBar');
    if (lg) lg.style.display = 'none';
    if (qb) qb.style.display = 'block';
    if (qn) qn.style.display = 'flex';

    renderPergunta();
  }

  function fechar() {
    const overlay = document.getElementById('quizModal');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── TECLADO ────────────────────────────────
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('quizModal');
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') fechar();
  });

  // ─── API PÚBLICA ────────────────────────────
  return {
    open: abrir,
    close: fechar,
    advance: avancar,
    back: voltar,
    submitLead: enviarLead,
  };
})();
