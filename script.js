/* ========= Config rápida ========= */

// Coloque seu checkout aqui (Hotmart, Kiwify, etc.)
const CHECKOUT_URL = "https://checkout.hotmart.com/SEU-PRODUTO";

// Se você quiser capturar lead sem backend:
// cole aqui um webhook do Make/n8n/Pipedream. Se ficar vazio, só loga no console.
const WEBHOOK_URL = ""; // ex: "https://hook.us1.make.com/xxxxxx"

/* ========= Util ========= */

function shuffle(arr, seed) {
  // shuffle determinístico simples por seed (pra ficar estável por sessão)
  const a = arr.slice();
  let m = a.length;
  let s = seed;
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    const i = Math.floor((s / 233280) * m--);
    [a[m], a[i]] = [a[i], a[m]];
  }
  return a;
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function tierFrom(iam){
  if (iam < 40) return "Base: você tem pontos claros de ajuste (ótimo: dá pra evoluir rápido).";
  if (iam < 70) return "Intermediário: você já tem tração, falta calibrar o que mais impacta atração.";
  return "Alto: você já transmite valor — agora é consistência e refinamento.";
}

function prettyPillar(key){
  const map = {
    aparencia: "Aparência & Impacto",
    atitude: "Atitude Dominante",
    social: "Jogo Social",
    presenca: "Presença Magnética",
    magnetismo: "Magnetismo",
    status: "Ambição & Status",
    emocional: "Controle Emocional",
    energia: "Energia",
  };
  return map[key] || key;
}

/* ========= Perguntas =========
- Mantive seu conteúdo, mas:
  1) embaralho a ordem das alternativas por sessão
  2) pontuação NÃO fica 1..5 linear na tela (fica mapeada por trás)
  3) linguagem sem “fracassado vs fodão” no UI (labels já estão decentes)
*/

