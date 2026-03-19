// ===== NEWSLETTER MODULE =====

let newsletterData = [];

async function initNewsletter() {
  const data = await fetchJSON('./data/newsletter.json');
  newsletterData = data ? [...data].sort((a, b) => b.id - a.id) : [];

  renderNewsletterFeatured();
  renderNewsletterList();
}

function renderNewsletterFeatured() {
  const container = el('#newsletter-featured');
  if (!container || !newsletterData.length) return;

  const featured = newsletterData[0];
  container.innerHTML = `
    <div class="newsletter-date">${formatDate(featured.date)}</div>
    <h2 class="newsletter-title">${featured.title}</h2>
    <p class="newsletter-summary">${featured.summary}</p>
    <button class="btn btn-primary" onclick="openNewsletterModal(${featured.id})">
      ${iconRead()}
      Ler artigo completo
    </button>
  `;
}

function renderNewsletterList() {
  const container = el('#newsletter-list');
  if (!container) return;

  const older = newsletterData.slice(1);

  if (!older.length) {
    container.innerHTML = `<div class="empty-state"><p>Nenhuma newsletter anterior.</p></div>`;
    return;
  }

  container.innerHTML = older.map(item => `
    <div class="newsletter-item anim-fade-up" onclick="openNewsletterModal(${item.id})">
      <span class="newsletter-item-date">${formatDateShort(item.date)}</span>
      <span class="newsletter-item-title">${item.title}</span>
      <span class="newsletter-item-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </span>
    </div>
  `).join('');

  staggerChildren(container);
}

function openNewsletterModal(id) {
  const item = newsletterData.find(n => n.id === id);
  if (!item) return;

  el('#modal-date').textContent = formatDate(item.date);
  el('#modal-title').textContent = item.title;
  el('#modal-content').textContent = item.content;

  el('#newsletter-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeNewsletterModal() {
  el('#newsletter-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function iconRead() {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
}

// Also render newsletter preview in home
async function renderHomeNewsletter() {
  const container = el('#home-newsletter');
  if (!container) return;

  if (!newsletterData.length) {
    const data = await fetchJSON('./data/newsletter.json');
    newsletterData = data ? [...data].sort((a, b) => b.id - a.id) : [];
  }

  if (!newsletterData.length) {
    container.innerHTML = `<div class="no-events-msg">Nenhuma newsletter disponível.</div>`;
    return;
  }

  const latest = newsletterData[0];
  container.innerHTML = `
    <div class="newsletter-date">${formatDate(latest.date)}</div>
    <div style="font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--text);">${latest.title}</div>
    <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">${latest.summary}</p>
    <button class="btn btn-ghost" style="font-size: 12px;" onclick="navigateTo('newsletter'); openNewsletterModal(${latest.id})">
      Ler mais →
    </button>
  `;
}
