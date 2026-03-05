// ═══════════════════════════════════════════════
// PROTOCOLO IAM — Quiz Engine (Front)
// Só exibe perguntas e coleta respostas.
// Nenhuma lógica de pontuação fica aqui.
// ═══════════════════════════════════════════════

const IAM = (() => {

  // ─── PERGUNTAS ──────────────────────────────
  // Apenas texto. Sem scores. Sem pesos.
  const PERGUNTAS = [

    // PILAR 1 — Impacto Visual
    {
      pilar: 'Impacto Visual',
      texto: 'Quando estou me preparando para sair, o que normalmente acontece?',
      opcoes: [
        { letra: 'A', texto: 'Escolho algo confortável que já sei que funciona bem.' },
        { letra: 'B', texto: 'Ajusto alguns detalhes porque sei que pequenas coisas mudam a percepção.' },
        { letra: 'C', texto: 'Me arrumo rápido e só percebo depois se ficou bom ou não.' },
        { letra: 'D', texto: 'Penso no ambiente onde vou e adapto meu estilo para aquilo.' },
        { letra: 'E', texto: 'Mantenho praticamente o mesmo estilo sempre, porque já virou minha identidade.' },
      ],
    },
    {
      pilar: 'Impacto Visual',
      texto: 'Quando chego em um lugar onde não conheço quase ninguém, o que costuma acontecer nos primeiros minutos?',
      opcoes: [
        { letra: 'A', texto: 'Observo o ambiente antes de interagir.' },
        { letra: 'B', texto: 'Alguma conversa começa naturalmente perto de mim.' },
        { letra: 'C', texto: 'Procuro algo familiar primeiro.' },
        { letra: 'D', texto: 'Acabo entrando em alguma conversa sem perceber.' },
        { letra: 'E', texto: 'Inicio alguma interação com quem está por perto.' },
      ],
    },
    {
      pilar: 'Impacto Visual',
      texto: 'Sobre postura corporal no dia a dia:',
      opcoes: [
        { letra: 'A', texto: 'Não penso muito nisso, simplesmente ando de forma natural.' },
        { letra: 'B', texto: 'Às vezes lembro de ajustar postura.' },
        { letra: 'C', texto: 'Minha postura muda dependendo do ambiente.' },
        { letra: 'D', texto: 'Ocupo espaço naturalmente quando converso.' },
        { letra: 'E', texto: 'Tenho consciência de como meu corpo comunica presença.' },
      ],
    },

    // PILAR 2 — Presença em Interações
    {
      pilar: 'Presença em Interações',
      texto: 'Quando estou conversando com alguém que acabei de conhecer:',
      opcoes: [
        { letra: 'A', texto: 'Prefiro deixar a conversa fluir naturalmente.' },
        { letra: 'B', texto: 'Faço perguntas para entender melhor a pessoa.' },
        { letra: 'C', texto: 'Observo bastante antes de falar muito.' },
        { letra: 'D', texto: 'Acabo conduzindo a conversa sem perceber.' },
        { letra: 'E', texto: 'Gosto de provocar curiosidade na interação.' },
      ],
    },
    {
      pilar: 'Presença em Interações',
      texto: 'Quando alguém discorda de mim em público:',
      opcoes: [
        { letra: 'A', texto: 'Escuto primeiro para entender o ponto.' },
        { letra: 'B', texto: 'Prefiro evitar transformar em debate.' },
        { letra: 'C', texto: 'Argumento se achar necessário.' },
        { letra: 'D', texto: 'Respondo com calma e firmeza.' },
        { letra: 'E', texto: 'Uso humor ou leveza para equilibrar a situação.' },
      ],
    },
    {
      pilar: 'Presença em Interações',
      texto: 'Em conversas em grupo:',
      opcoes: [
        { letra: 'A', texto: 'Falo quando tenho algo relevante.' },
        { letra: 'B', texto: 'Escuto mais do que falo.' },
        { letra: 'C', texto: 'Participo de forma equilibrada.' },
        { letra: 'D', texto: 'Acabo puxando algumas conversas.' },
        { letra: 'E', texto: 'As pessoas reagem bastante ao que digo.' },
      ],
    },

    // PILAR 3 — Jogo Social
    {
      pilar: 'Jogo Social',
      texto: 'Em um evento ou festa:',
      opcoes: [
        { letra: 'A', texto: 'Converso principalmente com quem já conheço.' },
        { letra: 'B', texto: 'Acabo conhecendo algumas pessoas novas.' },
        { letra: 'C', texto: 'Prefiro observar o ambiente primeiro.' },
        { letra: 'D', texto: 'Costumo circular entre grupos.' },
        { letra: 'E', texto: 'Alguém acaba me puxando para conversas.' },
      ],
    },
    {
      pilar: 'Jogo Social',
      texto: 'Meu círculo social hoje é algo que:',
      opcoes: [
        { letra: 'A', texto: 'Se mantém estável.' },
        { letra: 'B', texto: 'Mudou bastante nos últimos anos.' },
        { letra: 'C', texto: 'É pequeno mas próximo.' },
        { letra: 'D', texto: 'Tem grupos diferentes de pessoas.' },
        { letra: 'E', texto: 'Sempre aparecem pessoas novas.' },
      ],
    },
    {
      pilar: 'Jogo Social',
      texto: 'Quando conto uma história:',
      opcoes: [
        { letra: 'A', texto: 'As pessoas escutam com interesse.' },
        { letra: 'B', texto: 'Alguns reagem mais que outros.' },
        { letra: 'C', texto: 'Depende muito do ambiente.' },
        { letra: 'D', texto: 'Geralmente surgem comentários ou risadas.' },
        { letra: 'E', texto: 'A conversa acaba crescendo a partir disso.' },
      ],
    },

    // PILAR 4 — Comunicação
    {
      pilar: 'Comunicação',
      texto: 'Quando falo em grupo:',
      opcoes: [
        { letra: 'A', texto: 'Prefiro falar com clareza e calma.' },
        { letra: 'B', texto: 'Às vezes percebo que falam por cima.' },
        { letra: 'C', texto: 'Costumo ser ouvido normalmente.' },
        { letra: 'D', texto: 'As pessoas prestam bastante atenção.' },
        { letra: 'E', texto: 'Minha forma de falar prende a conversa.' },
      ],
    },
    {
      pilar: 'Comunicação',
      texto: 'Durante conversas:',
      opcoes: [
        { letra: 'A', texto: 'Uso gestos naturalmente.' },
        { letra: 'B', texto: 'Sou mais contido.' },
        { letra: 'C', texto: 'Depende da pessoa com quem estou falando.' },
        { letra: 'D', texto: 'Uso expressões e pausas para enfatizar.' },
        { letra: 'E', texto: 'Percebo bastante as reações das pessoas.' },
      ],
    },
    {
      pilar: 'Comunicação',
      texto: 'Quando estou explicando algo:',
      opcoes: [
        { letra: 'A', texto: 'Prefiro ser direto.' },
        { letra: 'B', texto: 'Às vezes preciso repetir.' },
        { letra: 'C', texto: 'Adapto a explicação dependendo da pessoa.' },
        { letra: 'D', texto: 'Uso exemplos ou histórias.' },
        { letra: 'E', texto: 'Geralmente as pessoas entendem rápido.' },
      ],
    },

    // PILAR 5 — Magnetismo
    {
      pilar: 'Magnetismo',
      texto: 'Quando converso com alguém que acho interessante:',
      opcoes: [
        { letra: 'A', texto: 'A conversa fica leve e curiosa.' },
        { letra: 'B', texto: 'Prefiro manter a interação natural.' },
        { letra: 'C', texto: 'Às vezes rola troca de olhares.' },
        { letra: 'D', texto: 'A conversa vira um jogo de provocações.' },
        { letra: 'E', texto: 'Percebo alguma tensão ou curiosidade.' },
      ],
    },
    {
      pilar: 'Magnetismo',
      texto: 'Contato físico em conversas:',
      opcoes: [
        { letra: 'A', texto: 'Depende muito da situação.' },
        { letra: 'B', texto: 'Às vezes acontece naturalmente.' },
        { letra: 'C', texto: 'Prefiro evitar.' },
        { letra: 'D', texto: 'Uso quando a interação permite.' },
        { letra: 'E', texto: 'Acontece de forma espontânea.' },
      ],
    },
    {
      pilar: 'Magnetismo',
      texto: 'Em interações sociais:',
      opcoes: [
        { letra: 'A', texto: 'Algumas pessoas demonstram curiosidade.' },
        { letra: 'B', texto: 'Prefiro manter tudo tranquilo.' },
        { letra: 'C', texto: 'Às vezes percebo interesse.' },
        { letra: 'D', texto: 'Algumas conversas ficam mais intensas.' },
        { letra: 'E', texto: 'A interação costuma evoluir naturalmente.' },
      ],
    },

    // PILAR 6 — Direção de Vida
    {
      pilar: 'Direção de Vida',
      texto: 'Quando alguém pergunta sobre meus planos:',
      opcoes: [
        { letra: 'A', texto: 'Tenho algumas ideias em andamento.' },
        { letra: 'B', texto: 'Prefiro responder de forma simples.' },
        { letra: 'C', texto: 'Depende do momento da minha vida.' },
        { letra: 'D', texto: 'Gosto de falar sobre projetos.' },
        { letra: 'E', texto: 'Tenho uma direção clara.' },
      ],
    },
    {
      pilar: 'Direção de Vida',
      texto: 'Sobre metas:',
      opcoes: [
        { letra: 'A', texto: 'Costumo definir objetivos para mim.' },
        { letra: 'B', texto: 'Tenho ideias mas ajusto ao longo do tempo.' },
        { letra: 'C', texto: 'Prefiro viver mais no presente.' },
        { letra: 'D', texto: 'Tenho metas bem claras.' },
        { letra: 'E', texto: 'Planejo vários passos à frente.' },
      ],
    },
    {
      pilar: 'Direção de Vida',
      texto: 'Minha motivação costuma vir de:',
      opcoes: [
        { letra: 'A', texto: 'Curiosidade.' },
        { letra: 'B', texto: 'Desafios.' },
        { letra: 'C', texto: 'Responsabilidades.' },
        { letra: 'D', texto: 'Projetos que quero construir.' },
        { letra: 'E', texto: 'Ideias que quero realizar.' },
      ],
    },

    // PILAR 7 — Controle Emocional
    {
      pilar: 'Controle Emocional',
      texto: 'Quando algo me irrita:',
      opcoes: [
        { letra: 'A', texto: 'Prefiro me afastar e pensar.' },
        { letra: 'B', texto: 'Respiro antes de reagir.' },
        { letra: 'C', texto: 'Às vezes respondo no impulso.' },
        { letra: 'D', texto: 'Tento manter calma.' },
        { letra: 'E', texto: 'Uso a situação para entender melhor o que aconteceu.' },
      ],
    },
    {
      pilar: 'Controle Emocional',
      texto: 'Quando recebo rejeição ou crítica:',
      opcoes: [
        { letra: 'A', texto: 'Levo um tempo para processar.' },
        { letra: 'B', texto: 'Escuto e sigo em frente.' },
        { letra: 'C', texto: 'Depende da situação.' },
        { letra: 'D', texto: 'Uso isso como aprendizado.' },
        { letra: 'E', texto: 'Raramente deixo isso me afetar.' },
      ],
    },
    {
      pilar: 'Controle Emocional',
      texto: 'Perceber emoções das pessoas:',
      opcoes: [
        { letra: 'A', texto: 'Às vezes noto sinais.' },
        { letra: 'B', texto: 'Consigo perceber quando algo muda.' },
        { letra: 'C', texto: 'Depende da pessoa.' },
        { letra: 'D', texto: 'Costumo perceber rapidamente.' },
        { letra: 'E', texto: 'Leio bem expressões e energia.' },
      ],
    },

    // PILAR 8 — Energia Social
    {
      pilar: 'Energia Social',
      texto: 'Em grupos de pessoas:',
      opcoes: [
        { letra: 'A', texto: 'Participo quando puxam assunto.' },
        { letra: 'B', texto: 'Escuto bastante.' },
        { letra: 'C', texto: 'Acabo puxando alguns temas.' },
        { letra: 'D', texto: 'Gosto de movimentar a conversa.' },
        { letra: 'E', texto: 'As pessoas reagem bastante ao que digo.' },
      ],
    },
    {
      pilar: 'Energia Social',
      texto: 'Quando passo algum tempo em um ambiente social:',
      opcoes: [
        { letra: 'A', texto: 'Me adapto ao clima do lugar.' },
        { letra: 'B', texto: 'Participo da energia do grupo.' },
        { letra: 'C', texto: 'Prefiro manter minha própria vibe.' },
        { letra: 'D', texto: 'Acabo influenciando o clima.' },
        { letra: 'E', texto: 'As pessoas acabam interagindo comigo.' },
      ],
    },
    {
      pilar: 'Energia Social',
      texto: 'Depois de algumas horas em um ambiente social:',
      opcoes: [
        { letra: 'A', texto: 'Estou confortável.' },
        { letra: 'B', texto: 'Estou mais solto.' },
        { letra: 'C', texto: 'Depende do grupo.' },
        { letra: 'D', texto: 'As conversas ficam mais envolventes.' },
        { letra: 'E', texto: 'Sinto que participei bastante.' },
      ],
    },
  ];

  // ─── STATE ──────────────────────────────────
  let state = {
    atual: 0,
    respostas: new Array(PERGUNTAS.length).fill(null), // guarda letra: 'A','B'...
  };

  // ─── RENDER ─────────────────────────────────
  function renderPergunta() {
    const idx = state.atual;
    const total = PERGUNTAS.length;
    const q = PERGUNTAS[idx];
    const pct = (idx / total) * 100;

    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progText').textContent = `${idx + 1} / ${total}`;
    document.getElementById('progPilar').textContent = q.pilar;
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
    setTimeout(() => avancar(), 380);
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

  // ─── SUBMIT — chama a API ───────────────────
  async function enviarLead() {
    const nome  = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!nome || !email) {
      alert('Preencha nome e e-mail para continuar.');
      return;
    }

    const btnSubmit = document.querySelector('#leadGate .btn-primary');
    btnSubmit.textContent = 'Calculando...';
    btnSubmit.disabled = true;

    try {
      const res = await fetch('/api/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas: state.respostas }),
      });

      if (!res.ok) throw new Error('Erro no servidor.');

      const dados = await res.json();

      // Salva só o necessário para renderizar a página de resultado
      const payload = {
        nome,
        email,
        phone,
        iam: dados.iam,
        pilares: dados.pilares,
        ts: Date.now(),
      };

      try { localStorage.setItem('iamResult', JSON.stringify(payload)); } catch(e) {}

      window.location.href = 'resultado.html';

    } catch (err) {
      btnSubmit.textContent = 'Ver meu resultado completo →';
      btnSubmit.disabled = false;
      alert('Algo deu errado. Tente novamente.');
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
    open:        abrir,
    close:       fechar,
    advance:     avancar,
    back:        voltar,
    submitLead:  enviarLead,
  };
})();