const QUIZ = {
  pillars: [
    { key:"aparencia", count:3 },
    { key:"atitude", count:3 },
    { key:"social", count:3 },
    { key:"presenca", count:3 },
    { key:"magnetismo", count:3 },
    { key:"status", count:3 },
    { key:"emocional", count:3 },
    { key:"energia", count:3 },
  ],
  questions: [
    // PILAR 1: APARÊNCIA & IMPACTO
    {
      id:"P1", pillar:"aparencia",
      text:"Quando você se olha no espelho antes de sair, o que passa mais pela sua cabeça?",
      // score “real” escondido no back do array; a UI embaralha
      options:[
        { label:"Eu sei que vou chamar atenção.", score:5 },
        { label:"Tô apresentável.", score:3 },
        { label:"Tá ok, nada demais.", score:2 },
        { label:"Eu sei que as pessoas vão notar.", score:4 },
        { label:"Tanto faz, ninguém vai reparar mesmo.", score:1 },
      ]
    },
    {
      id:"P2", pillar:"aparencia",
      text:"Com que frequência você recebe elogios espontâneos sobre sua aparência?",
      options:[
        { label:"De vez em quando (algumas vezes no mês).", score:3 },
        { label:"Constantemente (quase todo dia).", score:5 },
        { label:"Raramente (talvez 1x por mês).", score:2 },
        { label:"Com frequência (toda semana).", score:4 },
        { label:"Nunca ou quase nunca.", score:1 },
      ]
    },
    {
      id:"P3", pillar:"aparencia",
      text:"Sua postura quando está andando ou conversando costuma ser:",
      options:[
        { label:"Confiante, peito aberto, cabeça erguida.", score:4 },
        { label:"Razoavelmente ereta na maioria das vezes.", score:3 },
        { label:"Curvada, olhando pro chão, ombros caídos.", score:1 },
        { label:"Comandante — eu ocupo espaço naturalmente.", score:5 },
        { label:"Meio relaxada, mas nada marcante.", score:2 },
      ]
    },

    // PILAR 2: ATITUDE DOMINANTE
    {
      id:"P4", pillar:"atitude",
      text:"Quando você entra num ambiente cheio de gente (festa, bar, evento):",
      options:[
        { label:"Circulo pelo ambiente com naturalidade.", score:4 },
        { label:"Fico tranquilo, espero as coisas acontecerem.", score:3 },
        { label:"Procuro alguém conhecido pra não ficar sozinho.", score:2 },
        { label:"Tomo conta do ambiente — as pessoas me notam.", score:5 },
        { label:"Fico no canto, evito chamar atenção.", score:1 },
      ]
    },
    {
      id:"P5", pillar:"atitude",
      text:"Ao falar com alguém que te atrai, você:",
      options:[
        { label:"Mantenho contato visual normal.", score:3 },
        { label:"Sustento o olhar com confiança.", score:4 },
        { label:"Evito olhar nos olhos, fico nervoso.", score:1 },
        { label:"Olho de vez em quando mas desvio rápido.", score:2 },
        { label:"Domino a conversa com o olhar — crio tensão.", score:5 },
      ]
    },
    {
      id:"P6", pillar:"atitude",
      text:"Quando alguém te desafia ou discorda de você publicamente:",
      options:[
        { label:"Me posiciono firme sem perder a calma.", score:4 },
        { label:"Respondo mas fico abalado.", score:3 },
        { label:"Fico incomodado mas não respondo.", score:2 },
        { label:"Mantenho controle total — nada me abala.", score:5 },
        { label:"Fico sem reação, engulo seco.", score:1 },
      ]
    },

    // PILAR 3: JOGO SOCIAL
    {
      id:"P7", pillar:"social",
      text:"Em um rolê novo (festa, evento, churrasco), você:",
      options:[
        { label:"Converso com algumas pessoas naturalmente.", score:3 },
        { label:"Viro peça central — todo mundo quer falar comigo.", score:5 },
        { label:"Fico grudado em quem eu já conheço.", score:1 },
        { label:"Conheço várias pessoas, faço conexões.", score:4 },
        { label:"Falo com 1 ou 2 pessoas novas se pintar.", score:2 },
      ]
    },
    {
      id:"P8", pillar:"social",
      text:"Seu círculo social atual é:",
      options:[
        { label:"Rede social forte — eu conecto pessoas.", score:5 },
        { label:"Grupo fixo de amigos, saio de vez em quando.", score:3 },
        { label:"Poucos amigos próximos, pouca movimentação.", score:2 },
        { label:"Vários grupos, sempre tem rolê.", score:4 },
        { label:"Praticamente inexistente ou só online.", score:1 },
      ]
    },
    {
      id:"P9", pillar:"social",
      text:"Quando você conta uma história ou faz uma piada:",
      options:[
        { label:"As pessoas riem e se envolvem.", score:4 },
        { label:"Geralmente as pessoas prestam atenção.", score:3 },
        { label:"Às vezes funciona, às vezes não.", score:2 },
        { label:"Eu comando a atenção — todos param pra ouvir.", score:5 },
        { label:"As pessoas ignoram ou não reagem.", score:1 },
      ]
    },

    // PILAR 4: PRESENÇA MAGNÉTICA
    {
      id:"P10", pillar:"presenca",
      text:"Quando você fala, sua voz soa:",
      options:[
        { label:"Firme, pausada, com presença.", score:4 },
        { label:"Clara e audível.", score:3 },
        { label:"Normal mas sem impacto.", score:2 },
        { label:"Comandante — minha voz domina o ambiente.", score:5 },
        { label:"Baixa, rápida, insegura.", score:1 },
      ]
    },
    {
      id:"P11", pillar:"presenca",
      text:"Sua linguagem corporal (gestos, expressões) ao conversar é:",
      options:[
        { label:"Expressiva, uso gestos pra enfatizar.", score:4 },
        { label:"Natural, gesticula às vezes.", score:3 },
        { label:"Contida, poucos gestos.", score:2 },
        { label:"Totalmente fluida — meu corpo fala tanto quanto minha voz.", score:5 },
        { label:"Travada, braços cruzados, sem movimento.", score:1 },
      ]
    },
    {
      id:"P12", pillar:"presenca",
      text:"As pessoas te pedem pra repetir o que você disse?",
      options:[
        { label:"Raramente.", score:4 },
        { label:"Às vezes.", score:3 },
        { label:"Frequentemente.", score:2 },
        { label:"Nunca — eu falo com clareza total.", score:5 },
        { label:"Sempre, ninguém entende de primeira.", score:1 },
      ]
    },

    // PILAR 5: MAGNETISMO (sem explicitar sexualidade)
    {
      id:"P13", pillar:"magnetismo",
      text:"Quando você flerta com alguém que te atrai:",
      options:[
        { label:"Flerto naturalmente, crio tensão.", score:4 },
        { label:"Consigo criar alguma conexão.", score:3 },
        { label:"Tento mas soa forçado/estranho.", score:2 },
        { label:"Eu domino o flerte — a tensão é óbvia.", score:5 },
        { label:"Não sei flertar, fico travado.", score:1 },
      ]
    },
    {
      id:"P14", pillar:"magnetismo",
      text:"Você usa toque físico leve (ombro, braço) ao conversar?",
      options:[
        { label:"Frequentemente, de forma calibrada.", score:4 },
        { label:"De vez em quando, quando parece natural.", score:3 },
        { label:"Raramente, só se a pessoa tocar primeiro.", score:2 },
        { label:"Sempre — toque faz parte da minha presença.", score:5 },
        { label:"Nunca, tenho medo de invadir espaço.", score:1 },
      ]
    },
    {
      id:"P15", pillar:"magnetismo",
      text:"As pessoas tendem a te ver como:",
      options:[
        { label:"Geralmente gero interesse.", score:4 },
        { label:"Às vezes rola interesse, às vezes não.", score:3 },
        { label:"Cara gente boa — nada além disso.", score:2 },
        { label:"Sou visto como desejável — isso é claro.", score:5 },
        { label:"Amigo legal — sem atração.", score:1 },
      ]
    },

    // PILAR 6: AMBIÇÃO & STATUS
    {
      id:"P16", pillar:"status",
      text:"Quando alguém pergunta “o que você anda fazendo?”, você:",
      options:[
        { label:"Falo dos meus projetos com clareza.", score:4 },
        { label:"Tenho algo pra falar mas nada empolgante.", score:3 },
        { label:"Falo com paixão — as pessoas sentem energia.", score:5 },
        { label:"Falo algo genérico sem entusiasmo.", score:2 },
        { label:"Não tenho resposta, tô perdido.", score:1 },
      ]
    },
    {
      id:"P17", pillar:"status",
      text:"Você tem metas claras pro próximo ano?",
      options:[
        { label:"Tenho metas claras e estou agindo nelas.", score:4 },
        { label:"Tenho algumas metas definidas.", score:3 },
        { label:"Tenho visão de longo prazo e executo diariamente.", score:5 },
        { label:"Tenho ideias vagas.", score:2 },
        { label:"Não, vivo no automático.", score:1 },
      ]
    },
    {
      id:"P18", pillar:"status",
      text:"As pessoas te veem como alguém que:",
      options:[
        { label:"Tá construindo algo sólido.", score:4 },
        { label:"Tá caminhando, mas devagar.", score:3 },
        { label:"Tá tentando mas sem muito progresso.", score:2 },
        { label:"Tá no caminho do sucesso — isso é óbvio.", score:5 },
        { label:"Não tem direção, tá parado.", score:1 },
      ]
    },

    // PILAR 7: CONTROLE EMOCIONAL
    {
      id:"P19", pillar:"emocional",
      text:"Quando algo te irrita ou frustra:",
      options:[
        { label:"Mantenho a calma quase sempre.", score:4 },
        { label:"Consigo controlar na maioria das vezes.", score:3 },
        { label:"Fico irritado mas tento esconder.", score:2 },
        { label:"Nada me tira do eixo — controle total.", score:5 },
        { label:"Explodo ou fico visivelmente abalado.", score:1 },
      ]
    },
    {
      id:"P20", pillar:"emocional",
      text:"Quando você leva um fora ou rejeição:",
      options:[
        { label:"Aceito numa boa, não me abala.", score:4 },
        { label:"Fico chateado mas sigo em frente.", score:3 },
        { label:"Fico bem mal, demoro pra superar.", score:2 },
        { label:"Nem registro — não me afeta.", score:5 },
        { label:"Fico destruído, penso nisso por dias.", score:1 },
      ]
    },
    {
      id:"P21", pillar:"emocional",
      text:"Você percebe quando alguém está chateado sem a pessoa falar?",
      options:[
        { label:"Geralmente leio bem as pessoas.", score:4 },
        { label:"Às vezes percebo sinais.", score:3 },
        { label:"Raramente noto.", score:2 },
        { label:"Sempre — leio emoções facilmente.", score:5 },
        { label:"Nunca, só percebo se alguém me contar.", score:1 },
      ]
    },

    // PILAR 8: ENERGIA
    {
      id:"P22", pillar:"energia",
      text:"Seu nível de energia no dia a dia é:",
      options:[
        { label:"Alto na maior parte do tempo.", score:4 },
        { label:"Razoável, varia bastante.", score:3 },
        { label:"Mediano, só tenho energia quando preciso.", score:2 },
        { label:"Intenso — as pessoas sentem minha energia.", score:5 },
        { label:"Baixo, vivo cansado/desmotivado.", score:1 },
      ]
    },
    {
      id:"P23", pillar:"energia",
      text:"Quando você chega num lugar, a energia muda?",
      options:[
        { label:"Geralmente minha entrada é notada.", score:4 },
        { label:"As pessoas próximas notam.", score:3 },
        { label:"Às vezes alguém percebe.", score:2 },
        { label:"Sempre — eu mudo a vibe do ambiente.", score:5 },
        { label:"Não, ninguém nota minha presença.", score:1 },
      ]
    },
    {
      id:"P24", pillar:"energia",
      text:"As pessoas te descrevem como:",
      options:[
        { label:"Animado, positivo.", score:4 },
        { label:"Legal, de boa.", score:3 },
        { label:"Tranquilo mas sem muito brilho.", score:2 },
        { label:"Magnético — todo mundo quer estar perto.", score:5 },
        { label:"Apático, sem graça, negativo.", score:1 },
      ]
    },
  ]
};

