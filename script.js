// ================== CONFIG ==================
const CHECKOUT_URL = "https://checkout.hotmart.com/SEU-PRODUTO";

// se quiser enviar lead via webhook (Make/n8n/Zapier), cole aqui.
// se ficar vazio, só salva localStorage e segue.
const WEBHOOK_URL = "";

// ================== UTILS ==================
function shuffle(arr, seed) {
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
function validEmail(x){ return typeof x === "string" && x.includes("@") && x.includes("."); }

function tierFrom(iam){
  if (iam < 40) return "Base: você está deixando atração morrer no modo ‘seguro’. Dá pra corrigir rápido.";
  if (iam < 70) return "Intermediário: você tem tração — mas ainda entrega neutralidade em pontos críticos.";
  return "Alto: você gera impacto. Agora é consistência e refinamento (sem cair no automático).";
}

function prettyPillar(key){
  return ({
    aparencia: "Aparência & Impacto",
    atitude: "Atitude Dominante",
    social: "Jogo Social",
    presenca: "Presença Magnética",
    magnetismo: "Magnetismo",
    status: "Ambição & Status",
    emocional: "Controle Emocional",
    energia: "Energia",
  })[key] || key;
}

// ================== QUIZ DATA ==================
const QUIZ = {
  pillars: [
    { key:"aparencia" }, { key:"atitude" }, { key:"social" }, { key:"presenca" },
    { key:"magnetismo" }, { key:"status" }, { key:"emocional" }, { key:"energia" },
  ],
  questions: [
    // Aparência (3)
    { id:"P1", pillar:"aparencia", text:"Quando você se olha no espelho antes de sair, o que passa mais pela sua cabeça?",
      options:[
        { label:"Eu sei que vou chamar atenção.", score:5 },
        { label:"Eu sei que as pessoas vão notar.", score:4 },
        { label:"Tô apresentável.", score:3 },
        { label:"Tá ok, nada demais.", score:2 },
        { label:"Tanto faz, ninguém vai reparar mesmo.", score:1 },
      ]},
    { id:"P2", pillar:"aparencia", text:"Com que frequência você recebe elogios espontâneos sobre sua aparência?",
      options:[
        { label:"Constantemente (quase todo dia).", score:5 },
        { label:"Com frequência (toda semana).", score:4 },
        { label:"De vez em quando (algumas vezes no mês).", score:3 },
        { label:"Raramente (talvez 1x por mês).", score:2 },
        { label:"Nunca ou quase nunca.", score:1 },
      ]},
    { id:"P3", pillar:"aparencia", text:"Sua postura quando está andando ou conversando costuma ser:",
      options:[
        { label:"Comandante — eu ocupo espaço naturalmente.", score:5 },
        { label:"Confiante, peito aberto, cabeça erguida.", score:4 },
        { label:"Razoavelmente ereta na maioria das vezes.", score:3 },
        { label:"Meio relaxada, mas nada marcante.", score:2 },
        { label:"Curvada, olhando pro chão, ombros caídos.", score:1 },
      ]},

    // Atitude (3)
    { id:"P4", pillar:"atitude", text:"Quando você entra num ambiente cheio de gente (festa, bar, evento):",
      options:[
        { label:"Tomo conta do ambiente — as pessoas me notam.", score:5 },
        { label:"Circulo pelo ambiente com naturalidade.", score:4 },
        { label:"Fico tranquilo, espero as coisas acontecerem.", score:3 },
        { label:"Procuro alguém conhecido pra não ficar sozinho.", score:2 },
        { label:"Fico no canto, evito chamar atenção.", score:1 },
      ]},
    { id:"P5", pillar:"atitude", text:"Ao falar com alguém que te atrai, você:",
      options:[
        { label:"Domino a conversa com o olhar — crio tensão.", score:5 },
        { label:"Sustento o olhar com confiança.", score:4 },
        { label:"Mantenho contato visual normal.", score:3 },
        { label:"Olho de vez em quando mas desvio rápido.", score:2 },
        { label:"Evito olhar nos olhos, fico nervoso.", score:1 },
      ]},
    { id:"P6", pillar:"atitude", text:"Quando alguém te desafia ou discorda de você publicamente:",
      options:[
        { label:"Mantenho controle total — nada me abala.", score:5 },
        { label:"Me posiciono firme sem perder a calma.", score:4 },
        { label:"Respondo mas fico abalado.", score:3 },
        { label:"Fico incomodado mas não respondo.", score:2 },
        { label:"Fico sem reação, engulo seco.", score:1 },
      ]},

    // Social (3)
    { id:"P7", pillar:"social", text:"Em um rolê novo (festa, evento, churrasco), você:",
      options:[
        { label:"Viro peça central — todo mundo quer falar comigo.", score:5 },
        { label:"Conheço várias pessoas, faço conexões.", score:4 },
        { label:"Converso com algumas pessoas naturalmente.", score:3 },
        { label:"Falo com 1 ou 2 pessoas novas se pintar.", score:2 },
        { label:"Fico grudado em quem eu já conheço.", score:1 },
      ]},
    { id:"P8", pillar:"social", text:"Seu círculo social atual é:",
      options:[
        { label:"Rede social forte — eu conecto pessoas.", score:5 },
        { label:"Vários grupos, sempre tem rolê.", score:4 },
        { label:"Grupo fixo de amigos, saio de vez em quando.", score:3 },
        { label:"Poucos amigos próximos, pouca movimentação.", score:2 },
        { label:"Praticamente inexistente ou só online.", score:1 },
      ]},
    { id:"P9", pillar:"social", text:"Quando você conta uma história ou faz uma piada:",
      options:[
        { label:"Eu comando a atenção — todos param pra ouvir.", score:5 },
        { label:"As pessoas riem e se envolvem.", score:4 },
        { label:"Geralmente as pessoas prestam atenção.", score:3 },
        { label:"Às vezes funciona, às vezes não.", score:2 },
        { label:"As pessoas ignoram ou não reagem.", score:1 },
      ]},

    // Presença (3)
    { id:"P10", pillar:"presenca", text:"Quando você fala, sua voz soa:",
      options:[
        { label:"Comandante — minha voz domina o ambiente.", score:5 },
        { label:"Firme, pausada, com presença.", score:4 },
        { label:"Clara e audível.", score:3 },
        { label:"Normal mas sem impacto.", score:2 },
        { label:"Baixa, rápida, insegura.", score:1 },
      ]},
    { id:"P11", pillar:"presenca", text:"Sua linguagem corporal (gestos, expressões) ao conversar é:",
      options:[
        { label:"Totalmente fluida — meu corpo fala tanto quanto minha voz.", score:5 },
        { label:"Expressiva, uso gestos pra enfatizar.", score:4 },
        { label:"Natural, gesticula às vezes.", score:3 },
        { label:"Contida, poucos gestos.", score:2 },
        { label:"Travada, braços cruzados, sem movimento.", score:1 },
      ]},
    { id:"P12", pillar:"presenca", text:"As pessoas te pedem pra repetir o que você disse?",
      options:[
        { label:"Nunca — eu falo com clareza total.", score:5 },
        { label:"Raramente.", score:4 },
        { label:"Às vezes.", score:3 },
        { label:"Frequentemente.", score:2 },
        { label:"Sempre, ninguém entende de primeira.", score:1 },
      ]},

    // Magnetismo (3)
    { id:"P13", pillar:"magnetismo", text:"Quando você flerta com alguém que te atrai:",
      options:[
        { label:"Eu domino o flerte — a tensão é óbvia.", score:5 },
        { label:"Flerto naturalmente, crio tensão.", score:4 },
        { label:"Consigo criar alguma conexão.", score:3 },
        { label:"Tento mas soa forçado/estranho.", score:2 },
        { label:"Não sei flertar, fico travado.", score:1 },
      ]},
    { id:"P14", pillar:"magnetismo", text:"Você usa toque físico leve (ombro, braço) ao conversar?",
      options:[
        { label:"Sempre — toque faz parte da minha presença.", score:5 },
        { label:"Frequentemente, de forma calibrada.", score:4 },
        { label:"De vez em quando, quando parece natural.", score:3 },
        { label:"Raramente, só se a pessoa tocar primeiro.", score:2 },
        { label:"Nunca, tenho medo de invadir espaço.", score:1 },
      ]},
    { id:"P15", pillar:"magnetismo", text:"As pessoas tendem a te ver como:",
      options:[
        { label:"Sou visto como desejável — isso é claro.", score:5 },
        { label:"Geralmente gero interesse.", score:4 },
        { label:"Às vezes rola interesse, às vezes não.", score:3 },
        { label:"Cara gente boa — nada além disso.", score:2 },
        { label:"Amigo legal — sem atração.", score:1 },
      ]},

    // Status (3)
    { id:"P16", pillar:"status", text:"Quando alguém pergunta “o que você anda fazendo?”, você:",
      options:[
        { label:"Falo com paixão — as pessoas sentem energia.", score:5 },
        { label:"Falo dos meus projetos com clareza.", score:4 },
        { label:"Tenho algo pra falar mas nada empolgante.", score:3 },
        { label:"Falo algo genérico sem entusiasmo.", score:2 },
        { label:"Não tenho resposta, tô perdido.", score:1 },
      ]},
    { id:"P17", pillar:"status", text:"Você tem metas claras pro próximo ano?",
      options:[
        { label:"Tenho visão de longo prazo e executo diariamente.", score:5 },
        { label:"Tenho metas claras e estou agindo nelas.", score:4 },
        { label:"Tenho algumas metas definidas.", score:3 },
        { label:"Tenho ideias vagas.", score:2 },
        { label:"Não, vivo no automático.", score:1 },
      ]},
    { id:"P18", pillar:"status", text:"As pessoas te veem como alguém que:",
      options:[
        { label:"Tá no caminho do sucesso — isso é óbvio.", score:5 },
        { label:"Tá construindo algo sólido.", score:4 },
        { label:"Tá caminhando, mas devagar.", score:3 },
        { label:"Tá tentando mas sem muito progresso.", score:2 },
        { label:"Não tem direção, tá parado.", score:1 },
      ]},

    // Emocional (3)
    { id:"P19", pillar:"emocional", text:"Quando algo te irrita ou frustra:",
      options:[
        { label:"Nada me tira do eixo — controle total.", score:5 },
        { label:"Mantenho a calma quase sempre.", score:4 },
        { label:"Consigo controlar na maioria das vezes.", score:3 },
        { label:"Fico irritado mas tento esconder.", score:2 },
        { label:"Explodo ou fico visivelmente abalado.", score:1 },
      ]},
    { id:"P20", pillar:"emocional", text:"Quando você leva um fora ou rejeição:",
      options:[
        { label:"Nem registro — não me afeta.", score:5 },
        { label:"Aceito numa boa, não me abala.", score:4 },
        { label:"Fico chateado mas sigo em frente.", score:3 },
        { label:"Fico bem mal, demoro pra superar.", score:2 },
        { label:"Fico destruído, penso nisso por dias.", score:1 },
      ]},
    { id:"P21", pillar:"emocional", text:"Você percebe quando alguém está chateado sem a pessoa falar?",
      options:[
        { label:"Sempre — leio emoções facilmente.", score:5 },
        { label:"Geralmente leio bem as pessoas.", score:4 },
        { label:"Às vezes percebo sinais.", score:3 },
        { label:"Raramente noto.", score:2 },
        { label:"Nunca, só percebo se alguém me contar.", score:1 },
      ]},

    // Energia (3)
    { id:"P22", pillar:"energia", text:"Seu nível de energia no dia a dia é:",
      options:[
        { label:"Intenso — as pessoas sentem minha energia.", score:5 },
        { label:"Alto na maior parte do tempo.", score:4 },
        { label:"Razoável, varia bastante.", score:3 },
        { label:"Mediano, só tenho energia quando preciso.", score:2 },
        { label:"Baixo, vivo cansado/desmotivado.", score:1 },
      ]},
    { id:"P23", pillar:"energia", text:"Quando você chega num lugar, a energia muda?",
      options:[
        { label:"Sempre — eu mudo a vibe do ambiente.", score:5 },
        { label:"Geralmente minha entrada é notada.", score:4 },
        { label:"As pessoas próximas notam.", score:3 },
        { label:"Às vezes alguém percebe.", score:2 },
        { label:"Não, ninguém nota minha presença.", score:1 },
      ]},
    { id:"P24", pillar:"energia", text:"As pessoas te descrevem como:",
      options:[
        { label:"Magnético — todo mundo quer estar perto.", score:5 },
        { label:"Animado, positivo.", score:4 },
        { label:"Legal, de boa.", score:3 },
        { label:"Tranquilo mas sem muito brilho.", score:2 },
        { label:"Apático, sem graça, negativo.", score:1 },
      ]},
  ]
};

// ================== STATE ==================
const state = {
  open: false,
  idx: 0,
  answers: {}, // id -> { label, score, pillar }
  sessionSeed: Math.floor(Math.random() * 999999) + 1,
};

// ================== DOM ==================
const overlay = document.getElementById("modalOverlay");
const openQuizBtn = document.getElementById("openQuizBtn");
const openQuizBtnMid = document.getElementById("openQuizBtnMid");
const openQuizBtnBottom = document.getElementById("openQuizBtnBottom");
const closeModalBtn = document.getElementById("closeModalBtn");

const quizView = document.getElementById("quizView");
const leadView = document.getElementById("leadView");

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

document.getElementById("year").textContent = new Date().getFullYear();

// ================== MODAL CONTROL ==================
function resetAll(){
  state.idx = 0;
  state.answers = {};
  state.sessionSeed = Math.floor(Math.random() * 999999) + 1;

  quizView.classList.remove("hidden");
  leadView.classList.add("hidden");

  leadName.value = "";
  leadEmail.value = "";
  leadPhone.value = "";

  prevBtn.disabled = true;
  nextBtn.disabled = true;
  nextBtn.textContent = "Próxima";

  stepLabel.textContent = `Pergunta 1 de ${QUIZ.questions.length}`;
  barFill.style.width = "0%";
}

function openModal(){
  state.open = true;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  resetAll();
  renderQuestion();
}

function closeModal(){
  state.open = false;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

overlay.addEventListener("mousedown", (e) => {
  if (e.target === overlay) closeModal();
});

// ================== RENDER ==================
function renderQuestion(){
  const total = QUIZ.questions.length;
  const q = QUIZ.questions[state.idx];
  const progress = Math.round(((state.idx + 1) / total) * 100);

  stepLabel.textContent = `Pergunta ${state.idx + 1} de ${total}`;
  barFill.style.width = `${progress}%`;

  questionText.textContent = q.text;

  // Embaralha opções por pergunta (anti "vou marcar sempre a última")
  const seed = state.sessionSeed + (state.idx + 1) * 1337;
  const opts = shuffle(q.options, seed);

  optionsWrap.innerHTML = "";

  const saved = state.answers[q.id]?.label;

  opts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.type = "button";
    btn.textContent = opt.label;

    if (saved && saved === opt.label) btn.classList.add("selected");

    btn.addEventListener("click", () => {
      state.answers[q.id] = { label: opt.label, score: opt.score, pillar: q.pillar };
      [...optionsWrap.querySelectorAll(".opt")].forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.disabled = false;
    });

    optionsWrap.appendChild(btn);
  });

  prevBtn.disabled = state.idx === 0;
  nextBtn.disabled = !state.answers[q.id];

  nextBtn.textContent = (state.idx === total - 1) ? "Finalizar diagnóstico" : "Próxima";
}

