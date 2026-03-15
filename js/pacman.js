// ===== DASIBOARD PAC-MAN EASTER EGG =====
// Unlock: navigate all pages in order (home→calendar→...→ferramentas) then reverse

const PAGE_ORDER = ['home','calendar','schedule','kanban','newsletter','docentes','estudos','notas-gpa','ferramentas'];
let eggNavHistory = [];
let eggPhase = 'forward'; // 'forward' | 'backward'
let eggForwardDone = false;

function trackEggNavigation(page) {
  const fwd = PAGE_ORDER;
  const bwd = [...PAGE_ORDER].reverse();
  const target = eggPhase === 'forward' ? fwd : bwd;
  const expected = target[eggNavHistory.length];

  if (page === expected) {
    eggNavHistory.push(page);
    if (eggNavHistory.length === target.length) {
      if (eggPhase === 'forward') {
        eggPhase = 'backward';
        eggNavHistory = [];
      } else {
        // Completed full sequence!
        eggPhase = 'forward';
        eggNavHistory = [];
        setTimeout(triggerPacManEasterEgg, 200);
      }
    }
  } else {
    // Wrong page - reset if doesn't fit anywhere
    if (eggPhase === 'forward') {
      eggNavHistory = page === fwd[0] ? [page] : [];
    } else {
      eggNavHistory = page === bwd[0] ? [page] : [];
    }
  }
}

// ===== GAME =====
const CELL = 20;
const COLS = 21;
const ROWS = 15;

