// ===== SCHEDULE MODULE =====
// Turmas are loaded from /data/turmas/<id>.json
// To add a new turma: create the JSON file and add its id to /data/turmas/index.json

// ── Real ACH discipline codes from EACH/USP SI curriculum ─────────────────
const DISCIPLINE_MAP = {
  'ACH0021': 'Tratamento e Análise de Dados e Informações',
  'ACH0041': 'Resolução de Problemas I',
  'ACH2001': 'Introdução à Programação',
  'ACH2011': 'Cálculo I',
  'ACH2014': 'Fundamentos de Sistemas de Informação',
  'ACH2002': 'Introdução à Análise de Algoritmos',
  'ACH2012': 'Cálculo II',
  'ACH2013': 'Matemática Discreta I',
  'ACH2023': 'Algoritmos e Estruturas de Dados I',
  'ACH2033': 'Matrizes, Vetores e Geometria Analítica',
  'ACH2003': 'Computação Orientada a Objetos',
  'ACH2024': 'Algoritmos e Estruturas de Dados II',
  'ACH2034': 'Organização e Arquitetura de Computadores I',
  'ACH2053': 'Introdução à Estatística',
  'ACH2035': 'Introdução à Administração e Economia para Computação',
  'ACH2004': 'Bancos de Dados 1',
  'ACH2044': 'Redes de Computadores',
  'ACH2063': 'Métodos Quantitativos para Análise Multivariada',
  'ACH2026': 'Sistemas Operacionais',
  'ACH2036': 'Organização e Arquitetura de Computadores II',
  'ACH2005': 'Análise, Projeto e Interface Humano-Computador',
  'ACH2055': 'Inteligência Artificial',
  'ACH2016': 'Bancos de Dados 2',
  'ACH2025': 'Introdução à Teoria da Computação',
  'ACH2147': 'Desenvolvimento de Sistemas de Informação Distribuídos',
  'ACH2043': 'Resolução de Problemas II',
  'ACH2006': 'Engenharia de Sistemas de Informação I',
  'ACH2008': 'Empreendedorismo em Informática',
  'ACH2027': 'Gestão de Projetos de Tecnologia da Informação',
  'ACH2017': 'Projeto Supervisionado ou de Graduação I',
  'ACH2018': 'Projeto Supervisionado ou de Graduação II',
  'ACH0042': 'Resolução de Problemas III (CB)',
  'ACH0101': 'Ciências da Natureza – Ciências da Terra',
  'ACH0111': 'Ciências da Natureza – Ciências da Vida',
  'ACH0121': 'Ciências da Natureza – Ciências do Universo',
  'ACH0131': 'Ciências da Natureza – Ciência, Cultura e Sociedade',
  'ACH0141': 'Sociedade, Multiculturalismo e Direitos',
  'ACH0151': 'Sociedade, Multiculturalismo e Direitos – Cultura Digital',
  'ACH0161': 'Sociedade, Multiculturalismo e Direitos – Direitos Humanos e Multiculturalismo',
  'ACH0102': 'Psicologia, Educação e Temas Contemporâneos',
  'ACH0112': 'Psicologia, Educação e Temas Contemporâneos – Visão Psicanalítica',
  'ACH0122': 'Psicologia, Educação e Temas Contemporâneos – Processos Sociais',
  'ACH0132': 'Psicologia, Educação e Temas Contemporâneos – Abordagem Crítica',
  'ACH0142': 'Sociedade, Meio Ambiente e Cidadania – Desenvolvimento e Meio Ambiente',
  'ACH0152': 'Sociedade, Meio Ambiente e Cidadania – Sociedade, Ambiente e Cidadania',
  'ACH0162': 'Resolução de Problemas IV (CB)',
  'ACH2107': 'Análise de Redes Sociais',
  'ACH2197': 'Análise de Redes Sociais',
};

// ── Correct JupiterWeb URL (verified format) ──────────────────────────────
function getDisciplineURL(code) {
  return `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${code}`;
}

function getDisciplineName(code) {
  return DISCIPLINE_MAP[code] || code;
}

