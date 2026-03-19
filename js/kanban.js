// ===== KANBAN =====

let kanbanData = { todo: [], doing: [], done: [] };
let kanbanDragId = null;
let kanbanEditId = null;

const KANBAN_KEY = 'dasiboard_kanban_v2';

const TAG_COLORS = {
  prova:    { bg: 'rgba(248,113,113,.15)', color: 'var(--danger)',  dot: '#f87171' },
  entrega:  { bg: 'rgba(251,191,36,.15)',  color: 'var(--warning)', dot: '#fbbf24' },
  leitura:  { bg: 'rgba(96,165,250,.15)',  color: 'var(--info)',    dot: '#60a5fa' },
  projeto:  { bg: 'rgba(167,139,250,.15)', color: 'var(--secondary)', dot: '#a78bfa' },
  pessoal:  { bg: 'rgba(134,239,172,.15)', color: 'var(--success)', dot: '#86efac' },
};

const TAG_LABELS = {
  prova: '🔴 Prova', entrega: '🟡 Entrega', leitura: '📘 Leitura',
  projeto: '🟣 Projeto', pessoal: '⚪ Pessoal',
};

function kanbanLoad() {
  try {
    const saved = localStorage.getItem(KANBAN_KEY);
    if (saved) kanbanData = JSON.parse(saved);
  } catch (e) { kanbanData = { todo: [], doing: [], done: [] }; }
  if (!kanbanData.todo) kanbanData.todo = [];
  if (!kanbanData.doing) kanbanData.doing = [];
  if (!kanbanData.done) kanbanData.done = [];
}

function kanbanSave() {
  try { localStorage.setItem(KANBAN_KEY, JSON.stringify(kanbanData)); } catch (e) {}
}

function kanbanRender() {
  ['todo', 'doing', 'done'].forEach(col => {
    const container = document.getElementById(`cards-${col}`);
    const countEl = document.getElementById(`count-${col}`);
    if (!container) return;

    const cards = kanbanData[col] || [];
    countEl.textContent = cards.length;

    if (cards.length === 0) {
      const labels = { todo: 'Nenhuma tarefa aqui', doing: 'Em andamento...', done: 'Nada concluído ainda' };
      container.innerHTML = `<div class="kanban-empty-col">${labels[col]}</div>`;
      return;
    }

    container.innerHTML = cards.map(card => kanbanCardHTML(card)).join('');
  });
  updateHomeKanbanPeek();
  updateStatTasks();
}

