// ===== FERRAMENTAS =====

let currentTool = null;

// Pomodoro state
let pomodoroTimer = null;
let pomodoroState = 'idle'; // idle | focus | break | longbreak
let pomodoroSecondsLeft = 0;
let pomodoroCyclesDone = 0;
let pomodoroConfig = { focus: 25, shortBreak: 5, longBreak: 15, cycles: 4 };

// Stopwatch state
let stopwatchTimer = null;
let stopwatchMs = 0;
let stopwatchLaps = [];
let stopwatchRunning = false;

function openTool(name) {
  currentTool = name;
  const grid = document.getElementById('tools-selector-grid');
  const panel = document.getElementById('tool-panel');
  const title = document.getElementById('tool-panel-title');
  const content = document.getElementById('tool-panel-content');

  // highlight selected card
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`[data-tool="${name}"]`);
  if (card) card.classList.add('active');

  grid.style.display = 'none';
  panel.classList.remove('hidden');

  const toolMeta = {
    pomodoro:     { label: '🍅 Pomodoro' },
    notas:        { label: '📝 Notas Rápidas' },
    checklist:    { label: '✅ Checklist' },
    sorteio:      { label: '🎲 Sorteio' },
    calculadora:  { label: '🧮 Média de Notas' },
    stopwatch:    { label: '⏱️ Cronômetro' },
  };
  title.textContent = toolMeta[name]?.label || name;

  const renderers = {
    pomodoro:    renderPomodoro,
    notas:       renderNotas,
    checklist:   renderChecklist,
    sorteio:     renderSorteio,
    calculadora: renderCalculadora,
    stopwatch:   renderStopwatch,
  };

  content.innerHTML = '';
  renderers[name]?.(content);
}

function closeTool() {
  stopAllTimers();
  currentTool = null;
  document.getElementById('tools-selector-grid').style.display = '';
  document.getElementById('tool-panel').classList.add('hidden');
  document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
}

function stopAllTimers() {
  if (pomodoroTimer) { clearInterval(pomodoroTimer); pomodoroTimer = null; }
  if (stopwatchTimer) { clearInterval(stopwatchTimer); stopwatchTimer = null; }
  stopwatchRunning = false;
}

// ============================
// 🍅 POMODORO
// ============================
function renderPomodoro(container) {
  pomodoroState = 'idle';
  pomodoroCyclesDone = 0;
  pomodoroSecondsLeft = pomodoroConfig.focus * 60;

  container.innerHTML = `
    <div class="pomo-wrap">
      <!-- Config panel -->
      <div class="pomo-config card">
        <div class="card-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Configuração
        </div>
        <div class="pomo-config-grid">
          <label class="pomo-label">
            Foco (min)
            <input type="number" id="pomo-focus" class="pomo-input" value="${pomodoroConfig.focus}" min="1" max="90" onchange="pomoCfgChange()">
          </label>
          <label class="pomo-label">
            Pausa curta (min)
            <input type="number" id="pomo-short" class="pomo-input" value="${pomodoroConfig.shortBreak}" min="1" max="30" onchange="pomoCfgChange()">
          </label>
          <label class="pomo-label">
            Pausa longa (min)
            <input type="number" id="pomo-long" class="pomo-input" value="${pomodoroConfig.longBreak}" min="1" max="60" onchange="pomoCfgChange()">
          </label>
          <label class="pomo-label">
            Ciclos até pausa longa
            <input type="number" id="pomo-cycles" class="pomo-input" value="${pomodoroConfig.cycles}" min="1" max="10" onchange="pomoCfgChange()">
          </label>
        </div>
      </div>

      <!-- Timer display -->
      <div class="pomo-timer-wrap">
        <div class="pomo-ring-wrap">
          <svg class="pomo-ring" viewBox="0 0 200 200">
            <circle class="pomo-ring-bg" cx="100" cy="100" r="88"/>
            <circle class="pomo-ring-fill" id="pomo-ring-fill" cx="100" cy="100" r="88"
              stroke-dasharray="553" stroke-dashoffset="0"/>
          </svg>
          <div class="pomo-inner">
            <div class="pomo-phase" id="pomo-phase">Pronto</div>
            <div class="pomo-time" id="pomo-time">${formatPomoTime(pomodoroConfig.focus * 60)}</div>
            <div class="pomo-cycles-done" id="pomo-cycles-done">Ciclo 0 / ${pomodoroConfig.cycles}</div>
          </div>
        </div>

        <div class="pomo-controls">
          <button class="btn btn-primary pomo-btn" id="pomo-start-btn" onclick="pomodoroToggle()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Iniciar
          </button>
          <button class="btn btn-ghost pomo-btn" onclick="pomodoroReset()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.33"/></svg>
            Reiniciar
          </button>
          <button class="btn btn-ghost pomo-btn" onclick="pomodoroSkip()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
            Pular
          </button>
        </div>

        <!-- Cycle dots -->
        <div class="pomo-dots" id="pomo-dots"></div>
      </div>
    </div>
  `;

  updatePomoDots();
}