/* ========= Estado ========= */

const state = {
  open: false,
  idx: 0,
  // armazenamos por id: { chosenIndex, score }
  answers: {},
  sessionSeed: Math.floor(Math.random() * 999999) + 1,
};

/* ========= DOM ========= */

const overlay = document.getElementById("modalOverlay");
const openQuizBtn = document.getElementById("openQuizBtn");
const openQuizBtn2 = document.getElementById("openQuizBtn2");
const closeModalBtn = document.getElementById("closeModalBtn");

const quizView = document.getElementById("quizView");
const leadView = document.getElementById("leadView");
const resultView = document.getElementById("resultView");

const stepLabel = document.getElementById("stepLabel");
const barFill = document.getElementById("barFill");

const questionText = document.getElementById("questionText");
const optionsWrap = document.getElementById("optionsWrap");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const leadName = document.getElementById("leadName");
const leadEmail = document.getElementById("leadEmail");
const leadPhone = document.getElementById("leadPhone");
const backToQuizBtn = document.getElementById("backToQuizBtn");
const seeResultBtn = document.getElementById("seeResultBtn");

const iamScore = document.getElementById("iamScore");
const iamTier = document.getElementById("iamTier");
const highlightsList = document.getElementById("highlightsList");
const prioritiesList = document.getElementById("prioritiesList");
const pillarsBars = document.getElementById("pillarsBars");
const checkoutBtn = document.getElementById("checkoutBtn");
const restartBtn = document.getElementById("restartBtn");
const closeAfterBtn = document.getElementById("closeAfterBtn");

