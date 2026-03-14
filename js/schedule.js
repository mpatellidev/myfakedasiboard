// ===== SCHEDULE MODULE =====

let scheduleData = null;
let currentSemester = '1';

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
            onclick="selectSemester('${sem}')">
      ${sem}º Sem
    </button>
  `).join('');
}

function selectSemester(sem) {
  currentSemester = sem;
  // Update buttons
  els('.sem-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
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
    const card = document.createElement('div');
    card.className = 'course-card card-shine anim-fade-up';
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
      <div class="course-color-bar" style="background: ${color};"></div>
      <div class="course-card-body">
        <div class="course-name">${course.course}</div>
        <div class="course-meta">
          <div class="course-meta-item">
            ${iconCalSmall()}
            ${course.day}
          </div>
          <div class="course-meta-item">
            ${iconClock()}
            ${course.time}
          </div>
          ${course.professor !== '—' ? `
          <div class="course-meta-item">
            ${iconUser()}
            ${course.professor}
          </div>` : ''}
          ${course.room !== '—' ? `
          <div class="course-meta-item">
            ${iconPin()}
            ${course.room}
          </div>` : ''}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function iconCalSmall() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
}

function iconClock() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
}

function iconUser() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
}

function iconPin() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
}