function pomoCfgChange() {
  pomodoroConfig.focus      = parseInt(document.getElementById('pomo-focus')?.value) || 25;
  pomodoroConfig.shortBreak = parseInt(document.getElementById('pomo-short')?.value) || 5;
  pomodoroConfig.longBreak  = parseInt(document.getElementById('pomo-long')?.value) || 15;
  pomodoroConfig.cycles     = parseInt(document.getElementById('pomo-cycles')?.value) || 4;

  if (pomodoroState === 'idle') {
    pomodoroSecondsLeft = pomodoroConfig.focus * 60;
    updatePomoDisplay();
  }
  updatePomoDots();
}

function pomodoroToggle() {
  if (pomodoroState === 'idle') {
    pomodoroState = 'focus';
    pomodoroSecondsLeft = pomodoroConfig.focus * 60;
  }

  const btn = document.getElementById('pomo-start-btn');
  if (pomodoroTimer) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Retomar`;
  } else {
    pomodoroTimer = setInterval(pomodoroTick, 1000);
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pausar`;
  }
}

function pomodoroTick() {
  pomodoroSecondsLeft--;
  updatePomoDisplay();

  if (pomodoroSecondsLeft <= 0) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;

    // Beep notification
    playBeep();

    if (pomodoroState === 'focus') {
      pomodoroCyclesDone++;
      updatePomoDots();
      if (pomodoroCyclesDone % pomodoroConfig.cycles === 0) {
        pomodoroState = 'longbreak';
        pomodoroSecondsLeft = pomodoroConfig.longBreak * 60;
      } else {
        pomodoroState = 'break';
        pomodoroSecondsLeft = pomodoroConfig.shortBreak * 60;
      }
    } else {
      pomodoroState = 'focus';
      pomodoroSecondsLeft = pomodoroConfig.focus * 60;
    }

    updatePomoDisplay();
    // Auto-start next phase
    pomodoroTimer = setInterval(pomodoroTick, 1000);
    const btn = document.getElementById('pomo-start-btn');
    if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pausar`;
  }
}

function pomodoroReset() {
  clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  pomodoroState = 'idle';
  pomodoroCyclesDone = 0;
  pomodoroSecondsLeft = pomodoroConfig.focus * 60;
  updatePomoDisplay();
  updatePomoDots();
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Iniciar`;
}