/* ========= Modal control ========= */

function openModal(){
  state.open = true;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  showQuiz();
  renderQuestion();
}

function closeModal(){
  state.open = false;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  resetAll();
}

function resetAll(){
  state.idx = 0;
  state.answers = {};
  state.sessionSeed = Math.floor(Math.random() * 999999) + 1;

  // reset views
  quizView.classList.remove("hidden");
  leadView.classList.add("hidden");
  resultView.classList.add("hidden");

  // reset inputs
  leadName.value = "";
  leadEmail.value = "";
  leadPhone.value = "";

  // reset buttons
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  nextBtn.textContent = "Próxima";

  stepLabel.textContent = `Pergunta 1 de ${QUIZ.questions.length}`;
  barFill.style.width = "0%";
}

/* ========= Views ========= */

function showQuiz(){
  quizView.classList.remove("hidden");
  leadView.classList.add("hidden");
  resultView.classList.add("hidden");
}

function showLead(){
  quizView.classList.add("hidden");
  leadView.classList.remove("hidden");
  resultView.classList.add("hidden");
  stepLabel.textContent = "Seu diagnóstico está pronto";
}

function showResult(){
  quizView.classList.add("hidden");
  leadView.classList.add("hidden");
  resultView.classList.remove("hidden");
  stepLabel.textContent = "Resultado";
}

