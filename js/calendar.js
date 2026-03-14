// ===== CALENDAR MODULE =====

let calEvents = [];
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
let calSelectedDate = null;

async function initCalendar() {
  const container = el('#calendar-page');
  if (!container) return;

  showLoadingIn(el('#calendar-page .calendar-main') || container);

  const data = await fetchJSON('./data/events.json');
  calEvents = data || [];

  renderCalendar();
  renderCalendarSidebar(null);
}

function renderCalendar() {
  const grid = el('#cal-grid');
  const monthLabel = el('#cal-month-year');
  if (!grid || !monthLabel) return;

  monthLabel.textContent = `${MONTH_NAMES_PT[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  // Build event map
  const eventMap = {};
  calEvents.forEach(ev => {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  });

  grid.innerHTML = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayEl = document.createElement('div');
    dayEl.className = 'cal-day';

    const isToday = dateKey === todayKey;
    const events = eventMap[dateKey] || [];

    if (isToday) dayEl.classList.add('today');
    if (events.length) dayEl.classList.add('has-events');
    if (dateKey === calSelectedDate) dayEl.classList.add('selected-day');

    const numEl = document.createElement('div');
    numEl.className = 'cal-day-num';
    numEl.textContent = d;
    dayEl.appendChild(numEl);

    if (events.length) {
      const dotsEl = document.createElement('div');
      dotsEl.className = 'cal-event-dots';
      events.slice(0, 3).forEach(ev => {
        const dot = document.createElement('div');
        dot.className = `cal-event-dot tipo-${ev.type || 'default'}`;
        dotsEl.appendChild(dot);
      });
      dayEl.appendChild(dotsEl);
    }

    dayEl.addEventListener('click', () => {
      calSelectedDate = dateKey;
      // Remove previous selection
      els('.cal-day.selected-day').forEach(d => d.classList.remove('selected-day'));
      dayEl.classList.add('selected-day');
      renderCalendarSidebar(dateKey, events);
    });

    grid.appendChild(dayEl);
  }
}

function renderCalendarSidebar(dateKey, events = []) {
  const panel = el('#cal-selected-panel');
  if (!panel) return;

  if (!dateKey) {
    panel.innerHTML = `
      <div class="cal-selected-date">Selecione um dia</div>
      <div class="no-events-msg">Clique em um dia para ver eventos</div>
    `;
    return;
  }

  const [y, m, d] = dateKey.split('-').map(Number);
  const dateLabel = `${String(d).padStart(2,'0')} de ${MONTH_NAMES_PT[m-1]}`;

  panel.innerHTML = `
    <div class="cal-selected-date">${dateLabel}</div>
    <div class="cal-day-events" id="cal-day-events-list"></div>
  `;

  const list = el('#cal-day-events-list');

  if (!events.length) {
    list.innerHTML = `<div class="no-events-msg">Nenhum evento neste dia</div>`;
    return;
  }

  events.forEach(ev => {
    const item = document.createElement('div');
    item.className = `cal-day-event-item tipo-${ev.type || 'default'} anim-fade-up`;
    item.innerHTML = `
      <div class="cal-day-event-title">${ev.title}</div>
      ${ev.description ? `<div class="cal-day-event-desc">${ev.description}</div>` : ''}
    `;
    list.appendChild(item);
  });
}

function calPrevMonth() {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function calNextMonth() {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}