function kanbanCardHTML(card) {
  const tag = card.tag ? TAG_COLORS[card.tag] : null;
  const tagLabel = card.tag ? TAG_LABELS[card.tag] : null;

  let dueHTML = '';
  if (card.due) {
    const today = new Date(); today.setHours(0,0,0,0);
    const dueDate = new Date(card.due + 'T00:00:00');
    const diff = Math.ceil((dueDate - today) / 86400000);
    let cls = '';
    let label = dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    if (diff < 0) { cls = 'overdue'; label = `Atrasado ${Math.abs(diff)}d`; }
    else if (diff <= 3) { cls = 'soon'; label = diff === 0 ? 'Hoje' : `${diff}d`; }
    dueHTML = `<span class="kanban-due ${cls}">${label}</span>`;
  }

  return `
    <div class="kanban-card" draggable="true"
      ondragstart="kanbanDragStart(event,'${card.id}')"
      ondragend="kanbanDragEnd(event)"
      id="kcard-${card.id}">
      <div class="kanban-card-top">
        <div class="kanban-card-title">${escapeHtml(card.title)}</div>
        <div class="kanban-card-actions">
          <button class="kanban-action-btn" onclick="openKanbanEdit('${card.id}')" title="Editar">✏️</button>
          <button class="kanban-action-btn delete" onclick="kanbanDelete('${card.id}')" title="Excluir">🗑</button>
        </div>
      </div>
      ${card.desc ? `<div class="kanban-card-desc">${escapeHtml(card.desc)}</div>` : ''}
      <div class="kanban-card-footer">
        ${tag ? `<span class="kanban-tag" style="background:${tag.bg};color:${tag.color}"><span class="kanban-tag-dot" style="background:${tag.dot}"></span>${tagLabel.replace(/^[^\s]+\s/,'')}</span>` : ''}
        ${dueHTML}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function kanbanAddCard() {
  const input = document.getElementById('kanban-new-input');
  const colSel = document.getElementById('kanban-new-col');
  const tagSel = document.getElementById('kanban-new-tag');
  const title = input?.value?.trim();
  if (!title) { input?.focus(); return; }

  const card = {
    id: Date.now().toString(),
    title,
    desc: '',
    tag: tagSel?.value || '',
    due: '',
    createdAt: new Date().toISOString(),
  };

  const col = colSel?.value || 'todo';
  kanbanData[col].unshift(card);
  kanbanSave();
  kanbanRender();

  input.value = '';
  input.focus();
  showToast(`Tarefa adicionada em "${col === 'todo' ? 'A fazer' : col === 'doing' ? 'Em andamento' : 'Concluído'}"!`);
}

function kanbanDelete(id) {
  ['todo','doing','done'].forEach(col => {
    kanbanData[col] = kanbanData[col].filter(c => c.id !== id);
  });
  kanbanSave();
  kanbanRender();
  showToast('Tarefa removida.');
}

function kanbanDragStart(event, id) {
  kanbanDragId = id;
  event.dataTransfer.effectAllowed = 'move';
  setTimeout(() => {
    const el = document.getElementById(`kcard-${id}`);
    if (el) el.classList.add('dragging');
  }, 0);
}

function kanbanDragEnd(event) {
  document.querySelectorAll('.kanban-card.dragging').forEach(el => el.classList.remove('dragging'));
  document.querySelectorAll('.kanban-col.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function kanbanDrop(event, targetCol) {
  event.preventDefault();
  if (!kanbanDragId) return;

  document.querySelectorAll('.kanban-col').forEach(el => el.classList.remove('drag-over'));

  let card = null;
  ['todo','doing','done'].forEach(col => {
    const idx = kanbanData[col].findIndex(c => c.id === kanbanDragId);
    if (idx !== -1) {
      card = kanbanData[col].splice(idx, 1)[0];
    }
  });

  if (card) {
    kanbanData[targetCol].unshift(card);
    kanbanSave();
    kanbanRender();
  }
  kanbanDragId = null;
}

// Column drag-over highlight
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.kanban-col').forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  });
});

function openKanbanEdit(id) {
  let card = null;
  ['todo','doing','done'].forEach(col => {
    const found = kanbanData[col].find(c => c.id === id);
    if (found) card = found;
  });
  if (!card) return;

  kanbanEditId = id;
  document.getElementById('kanban-edit-text').value = card.title;
  document.getElementById('kanban-edit-desc').value = card.desc || '';
  document.getElementById('kanban-edit-tag').value = card.tag || '';
  document.getElementById('kanban-edit-due').value = card.due || '';

  document.getElementById('kanban-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('kanban-edit-text').focus(), 50);
}

function saveKanbanEdit() {
  if (!kanbanEditId) return;
  const title = document.getElementById('kanban-edit-text').value.trim();
  if (!title) return;

  ['todo','doing','done'].forEach(col => {
    const card = kanbanData[col].find(c => c.id === kanbanEditId);
    if (card) {
      card.title = title;
      card.desc = document.getElementById('kanban-edit-desc').value.trim();
      card.tag = document.getElementById('kanban-edit-tag').value;
      card.due = document.getElementById('kanban-edit-due').value;
    }
  });

  kanbanSave();
  kanbanRender();
  closeKanbanModal();
  showToast('Tarefa atualizada!');
}

function closeKanbanModal() {
  document.getElementById('kanban-modal').classList.add('hidden');
  kanbanEditId = null;
}

function kanbanClearDone() {
  if (kanbanData.done.length === 0) { showToast('Nenhuma tarefa concluída para limpar.'); return; }
  kanbanData.done = [];
  kanbanSave();
  kanbanRender();
  showToast('Tarefas concluídas removidas!');
}

function updateHomeKanbanPeek() {
  const peek = document.getElementById('kanban-peek');
  if (!peek) return;

  const pending = [...kanbanData.todo, ...kanbanData.doing];
  if (pending.length === 0) {
    peek.innerHTML = '<div class="no-events-msg">Nenhuma tarefa pendente 🎉</div>';
    return;
  }

  const shown = pending.slice(0, 4);
  peek.innerHTML = shown.map(card => {
    const dot = card.tag ? (TAG_COLORS[card.tag]?.dot || 'var(--text-dim)') : 'var(--text-dim)';
    const col = ['todo','doing'].includes(kanbanData.todo.includes(card) ? 'todo' : 'doing');
    return `
      <div class="kanban-peek-item" onclick="navigateTo('kanban')">
        <span class="kanban-peek-tag-dot" style="background:${dot}"></span>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(card.title)}</span>
        ${card.due ? `<span style="font-family:var(--font-mono);font-size:10.5px;color:var(--text-dim);flex-shrink:0">${new Date(card.due+'T00:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})}</span>` : ''}
      </div>
    `;
  }).join('');

  if (pending.length > 4) {
    peek.innerHTML += `<div class="no-events-msg" style="padding:8px 0">+${pending.length - 4} mais</div>`;
  }
}

function updateStatTasks() {
  const el = document.getElementById('stat-tasks');
  if (!el) return;
  const total = (kanbanData.todo?.length || 0) + (kanbanData.doing?.length || 0);
  el.textContent = total;
}

function initKanban() {
  kanbanLoad();
  kanbanRender();

  // Modal close on backdrop
  const modal = document.getElementById('kanban-modal');
  modal?.addEventListener('click', e => { if (e.target === modal) closeKanbanModal(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeKanbanModal();
  });
}