/* ========= Quiz render ========= */

function renderQuestion(){
  const total = QUIZ.questions.length;
  const q = QUIZ.questions[state.idx];
  const progress = Math.round(((state.idx + 1) / total) * 100);

  stepLabel.textContent = `Pergunta ${state.idx + 1} de ${total}`;
  barFill.style.width = `${progress}%`;

  questionText.textContent = q.text;

  // embaralha opções por pergunta (seed + idx)
  const seed = state.sessionSeed + (state.idx + 1) * 1337;
  const opts = shuffle(q.options, seed).map((o, i) => ({
    ...o,
    // cria id estável do item embaralhado
    _uid: `${q.id}_${i}_${seed}`
  }));

  // guarda referência do embaralhado para seleção
  const chosen = state.answers[q.id]?.chosenIndex ?? null;

  optionsWrap.innerHTML = "";
  opts.forEach((opt, displayIndex) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.type = "button";
    btn.textContent = opt.label;

    // marca selecionado comparando label (mais simples e suficiente)
    if (chosen !== null && state.answers[q.id]?.label === opt.label) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      // salva resposta com score REAL (não exibido)
      state.answers[q.id] = {
        chosenIndex: displayIndex,
        label: opt.label,
        score: opt.score,
        pillar: q.pillar
      };

      // atualiza seleção visual
      [...optionsWrap.querySelectorAll(".opt")].forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");

      nextBtn.disabled = false;
    });

    optionsWrap.appendChild(btn);
  });

  prevBtn.disabled = state.idx === 0;

  // next habilitado se já respondeu
  nextBtn.disabled = !state.answers[q.id];

  // texto do next
  nextBtn.textContent = (state.idx === total - 1) ? "Finalizar" : "Próxima";
}

/* ========= Navegação ========= */

function goPrev(){
  if (state.idx <= 0) return;
  state.idx -= 1;
  renderQuestion();
}

function goNext(){
  const total = QUIZ.questions.length;
  const q = QUIZ.questions[state.idx];
  if (!state.answers[q.id]) return;

  if (state.idx < total - 1) {
    state.idx += 1;
    renderQuestion();
  } else {
    showLead();
  }
}

/* ========= Resultado ========= */

