// ===== SCHEDULE MODULE =====

let scheduleData = null;
let currentSemester = '1';

// JupiterWeb base URL for EACH SI course catalog
const JUPITER_BASE = 'https://uspdigital.usp.br/jupiterweb/listarDisciplinas?codcg=86&codcur=86000&codhab=0&tipo=T';

// Map discipline names to their JupiterWeb codes (EACH SI - curso 86000)
const DISCIPLINE_CODES = {
  'Tratamento e Análise de Dados e Informações': '5882',
  'Resolução de Problemas I': '5883',
  'Introdução à Programação': '5884',
  'Cálculo I': '5885',
  'Fundamentos de Sistemas de Informação': '5886',
  'Introdução à Análise de Algoritmos': '5887',
  'Cálculo II': '5888',
  'Matemática Discreta I': '5889',
  'Algoritmos e Estruturas de Dados I': '5890',
  'Matrizes, Vetores e Geometria Analítica': '5891',
  'Computação Orientada a Objetos': '5892',
  'Algoritmos e Estruturas de Dados II': '5893',
  'Organização e Arquitetura de Computadores I': '5894',
  'Introdução à Estatística': '5895',
  'Introdução à Administração e Economia para Computação': '5896',
  'Bancos de Dados 1': '5897',
  'Redes de Computadores': '5898',
  'Métodos Quantitativos para Análise Multivariada': '5899',
  'Sistemas Operacionais': '5900',
  'Organização e Arquitetura de Computadores II': '5901',
  'Análise, Projeto e Interface Humano-Computador': '5902',
  'Inteligência Artificial': '5903',
  'Bancos de Dados 2': '5904',
  'Introdução à Teoria da Computação': '5905',
  'Desenvolvimento de Sistemas de Informação Distribuídos': '5906',
  'Resolução de Problemas II': '5907',
  'Engenharia de Sistemas de Informação I': '5908',
  'Empreendedorismo em Informática': '5909',
  'Gestão de Projetos de Tecnologia da Informação': '5910',
  'Projeto Supervisionado ou de Graduação I': '5911',
  'Projeto Supervisionado ou de Graduação II': '5912',
};

function getDisciplineURL(courseName) {
  const code = DISCIPLINE_CODES[courseName];
  if (code) {
    return `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=ACH${code}&verdis=1`;
  }
  // Fallback: open the full catalog
  return JUPITER_BASE;
}

async function initSchedule() {
  const data = await fetchJSON('./data/schedule.json');
  scheduleData = data || {};
  renderSemesterButtons();
  renderSchedule(currentSemester);
}

function renderSemesterButtons() {
  const container = el('#semester-buttons');
  if (!container) return;

  const semesters = Object.keys(scheduleData).sort((a, b) => Number(a) - Number(b));

  container.innerHTML = semesters.map(sem => `
    <button class="sem-btn ${sem === currentSemester ? 'active' : ''}"
            onclick="selectSemester('${sem}', this)">
      ${sem}º Sem
    </button>
  `).join('');
}

function selectSemester(sem, btn) {
  currentSemester = sem;
  els('.sem-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSchedule(sem);
}

function renderSchedule(sem) {
  const container = el('#schedule-grid');
  if (!container) return;

  const courses = (scheduleData[sem] || []);

  if (!courses.length) {
    container.innerHTML = `<div class="empty-state"><p>Nenhuma disciplina cadastrada para este semestre.</p></div>`;
    return;
  }

  container.innerHTML = '';

  courses.forEach((course, i) => {
    const color = hashStringToColor(course.course);
    const url = getDisciplineURL(course.course);

    const card = document.createElement('a');
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'course-card course-card-link card-shine anim-fade-up';
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
      <div class="course-color-bar" style="background: ${color};"></div>
      <div class="course-card-body">
        <div class="course-name">${course.course}</div>
        <div class="course-link-hint">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Ver no JupiterWeb
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
