const HEROES = [
  1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,
  10001,10002,10003,10004,10005,10006,10007
];

const ENEMIES = [
  101,102,103,104,105,106,111,112,113,114,115,116,
  121,122,123,124,125,126,131,132,133,134,135,136,
  141,142,143,144,145,146,147,148,149,150,
  1004,1054,1063,1066,1111,1130,1153,1164,1165,1183,1189,1190
];

const BACKGROUNDS = [
  1001,1002,1003,1004,1006,1010,
  1028,1030,1037,1038,1039,1041,1046,1047,
  1049,1050,1051,1052,1053,1054,1055,1056,
  1057,1058,1059,1060,
  2105,2205,2301,2405,2505,2605,2705,2805,2905
];

const GAME_DURATION = 60;

const bgm = new Audio('Audio/BGM/pve.mp3');
bgm.loop = true;
bgm.volume = 0.35;

function playSound(src, vol) {
  const a = new Audio(src);
  a.volume = vol ?? 0.5;
  a.play().catch(() => {});
}

const SPRITE_COLS       = 9;
const SPRITE_FRAME_COUNT = 81;
const SPRITE_CELL_PX    = 160;

let effectFrame = 0;
let effectTimer = null;

function playEffect() {
  const el = document.getElementById('effect-sprite');
  if (effectTimer) clearInterval(effectTimer);
  effectFrame = 0;
  el.style.display = 'block';

  effectTimer = setInterval(() => {
    const col = effectFrame % SPRITE_COLS;
    const row = Math.floor(effectFrame / SPRITE_COLS);
    el.style.backgroundPosition = `${-col * SPRITE_CELL_PX}px ${-row * SPRITE_CELL_PX}px`;
    effectFrame++;
    if (effectFrame >= SPRITE_FRAME_COUNT) {
      clearInterval(effectTimer);
      effectTimer = null;
      el.style.display = 'none';
    }
  }, 38);
}

const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

let score       = 0;
let timeLeft    = 0;
let timerInterval = null;
let enemyHp     = 0;
let enemyMaxHp  = 0;
let lastIdx     = -1;
let accepting   = false;

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function startGame() {
  score     = 0;
  timeLeft  = GAME_DURATION;
  accepting = false;

  $('score').textContent = '0';
  $('timer').textContent = String(GAME_DURATION);
  $('hud-right').classList.remove('urgent');
  $('tap-hint').textContent = 'タップして攻撃！';

  const bgId = rand(BACKGROUNDS);
  $('screen-game').style.backgroundImage = `url('Image/Backgrounds/${bgId}.png')`;

  const heroId = rand(HEROES);
  $('hero-img').src = `Image/Heroes/${heroId}.png`;

  showScreen('screen-game');
  bgm.currentTime = 0;
  bgm.play().catch(() => {});

  spawnEnemy();

  timerInterval = setInterval(() => {
    timeLeft--;
    $('timer').textContent = String(timeLeft);
    if (timeLeft <= 10) $('hud-right').classList.add('urgent');
    if (timeLeft <= 0)  endGame();
  }, 1000);
}

function spawnEnemy() {
  let idx;
  do { idx = Math.floor(Math.random() * ENEMIES.length); }
  while (idx === lastIdx && ENEMIES.length > 1);
  lastIdx = idx;

  $('enemy-img').src = `Image/Enemies/${ENEMIES[idx]}.png`;

  enemyMaxHp = 4 + Math.floor(Math.random() * 6);
  enemyHp    = enemyMaxHp;
  updateHpBar();
  $('tap-hint').textContent = 'タップして攻撃！';
  accepting = true;
}

function updateHpBar() {
  const pct  = (enemyHp / enemyMaxHp) * 100;
  const fill = $('enemy-hp-fill');
  fill.style.width      = pct + '%';
  fill.style.background = pct > 55 ? '#ff4444' : pct > 25 ? '#ffa844' : '#44ff88';
}

function spawnFloatingDmg(x, y) {
  const el = document.createElement('div');
  el.className   = 'dmg-float';
  el.textContent = '-1';
  el.style.left  = x + 'px';
  el.style.top   = y + 'px';
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function attack(clientX, clientY) {
  if (!accepting || timeLeft <= 0) return;

  playSound('Audio/SE/Battle/1_single_damage.mp3', 0.45);
  playEffect();
  spawnFloatingDmg(clientX - 16, clientY - 24);

  const img = $('enemy-img');
  img.classList.remove('shake');
  void img.offsetWidth;
  img.classList.add('shake');

  enemyHp--;
  updateHpBar();

  if (enemyHp <= 0) {
    accepting = false;
    score++;
    $('score').textContent = String(score);
    $('tap-hint').textContent = '撃破！';
    setTimeout(spawnEnemy, 380);
  }
}

function endGame() {
  clearInterval(timerInterval);
  accepting = false;
  bgm.pause();
  playSound('Audio/SE/Jingles/win.mp3', 0.65);
  $('result-score').textContent = String(score);
  setTimeout(() => showScreen('screen-result'), 700);
}

$('btn-start').addEventListener('click', startGame);

$('btn-retry').addEventListener('click', () => {
  $('hud-right').classList.remove('urgent');
  startGame();
});

$('battle-area').addEventListener('click', e => {
  attack(e.clientX, e.clientY);
});

$('battle-area').addEventListener('touchstart', e => {
  e.preventDefault();
  const t = e.touches[0];
  attack(t.clientX, t.clientY);
}, { passive: false });