// ── State ──────────────────────────────────────────────────────────────────
let turmasList = [];
let turmasCache = {};
let currentTurmaId = null;

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// ── Init ───────────────────────────────────────────────────────────────────
async function initSchedule() {
  const ids = await fetchJSON('./data/turmas/index.json');
  turmasList = ids || [];

  if (!turmasList.length) {
    el('#schedule-grid').innerHTML = `<div class="empty-state"><p>Nenhuma turma cadastrada.</p></div>`;
    return;
  }

  currentTurmaId = turmasList[0];
  renderTurmaSelector();
  await loadAndRenderTurma(currentTurmaId);
}

function renderTurmaSelector() {
  const container = el('#semester-buttons');
  if (!container) return;

  container.innerHTML = turmasList.map(id => `
    <button class="sem-btn ${id === currentTurmaId ? 'active' : ''}"
            onclick="selectTurma('${id}', this)">
      ${id}
    </button>
  `).join('');
}

async function selectTurma(id, btn) {
  currentTurmaId = id;
  els('.sem-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  await loadAndRenderTurma(id);
}

async function loadAndRenderTurma(id) {
  const grid = el('#schedule-grid');
  if (!grid) return;

  if (!turmasCache[id]) {
    grid.innerHTML = `<div class="loading-spinner"><div class="spinner"></div>Carregando turma...</div>`;
    const data = await fetchJSON(`./data/turmas/${id}.json`);
    turmasCache[id] = data;
  }

  const turma = turmasCache[id];
  if (!turma) {
    grid.innerHTML = `<div class="empty-state"><p>Não foi possível carregar a turma ${id}.</p></div>`;
    return;
  }

  renderTurmaHeader(turma);
  renderTimetable(turma);
}

function renderTurmaHeader(turma) {
  const header = el('#schedule-turma-header');
  if (!header) return;

  const count = (turma.aulas || []).length;
  header.innerHTML = `
    <span class="badge badge-purple">${turma.label}</span>
    <span style="font-size:13px; color:var(--text-muted); font-family:var(--font-mono);">${turma.semester || ''}</span>
    <span style="font-size:12px; color:var(--text-dim); font-family:var(--font-mono);">${count} aula${count !== 1 ? 's' : ''}</span>
  `;
}

function renderTimetable(turma) {
  const grid = el('#schedule-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const aulas = turma.aulas || [];

  if (!aulas.length) {
    grid.innerHTML = `<div class="empty-state"><p>Nenhuma aula cadastrada para esta turma.<br><span style="font-size:12px;">Edite <code>data/turmas/${turma.id}.json</code> para adicionar aulas.</span></p></div>`;
    return;
  }

  // Group by day
  const byDay = {};
  DIAS.forEach(d => { byDay[d] = []; });
  aulas.forEach(a => {
    if (byDay[a.dia] !== undefined) byDay[a.dia].push(a);
  });

  // Render days that have aulas
  DIAS.forEach((dia, dIdx) => {
    const dayAulas = byDay[dia];
    if (!dayAulas.length) return;

    const daySection = document.createElement('div');
    daySection.className = 'timetable-day anim-fade-up';
    daySection.style.animationDelay = `${dIdx * 0.06}s`;

    const dayLabel = document.createElement('div');
    dayLabel.className = 'timetable-day-label';
    dayLabel.textContent = dia;
    daySection.appendChild(dayLabel);

    dayAulas
      .sort((a, b) => timeToMinutes(a.inicio) - timeToMinutes(b.inicio))
      .forEach(aula => {
        const name  = getDisciplineName(aula.codigo);
        const url   = getDisciplineURL(aula.codigo);
        const color = hashStringToColor(aula.codigo);

        const card = document.createElement('a');
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'course-card course-card-link card-shine';

        card.innerHTML = `
          <div class="course-color-bar" style="background:${color};"></div>
          <div class="course-card-body">
            <div class="timetable-time">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${aula.inicio}–${aula.fim}
            </div>
            <div style="flex:1; min-width:0;">
              <div class="course-name">${name}</div>
              <div class="timetable-code">
                <span style="color:${color}; font-weight:600;">${aula.codigo}</span>
                ${aula.turma ? `<span style="color:var(--text-dim);">· T${aula.turma}</span>` : ''}
              </div>
            </div>
            <div class="course-link-hint">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              JupiterWeb
            </div>
          </div>
        `;

        daySection.appendChild(card);
      });

    grid.appendChild(daySection);
  });
}