function computeResult(){
  // soma por pilar
  const sums = {};
  const maxPerPillar = 15; // 3 perguntas * 5

  QUIZ.pillars.forEach(p => sums[p.key] = 0);

  Object.values(state.answers).forEach(a => {
    sums[a.pillar] += a.score;
  });

  // converter 3..15 => 0..100
  const pct = {};
  Object.entries(sums).forEach(([pillar, sum]) => {
    // mínimo teórico = 3, máximo = 15
    const p = Math.round(((sum - 3) / 12) * 100);
    pct[pillar] = clamp(p, 0, 100);
  });

  // IAM média dos pilares
  const values = Object.values(pct);
  const iam = clamp(Math.round(values.reduce((acc, v) => acc + v, 0) / values.length), 0, 100);

  // top2 / bottom2
  const sorted = Object.entries(pct).sort((a,b) => b[1] - a[1]);
  const highlights = sorted.slice(0,2).map(([k]) => prettyPillar(k));
  const priorities = sorted.slice(-2).map(([k]) => prettyPillar(k));

  return { iam, pct, highlights, priorities };
}

async function sendLead(lead, result){
  const payload = {
    lead,
    result,
    answers: state.answers,
    createdAt: new Date().toISOString(),
    source: "iam-static"
  };

  // sempre deixa no console (pra debug e pra você ver)
  console.log("[IAM] LEAD + RESULT", payload);

  if (!WEBHOOK_URL) return;

  try{
    await fetch(WEBHOOK_URL, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });
  }catch(e){
    console.warn("[IAM] webhook falhou", e);
  }
}

function renderResultUI(result){
  iamScore.textContent = String(result.iam);
  iamTier.textContent = tierFrom(result.iam);

  highlightsList.innerHTML = "";
  result.highlights.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    highlightsList.appendChild(li);
  });

  prioritiesList.innerHTML = "";
  result.priorities.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    prioritiesList.appendChild(li);
  });

  pillarsBars.innerHTML = "";
  Object.entries(result.pct).forEach(([pillarKey, value]) => {
    const row = document.createElement("div");
    row.className = "barRow";

    const name = document.createElement("div");
    name.className = "barName";
    name.textContent = prettyPillar(pillarKey);

    const track = document.createElement("div");
    track.className = "barTrack";

    const fill = document.createElement("div");
    fill.className = "barValue";
    fill.style.width = "0%";

    track.appendChild(fill);

    const pct = document.createElement("div");
    pct.className = "barPct";
    pct.textContent = `${value}%`;

    row.appendChild(name);
    row.appendChild(track);
    row.appendChild(pct);

    pillarsBars.appendChild(row);

    // anima depois de montar
    requestAnimationFrame(() => {
      fill.style.width = `${value}%`;
    });
  });

  checkoutBtn.href = CHECKOUT_URL;
}

/* ========= Lead gate ========= */

function validEmail(x){
  return typeof x === "string" && x.includes("@") && x.includes(".");
}

async function handleSeeResult(){
  const name = leadName.value.trim();
  const email = leadEmail.value.trim();
  const phone = leadPhone.value.trim();

  if (!name || !validEmail(email) || !phone){
    alert("Preencha nome, email e telefone.");
    return;
  }

  const result = computeResult();

  await sendLead({ name, email, phone }, result);

  renderResultUI(result);
  showResult();
}

/* ========= Events ========= */

openQuizBtn.addEventListener("click", openModal);
openQuizBtn2.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("mousedown", (e) => {
  if (e.target === overlay) closeModal();
});

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

backToQuizBtn.addEventListener("click", () => {
  showQuiz();
  // volta pra última pergunta
  state.idx = QUIZ.questions.length - 1;
  renderQuestion();
});

seeResultBtn.addEventListener("click", handleSeeResult);

restartBtn.addEventListener("click", () => {
  resetAll();
  showQuiz();
  renderQuestion();
});

closeAfterBtn.addEventListener("click", closeModal);

// init
checkoutBtn.href = CHECKOUT_URL;
resetAll();