// ================== NAV ==================
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
    quizView.classList.add("hidden");
    leadView.classList.remove("hidden");
    stepLabel.textContent = "Seu diagnóstico está pronto";
  }
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

backToQuizBtn.addEventListener("click", () => {
  leadView.classList.add("hidden");
  quizView.classList.remove("hidden");
  // volta para a última pergunta
  state.idx = QUIZ.questions.length - 1;
  renderQuestion();
});

// ================== RESULT COMPUTE ==================
function computeResult(){
  const sums = {};
  QUIZ.pillars.forEach(p => sums[p.key] = 0);

  Object.values(state.answers).forEach(a => {
    sums[a.pillar] += a.score;
  });

  // cada pilar tem 3 perguntas: min 3, max 15
  const pct = {};
  Object.entries(sums).forEach(([pillar, sum]) => {
    const p = Math.round(((sum - 3) / 12) * 100);
    pct[pillar] = clamp(p, 0, 100);
  });

  const values = Object.values(pct);
  const iam = clamp(Math.round(values.reduce((acc, v) => acc + v, 0) / values.length), 0, 100);

  const sorted = Object.entries(pct).sort((a,b) => b[1] - a[1]);

  const highlights = sorted.slice(0,2).map(([k]) => prettyPillar(k));
  const priorities = sorted.slice(-2).map(([k]) => prettyPillar(k));

  return { iam, pct, highlights, priorities };
}

async function postWebhook(payload){
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

// ================== LEAD SUBMIT ==================
async function handleSeeResult(){
  const name = leadName.value.trim();
  const email = leadEmail.value.trim();
  const phone = leadPhone.value.trim();

  if (!name || !validEmail(email) || !phone){
    alert("Preencha nome, email e telefone.");
    return;
  }

  const result = computeResult();

  const payload = {
    lead: { name, email, phone },
    result,
    answers: state.answers,
    checkoutUrl: CHECKOUT_URL,
    createdAt: new Date().toISOString(),
    source: "iam-static"
  };

  // salva local para a página de resultado ler
  localStorage.setItem("iam_result_v1", JSON.stringify(payload));

  // opcional: webhook
  await postWebhook(payload);

  // redireciona
  window.location.href = "/resultado.html";
}

seeResultBtn.addEventListener("click", handleSeeResult);

// ================== CTA BINDS ==================
openQuizBtn.addEventListener("click", openModal);
openQuizBtnMid.addEventListener("click", openModal);
openQuizBtnBottom.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