function pomodoroSkip() {
  clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  if (pomodoroState === 'focus') {
    pomodoroCyclesDone++;
    updatePomoDots();
    pomodoroState = (pomodoroCyclesDone % pomodoroConfig.cycles === 0) ? 'longbreak' : 'break';
    pomodoroSecondsLeft = pomodoroState === 'longbreak' ? pomodoroConfig.longBreak * 60 : pomodoroConfig.shortBreak * 60;
  } else {
    pomodoroState = 'focus';
    pomodoroSecondsLeft = pomodoroConfig.focus * 60;
  }
  updatePomoDisplay();
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Iniciar`;
}

function updatePomoDisplay() {
  const timeEl = document.getElementById('pomo-time');
  const phaseEl = document.getElementById('pomo-phase');
  const cyclesEl = document.getElementById('pomo-cycles-done');
  const ring = document.getElementById('pomo-ring-fill');

  if (!timeEl) return;

  const phases = { idle: 'Pronto', focus: '🍅 Foco', break: '☕ Pausa', longbreak: '🌿 Pausa Longa' };
  const phaseColors = { idle: 'var(--primary)', focus: 'var(--danger)', break: 'var(--success)', longbreak: 'var(--info)' };
  const totalSeconds = {
    idle: pomodoroConfig.focus * 60,
    focus: pomodoroConfig.focus * 60,
    break: pomodoroConfig.shortBreak * 60,
    longbreak: pomodoroConfig.longBreak * 60
  }[pomodoroState];

  timeEl.textContent = formatPomoTime(pomodoroSecondsLeft);
  if (phaseEl) { phaseEl.textContent = phases[pomodoroState]; phaseEl.style.color = phaseColors[pomodoroState]; }
  if (cyclesEl) cyclesEl.textContent = `Ciclo ${pomodoroCyclesDone} / ${pomodoroConfig.cycles}`;

  if (ring) {
    const circumference = 553;
    const progress = pomodoroSecondsLeft / totalSeconds;
    ring.style.strokeDashoffset = circumference * (1 - progress);
    ring.style.stroke = phaseColors[pomodoroState];
  }
}

function updatePomoDots() {
  const dots = document.getElementById('pomo-dots');
  if (!dots) return;
  dots.innerHTML = Array.from({ length: pomodoroConfig.cycles }, (_, i) =>
    `<div class="pomo-dot ${i < pomodoroCyclesDone % pomodoroConfig.cycles || (pomodoroCyclesDone > 0 && i < pomodoroConfig.cycles && pomodoroCyclesDone % pomodoroConfig.cycles === 0 && pomodoroState !== 'focus') ? 'done' : ''}"></div>`
  ).join('');
}

function formatPomoTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch(e) {}
}

// ============================
// 📝 NOTAS RÁPIDAS
// ============================
function renderNotas(container) {
  const saved = localStorage.getItem('dasi-notas') || '';
  container.innerHTML = `
    <div class="notas-wrap">
      <div class="notas-toolbar">
        <span class="notas-count" id="notas-count">${saved.length} caracteres</span>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost" onclick="notasClear()" title="Limpar notas">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Limpar
          </button>
          <button class="btn btn-primary" onclick="notasCopy()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copiar
          </button>
        </div>
      </div>
      <textarea class="notas-textarea" id="notas-textarea" placeholder="Digite suas anotações aqui... Salvo automaticamente no navegador."
        oninput="notasSave(this)">${saved}</textarea>
    </div>
  `;
}

function notasSave(el) {
  localStorage.setItem('dasi-notas', el.value);
  const c = document.getElementById('notas-count');
  if (c) c.textContent = el.value.length + ' caracteres';
}

function notasClear() {
  if (!confirm('Limpar todas as notas?')) return;
  localStorage.removeItem('dasi-notas');
  const ta = document.getElementById('notas-textarea');
  if (ta) { ta.value = ''; notasSave(ta); }
}

function notasCopy() {
  const ta = document.getElementById('notas-textarea');
  if (!ta) return;
  navigator.clipboard.writeText(ta.value).then(() => {
    showToast('Notas copiadas!');
  });
}

// ============================
// ✅ CHECKLIST
// ============================
let checklistItems = JSON.parse(localStorage.getItem('dasi-checklist') || '[]');

function renderChecklist(container) {
  container.innerHTML = `
    <div class="checklist-wrap">
      <div class="checklist-add">
        <input type="text" id="checklist-input" class="pomo-input" placeholder="Nova tarefa... (Enter para adicionar)"
          onkeydown="if(event.key==='Enter') checklistAdd()" style="flex:1;font-size:14px;">
        <button class="btn btn-primary" onclick="checklistAdd()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Adicionar
        </button>
      </div>
      <div class="checklist-progress-bar-wrap">
        <div class="checklist-progress-bar" id="checklist-progress"></div>
      </div>
      <div class="checklist-stats" id="checklist-stats"></div>
      <div class="checklist-list" id="checklist-list"></div>
      <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="checklistClearDone()">Remover concluídas</button>
        <button class="btn btn-ghost" onclick="checklistClearAll()">Limpar tudo</button>
      </div>
    </div>
  `;
  renderChecklistItems();
}

function renderChecklistItems() {
  const list = document.getElementById('checklist-list');
  const progress = document.getElementById('checklist-progress');
  const stats = document.getElementById('checklist-stats');
  if (!list) return;

  const done = checklistItems.filter(i => i.done).length;
  const total = checklistItems.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  if (progress) progress.style.width = pct + '%';
  if (stats) stats.textContent = total ? `${done} de ${total} concluída${done !== 1 ? 's' : ''} (${pct}%)` : 'Nenhuma tarefa adicionada';

  if (!total) { list.innerHTML = '<div class="no-events-msg">Nenhuma tarefa ainda.</div>'; return; }

  list.innerHTML = checklistItems.map((item, i) => `
    <div class="checklist-item ${item.done ? 'done' : ''}" id="cli-${i}">
      <button class="checklist-check" onclick="checklistToggle(${i})">
        ${item.done ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      </button>
      <span class="checklist-text">${escapeHtml(item.text)}</span>
      <button class="checklist-del" onclick="checklistRemove(${i})" title="Remover">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');
}

function checklistAdd() {
  const inp = document.getElementById('checklist-input');
  const text = inp?.value.trim();
  if (!text) return;
  checklistItems.push({ text, done: false });
  checklistSave();
  inp.value = '';
  renderChecklistItems();
}

function checklistToggle(i) {
  checklistItems[i].done = !checklistItems[i].done;
  checklistSave();
  renderChecklistItems();
}

function checklistRemove(i) {
  checklistItems.splice(i, 1);
  checklistSave();
  renderChecklistItems();
}

function checklistClearDone() {
  checklistItems = checklistItems.filter(i => !i.done);
  checklistSave();
  renderChecklistItems();
}

function checklistClearAll() {
  if (!confirm('Limpar toda a checklist?')) return;
  checklistItems = [];
  checklistSave();
  renderChecklistItems();
}

function checklistSave() {
  localStorage.setItem('dasi-checklist', JSON.stringify(checklistItems));
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ============================
// 🎲 SORTEIO
// ============================
function renderSorteio(container) {
  container.innerHTML = `
    <div class="sorteio-wrap">
      <div class="card" style="margin-bottom:20px;">
        <div class="card-title">Lista de participantes</div>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Um por linha. Pode ser nomes, disciplinas, temas — qualquer coisa.</p>
        <textarea class="notas-textarea" id="sorteio-lista" placeholder="Ana&#10;Bruno&#10;Carlos&#10;Diana&#10;..." style="height:140px;"></textarea>
      </div>

      <div class="card" style="margin-bottom:20px;">
        <div class="card-title">Opções</div>
        <div class="pomo-config-grid">
          <label class="pomo-label">
            Quantidade a sortear
            <input type="number" id="sorteio-qtd" class="pomo-input" value="1" min="1">
          </label>
          <label class="pomo-label">
            Modo
            <select id="sorteio-modo" class="pomo-input">
              <option value="individual">Nomes individuais</option>
              <option value="grupos">Dividir em grupos</option>
            </select>
          </label>
        </div>
        <button class="btn btn-primary" style="margin-top:16px;width:100%;" onclick="executarSorteio()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><circle cx="18" cy="18" r="3"/><line x1="18" y1="15" x2="18" y2="15.01"/></svg>
          🎲 Sortear!
        </button>
      </div>

      <div id="sorteio-resultado" class="sorteio-resultado hidden"></div>
    </div>
  `;
}

function executarSorteio() {
  const listaRaw = document.getElementById('sorteio-lista')?.value || '';
  const lista = listaRaw.split('\n').map(s => s.trim()).filter(Boolean);
  const qtd = parseInt(document.getElementById('sorteio-qtd')?.value) || 1;
  const modo = document.getElementById('sorteio-modo')?.value;
  const res = document.getElementById('sorteio-resultado');

  if (!lista.length) { showToast('Adicione itens na lista!'); return; }

  res.classList.remove('hidden');
  res.style.animation = 'none';
  void res.offsetWidth;
  res.style.animation = '';

  if (modo === 'grupos') {
    const shuffled = [...lista].sort(() => Math.random() - 0.5);
    const grupos = [];
    const size = Math.ceil(shuffled.length / qtd);
    for (let i = 0; i < qtd; i++) {
      grupos.push(shuffled.slice(i * size, (i + 1) * size));
    }
    res.innerHTML = `
      <div class="card-title" style="margin-bottom:16px;">🎯 Grupos formados</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;">
        ${grupos.map((g, i) => `
          <div class="sorteio-grupo-card">
            <div class="sorteio-grupo-label">Grupo ${i + 1}</div>
            ${g.map(n => `<div class="sorteio-nome">${escapeHtml(n)}</div>`).join('')}
          </div>
        `).join('')}
      </div>
    `;
  } else {
    const real = Math.min(qtd, lista.length);
    const sorteados = [...lista].sort(() => Math.random() - 0.5).slice(0, real);
    res.innerHTML = `
      <div class="card-title" style="margin-bottom:16px;">🎯 ${real === 1 ? 'Sorteado' : 'Sorteados'}</div>
      <div class="sorteio-nomes">
        ${sorteados.map((n, i) => `
          <div class="sorteio-nome-big" style="animation-delay:${i * 0.08}s">${escapeHtml(n)}</div>
        `).join('')}
      </div>
    `;
  }
}

// ============================
// 🧮 CALCULADORA DE MÉDIAS
// ============================
let calcDisciplinas = JSON.parse(localStorage.getItem('dasi-calc') || '[]');

function renderCalculadora(container) {
  container.innerHTML = `
    <div class="calc-wrap">
      <div style="display:flex;gap:10px;margin-bottom:16px;align-items:center;flex-wrap:wrap;">
        <input type="text" id="calc-nome" class="pomo-input" placeholder="Nome da disciplina" style="flex:1;min-width:140px;">
        <button class="btn btn-primary" onclick="calcAdd()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Adicionar
        </button>
        <button class="btn btn-ghost" onclick="calcClear()">Limpar</button>
      </div>
      <div id="calc-list"></div>
      <div id="calc-summary"></div>
    </div>
  `;
  renderCalcList();
}

function renderCalcList() {
  const list = document.getElementById('calc-list');
  const summary = document.getElementById('calc-summary');
  if (!list) return;

  if (!calcDisciplinas.length) {
    list.innerHTML = '<div class="no-events-msg">Nenhuma disciplina adicionada.</div>';
    if (summary) summary.innerHTML = '';
    return;
  }

  list.innerHTML = calcDisciplinas.map((d, i) => `
    <div class="calc-item card" style="margin-bottom:12px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="font-weight:600;font-size:15px;">${escapeHtml(d.nome)}</div>
        <button class="checklist-del" onclick="calcRemove(${i})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="calc-notas-grid">
        ${d.notas.map((n, j) => `
          <div class="calc-nota-row">
            <input type="text" class="pomo-input" placeholder="Avaliação ${j+1}" value="${escapeHtml(n.label)}"
              style="flex:1;" oninput="calcUpdateLabel(${i},${j},this.value)">
            <input type="number" class="pomo-input calc-nota-input" placeholder="Nota" value="${n.nota !== '' ? n.nota : ''}"
              min="0" max="10" step="0.1" oninput="calcUpdateNota(${i},${j},this.value)">
            <input type="number" class="pomo-input calc-peso-input" placeholder="Peso" value="${n.peso !== '' ? n.peso : ''}"
              min="0" step="0.1" oninput="calcUpdatePeso(${i},${j},this.value)">
            <button class="checklist-del" onclick="calcRemoveNota(${i},${j})">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-ghost" style="margin-top:10px;font-size:12px;" onclick="calcAddNota(${i})">+ Adicionar nota</button>
      <div class="calc-media ${calcGetMedia(d) >= 5 ? 'aprovado' : calcGetMedia(d) < 0 ? '' : 'reprovado'}" id="calc-media-${i}">
        ${calcGetMedia(d) >= 0 ? `Média: <strong>${calcGetMedia(d).toFixed(2)}</strong> — ${calcGetMedia(d) >= 5 ? '✅ Aprovado' : '❌ Reprovado'}` : 'Insira notas e pesos'}
      </div>
    </div>
  `).join('');

  // Summary
  const mediaGeral = calcDisciplinas.map(d => calcGetMedia(d)).filter(m => m >= 0);
  if (mediaGeral.length) {
    const avg = mediaGeral.reduce((a, b) => a + b, 0) / mediaGeral.length;
    if (summary) summary.innerHTML = `
      <div class="card" style="text-align:center;padding:20px;">
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Média Geral</div>
        <div style="font-family:var(--font-display);font-size:42px;font-weight:800;color:${avg >= 5 ? 'var(--success)' : 'var(--danger)'}">${avg.toFixed(2)}</div>
      </div>
    `;
  } else if (summary) summary.innerHTML = '';
}

function calcGetMedia(d) {
  const valid = d.notas.filter(n => n.nota !== '' && n.peso !== '');
  if (!valid.length) return -1;
  const totalPeso = valid.reduce((a, n) => a + parseFloat(n.peso), 0);
  if (!totalPeso) return -1;
  const soma = valid.reduce((a, n) => a + parseFloat(n.nota) * parseFloat(n.peso), 0);
  return soma / totalPeso;
}

function calcAdd() {
  const nome = document.getElementById('calc-nome')?.value.trim();
  if (!nome) return;
  calcDisciplinas.push({ nome, notas: [{ label: 'P1', nota: '', peso: '1' }, { label: 'P2', nota: '', peso: '1' }] });
  calcSave();
  document.getElementById('calc-nome').value = '';
  renderCalcList();
}

function calcRemove(i) { calcDisciplinas.splice(i, 1); calcSave(); renderCalcList(); }
function calcAddNota(i) { calcDisciplinas[i].notas.push({ label: `Av ${calcDisciplinas[i].notas.length + 1}`, nota: '', peso: '1' }); calcSave(); renderCalcList(); }
function calcRemoveNota(i, j) { calcDisciplinas[i].notas.splice(j, 1); calcSave(); renderCalcList(); }
function calcUpdateLabel(i, j, v) { calcDisciplinas[i].notas[j].label = v; calcSave(); }
function calcUpdateNota(i, j, v) { calcDisciplinas[i].notas[j].nota = v; calcSave(); renderCalcList(); }
function calcUpdatePeso(i, j, v) { calcDisciplinas[i].notas[j].peso = v; calcSave(); renderCalcList(); }
function calcClear() { if (!confirm('Limpar tudo?')) return; calcDisciplinas = []; calcSave(); renderCalcList(); }
function calcSave() { localStorage.setItem('dasi-calc', JSON.stringify(calcDisciplinas)); }

// ============================
// ⏱️ CRONÔMETRO
// ============================
function renderStopwatch(container) {
  stopwatchMs = 0; stopwatchLaps = []; stopwatchRunning = false;
  clearInterval(stopwatchTimer);

  container.innerHTML = `
    <div class="stopwatch-wrap">
      <div class="stopwatch-display" id="sw-display">00:00.000</div>
      <div class="pomo-controls">
        <button class="btn btn-primary pomo-btn" id="sw-start-btn" onclick="swToggle()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Iniciar
        </button>
        <button class="btn btn-ghost pomo-btn" onclick="swLap()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Volta
        </button>
        <button class="btn btn-ghost pomo-btn" onclick="swReset()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.33"/></svg>
          Zerar
        </button>
      </div>
      <div class="sw-laps" id="sw-laps"></div>
    </div>
  `;
}

function swToggle() {
  const btn = document.getElementById('sw-start-btn');
  if (stopwatchRunning) {
    clearInterval(stopwatchTimer);
    stopwatchRunning = false;
    if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Retomar`;
  } else {
    const start = Date.now() - stopwatchMs;
    stopwatchTimer = setInterval(() => {
      stopwatchMs = Date.now() - start;
      const d = document.getElementById('sw-display');
      if (d) d.textContent = formatSw(stopwatchMs);
    }, 30);
    stopwatchRunning = true;
    if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pausar`;
  }
}

function swLap() {
  if (!stopwatchRunning && stopwatchMs === 0) return;
  stopwatchLaps.push(stopwatchMs);
  const laps = document.getElementById('sw-laps');
  if (laps) {
    const prev = stopwatchLaps.length > 1 ? stopwatchLaps[stopwatchLaps.length - 2] : 0;
    const delta = stopwatchMs - prev;
    laps.innerHTML = stopwatchLaps.map((l, i) => {
      const p = i > 0 ? stopwatchLaps[i - 1] : 0;
      return `<div class="sw-lap-item"><span class="sw-lap-num">Volta ${i + 1}</span><span class="sw-lap-delta">+${formatSw(l - p)}</span><span>${formatSw(l)}</span></div>`;
    }).reverse().join('');
  }
}

function swReset() {
  clearInterval(stopwatchTimer); stopwatchRunning = false; stopwatchMs = 0; stopwatchLaps = [];
  const d = document.getElementById('sw-display'); if (d) d.textContent = '00:00.000';
  const laps = document.getElementById('sw-laps'); if (laps) laps.innerHTML = '';
  const btn = document.getElementById('sw-start-btn');
  if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Iniciar`;
}

function formatSw(ms) {
  const m = Math.floor(ms / 60000).toString().padStart(2, '0');
  const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const ms3 = (ms % 1000).toString().padStart(3, '0');
  return `${m}:${s}.${ms3}`;
}

// ============================
// TOAST
// ============================
function showToast(msg) {
  let t = document.getElementById('dasi-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'dasi-toast';
    t.className = 'dasi-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