// Maze: 1=wall, 0=dot, 2=empty, 3=power pellet, 4=empty-no-dot
const MAZE_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,3,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,4,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,2,1,4,1,2,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,2,2,4,4,4,2,2,2,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,1,1,1,2,1,1,1,2,1,0,1,1,1,1],
  [4,4,4,4,0,2,2,1,4,4,4,4,4,1,2,2,0,4,4,4,4],
  [1,1,1,1,0,1,2,1,1,1,1,1,1,1,2,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,4,1,0,0,0,0,0,0,0,0,1],
  [1,3,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,3,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let gameState = null;
let gameAnim = null;
let gamePaused = false;

function triggerPacManEasterEgg() {
  if (document.getElementById('pacman-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'pacman-overlay';
  overlay.className = 'pacman-overlay';
  overlay.innerHTML = `
    <div class="pacman-box" id="pacman-box">
      <div class="pacman-header">
        <span class="pacman-title">🦅 GrifinMAN</span>
        <span class="pacman-score">Pontos: <span id="pac-score">0</span></span>
        <button class="pacman-close" onclick="closePacMan()">×</button>
      </div>
      <canvas id="pac-canvas" class="pacman-canvas" width="${COLS*CELL}" height="${ROWS*CELL}"></canvas>
      <div class="pacman-controls">
        <span class="pacman-hint">← ↑ ↓ → ou WASD para mover</span>
        <span class="pacman-lives">Vidas: <span id="pac-lives">♦♦♦</span></span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePacMan(); });

  // Fit canvas to box
  requestAnimationFrame(() => {
    const box = document.getElementById('pacman-box');
    const canvas = document.getElementById('pac-canvas');
    if (box && canvas) {
      const maxW = box.clientWidth - 48;
      const scale = Math.min(1, maxW / (COLS * CELL));
      canvas.style.width = Math.round(COLS * CELL * scale) + 'px';
      canvas.style.height = Math.round(ROWS * CELL * scale) + 'px';
    }
    initPacGame();
  });
}

function closePacMan() {
  if (gameAnim) cancelAnimationFrame(gameAnim);
  gameAnim = null; gameState = null;
  document.getElementById('pacman-overlay')?.remove();
  document.removeEventListener('keydown', pacKeyHandler);
}

function initPacGame() {
  const maze = MAZE_TEMPLATE.map(row => [...row]);
  let totalDots = 0;
  maze.forEach(row => row.forEach(c => { if (c === 0 || c === 3) totalDots++; }));

  gameState = {
    maze,
    totalDots,
    dotsEaten: 0,
    score: 0,
    lives: 3,
    level: 1,
    // Player: griffon bird 🦅
    player: { x: 1, y: 1, dx: 0, dy: 0, nextDx: 1, nextDy: 0, mouthOpen: true, frameCount: 0, powered: 0 },
    // Enemies: 📚 📅 🧮 💻
    enemies: [
      { x: 9, y: 7, dx: 1, dy: 0, type: 0, scatter: 0, frightened: 0, homeX: 9, homeY: 7 },
      { x: 10, y: 7, dx: -1, dy: 0, type: 1, scatter: 0, frightened: 0, homeX: 10, homeY: 7 },
      { x: 11, y: 8, dx: 0, dy: 1, type: 2, scatter: 0, frightened: 0, homeX: 11, homeY: 8 },
      { x: 10, y: 9, dx: 0, dy: -1, type: 3, scatter: 0, frightened: 0, homeX: 10, homeY: 9 },
    ],
    moveTimer: 0,
    enemyMoveTimer: 0,
    gameOver: false,
    won: false,
    deathAnim: 0,
    message: '',
    msgTimer: 0,
  };

  document.addEventListener('keydown', pacKeyHandler);
  if (gameAnim) cancelAnimationFrame(gameAnim);
  gamePacLoop();
}

function pacKeyHandler(e) {
  if (!gameState) return;
  const dirs = { ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1],
                 a:[-1,0], d:[1,0], w:[0,-1], s:[0,1], A:[-1,0], D:[1,0], W:[0,-1], S:[0,1] };
  const d = dirs[e.key];
  if (d) { e.preventDefault(); gameState.player.nextDx = d[0]; gameState.player.nextDy = d[1]; }
  if (e.key === 'Escape') closePacMan();
  if (e.key === ' ' && gameState.gameOver) initPacGame();
}

function canMove(maze, x, y, dx, dy) {
  const nx = x + dx, ny = y + dy;
  if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return false;
  return maze[ny][nx] !== 1;
}

function gamePacLoop() {
  if (!gameState) return;
  const canvas = document.getElementById('pac-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  gameState.frameCount = (gameState.frameCount || 0) + 1;
  const { player: p, enemies, maze } = gameState;

  if (!gameState.gameOver && !gameState.won) {
    // Move player every 8 frames
    if (gameState.frameCount % 8 === 0) {
      // Try buffered direction first
      if (canMove(maze, p.x, p.y, p.nextDx, p.nextDy)) {
        p.dx = p.nextDx; p.dy = p.nextDy;
      }
      if (canMove(maze, p.x, p.y, p.dx, p.dy)) {
        p.x += p.dx; p.y += p.dy;
        // Tunnel wrap
        if (p.x < 0) p.x = COLS - 1;
        if (p.x >= COLS) p.x = 0;
        // Eat dot
        const cell = maze[p.y][p.x];
        if (cell === 0) { maze[p.y][p.x] = 2; gameState.score += 10; gameState.dotsEaten++; }
        if (cell === 3) {
          maze[p.y][p.x] = 2; gameState.score += 50; gameState.dotsEaten++;
          // Power up enemies
          enemies.forEach(en => { en.frightened = 60; });
          p.powered = 60;
        }
      }
      p.mouthOpen = !p.mouthOpen;
    }

    // Move enemies every 12 frames
    if (gameState.frameCount % 12 === 0) {
      enemies.forEach(en => {
        if (en.frightened > 0) en.frightened--;
        // Simple AI: try to chase or scatter
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
        let best = null, bestDist = Infinity;
        // Shuffle for variety
        dirs.sort(() => Math.random() - 0.5);
        for (const [dx,dy] of dirs) {
          if (dx === -en.dx && dy === -en.dy) continue; // no reversing unless no other option
          if (!canMove(maze, en.x, en.y, dx, dy)) continue;
          let tx = en.frightened > 0 ? COLS/2 : p.x;
          let ty = en.frightened > 0 ? ROWS/2 : p.y;
          const dist = Math.abs(en.x+dx - tx) + Math.abs(en.y+dy - ty);
          if (dist < bestDist) { bestDist = dist; best = [dx,dy]; }
        }
        if (best) { en.dx = best[0]; en.dy = best[1]; en.x += en.dx; en.y += en.dy; }
      });
    }

    // Collision
    enemies.forEach(en => {
      if (Math.abs(en.x - p.x) <= 0 && Math.abs(en.y - p.y) <= 0) {
        if (en.frightened > 0) {
          // Eat enemy
          en.x = en.homeX; en.y = en.homeY; en.frightened = 0;
          gameState.score += 200;
          gameState.msgTimer = 30; gameState.message = '+200!';
        } else {
          // Die
          gameState.lives--;
          updatePacHUD();
          if (gameState.lives <= 0) { gameState.gameOver = true; }
          else { p.x = 1; p.y = 1; p.dx = 0; p.dy = 0; }
        }
      }
    });

    if (gameState.dotsEaten >= gameState.totalDots) gameState.won = true;
    if (p.powered > 0) p.powered--;
  }

  updatePacHUD();
  drawPac(ctx, canvas.width, canvas.height);

  gameAnim = requestAnimationFrame(gamePacLoop);
}

function updatePacHUD() {
  if (!gameState) return;
  const scoreEl = document.getElementById('pac-score');
  const livesEl = document.getElementById('pac-lives');
  if (scoreEl) scoreEl.textContent = gameState.score;
  if (livesEl) livesEl.textContent = '♦'.repeat(Math.max(0, gameState.lives));
}

const ENEMY_EMOJIS = ['📚','📅','🧮','💻'];
const ENEMY_SCARED = '😱';

function drawPac(ctx, W, H) {
  const { maze, player: p, enemies, gameState: gs } = { maze: gameState.maze, player: gameState.player, enemies: gameState.enemies, gameState };

  // Scale factor
  const scaleX = W / (COLS * CELL);
  const scaleY = H / (ROWS * CELL);
  ctx.save();
  ctx.scale(scaleX, scaleY);

  // Background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

  // Draw maze
  maze.forEach((row, ry) => {
    row.forEach((cell, rx) => {
      const cx = rx * CELL, cy = ry * CELL;
      if (cell === 1) {
        // Wall
        ctx.fillStyle = '#1a0a3a';
        ctx.fillRect(cx, cy, CELL, CELL);
        ctx.strokeStyle = '#6622cc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx + 1, cy + 1, CELL - 2, CELL - 2);
      } else if (cell === 0) {
        // Dot
        ctx.fillStyle = '#cc88ff';
        ctx.beginPath();
        ctx.arc(cx + CELL/2, cy + CELL/2, 2.5, 0, Math.PI*2);
        ctx.fill();
      } else if (cell === 3) {
        // Power pellet
        const pulse = 0.7 + 0.3 * Math.sin(gameState.frameCount * 0.15);
        ctx.fillStyle = `rgba(255,200,68,${pulse})`;
        ctx.beginPath();
        ctx.arc(cx + CELL/2, cy + CELL/2, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowColor = '#ffcc44';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  });

  // Draw player (griffon bird 🦅)
  const px = p.x * CELL + CELL/2;
  const py = p.y * CELL + CELL/2;
  ctx.font = `${CELL - 2}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (p.powered > 0) {
    ctx.shadowColor = '#ffcc44';
    ctx.shadowBlur = 10;
  }
  // Rotate based on direction
  ctx.save();
  ctx.translate(px, py);
  const angle = p.dx === 1 ? 0 : p.dx === -1 ? Math.PI : p.dy === -1 ? -Math.PI/2 : p.dy === 1 ? Math.PI/2 : 0;
  ctx.rotate(angle);
  ctx.fillText(p.mouthOpen ? '🦅' : '🐦', 0, 1);
  ctx.restore();
  ctx.shadowBlur = 0;

  // Draw enemies
  enemies.forEach(en => {
    const ex = en.x * CELL + CELL/2;
    const ey = en.y * CELL + CELL/2;
    ctx.font = `${CELL - 2}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const flash = en.frightened > 0 && en.frightened < 20 && gameState.frameCount % 6 < 3;
    const emoji = en.frightened > 0 && !flash ? ENEMY_SCARED : ENEMY_EMOJIS[en.type];
    if (en.frightened > 0) {
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(gameState.frameCount * 0.3);
    }
    ctx.fillText(emoji, ex, ey + 1);
    ctx.globalAlpha = 1;
  });

  // Overlay messages
  if (gameState.won) {
    ctx.fillStyle = 'rgba(0,0,0,.7)';
    ctx.fillRect(0, ROWS*CELL/2 - 40, COLS*CELL, 80);
    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎉 Você venceu!', COLS*CELL/2, ROWS*CELL/2 - 12);
    ctx.fillStyle = '#cc88ff';
    ctx.font = '13px monospace';
    ctx.fillText('Pressione Espaço para jogar de novo', COLS*CELL/2, ROWS*CELL/2 + 16);
  } else if (gameState.gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,.75)';
    ctx.fillRect(0, ROWS*CELL/2 - 40, COLS*CELL, 80);
    ctx.fillStyle = '#ff4060';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💀 Game Over', COLS*CELL/2, ROWS*CELL/2 - 12);
    ctx.fillStyle = '#cc88ff';
    ctx.font = '13px monospace';
    ctx.fillText('Pressione Espaço para reiniciar', COLS*CELL/2, ROWS*CELL/2 + 16);
  }

  // Score pop
  if (gameState.msgTimer > 0) {
    gameState.msgTimer--;
    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(gameState.message, px, py - 16);
  }

  ctx.restore();
}
