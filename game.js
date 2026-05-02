// ---- Hero Data (actual MCH max-level stats) ----
const HEROES_DATA = [
  { id:1001, name:'コナン・ドイル',       hp:192, phy:25,  int:69,  agi:138,
    passive:{name:'シャーロック・ホームズ',desc:'HP70%未満でINT +30%', cond:'hp_below',    threshold:70, effect:'int_up',        val:30} },
  { id:1006, name:'ピタゴラス',           hp:216, phy:84,  int:84,  agi:56,
    passive:{name:'テトラクテュス',       desc:'HP40%未満でPHY +28%', cond:'hp_below',    threshold:40, effect:'phy_up',        val:28} },
  { id:1007, name:'大長今',               hp:261, phy:40,  int:115, agi:54,
    passive:{name:'李氏朝鮮、宮廷医女',  desc:'スキル後HP +15%回復', cond:'on_skill',    effect:'hp_heal',      val:15} },
  { id:1009, name:'ヘルクレスオオカブト', hp:267, phy:72,  int:71,  agi:64,
    passive:{name:'ローリングドライバー', desc:'バトル開始時に敵INT -64%', cond:'battle_start', effect:'debuff_int',    val:64} },
  { id:2002, name:'スパルタクス',         hp:573, phy:59,  int:42,  agi:42,
    passive:{name:'剣闘士の反乱',        desc:'HP60%未満でPHY +50%', cond:'hp_below',    threshold:60, effect:'phy_up',        val:50} },
  { id:2003, name:'ジャックザリッパー',   hp:234, phy:108, int:25,  agi:123,
    passive:null },
  { id:2005, name:'グリム兄弟',           hp:330, phy:35,  int:110, agi:85,
    passive:{name:'ブレーメンの音楽隊',  desc:'被ダメ時HP +10%回復', cond:'on_hit',      effect:'hp_heal',      val:10} },
  { id:3003, name:'平賀源内',             hp:303, phy:82,  int:119, agi:82,
    passive:{name:'エレキテル',          desc:'HP60%未満でINT +30%', cond:'hp_below',    threshold:60, effect:'int_up',        val:30} },
  { id:3004, name:'マタ・ハリ',           hp:225, phy:59,  int:119, agi:131,
    passive:null },
  { id:4001, name:'張飛',                 hp:516, phy:133, int:88,  agi:55,
    passive:{name:'一騎当千',            desc:'1回だけ死亡時HP50%で復活', cond:'on_death', effect:'revive',       val:50} },
  { id:4002, name:'ナイチンゲール',       hp:345, phy:88,  int:133, agi:112,
    passive:{name:'白衣の天使',          desc:'HP60%未満のときスキル後HP +20%', cond:'on_skill_hp', threshold:60, effect:'hp_heal', val:20} },
  { id:4003, name:'ベートーヴェン',       hp:324, phy:95,  int:133, agi:112,
    passive:{name:'歓喜の歌',            desc:'HP50%未満で敵PHY -25%', cond:'hp_below',  threshold:50, effect:'debuff_phy',    val:25} },
  { id:4004, name:'佐々木小次郎',         hp:324, phy:133, int:64,  agi:143,
    passive:null },
  { id:4005, name:'勝海舟',               hp:387, phy:112, int:95,  agi:112,
    passive:{name:'無血開城',            desc:'HP60%未満スキル後PHY +30%', cond:'on_skill_hp', threshold:60, effect:'phy_up',  val:30} },
  { id:10001,name:'MCHウォーリアー',      hp:162, phy:63,  int:42,  agi:53,
    passive:{name:'クリプトスラッシュ',  desc:'HP50%未満で即時PHY 120%ダメージ', cond:'hp_below', threshold:50, effect:'bonus_dmg_phy', val:120} },
  { id:10002,name:'MCHタクティシャン',    hp:162, phy:42,  int:63,  agi:53,
    passive:{name:'クリプトタクティクス',desc:'HP50%未満で即時INT 120%ダメージ', cond:'hp_below', threshold:50, effect:'bonus_dmg_int', val:120} },
  { id:10006,name:'パスカル',             hp:186, phy:38,  int:78,  agi:74,
    passive:{name:'考える葦',            desc:'HP70%未満でINT +10%', cond:'hp_below',    threshold:70, effect:'int_up',        val:10} },
  { id:10007,name:'ダビデ',               hp:318, phy:74,  int:52,  agi:152,
    passive:null },
];

// ---- Enemy Data (actual MCH base_param, scaled in battle) ----
const ENEMIES_DATA = [
  // PHY型 → 弱点: INT
  { id:111,  name:'エルククローナ ショート',       bHp:5,    bPhy:7,   bInt:4,   bAgi:4,   sc:15 },
  { id:112,  name:'エルククローナ トール',         bHp:6,    bPhy:8,   bInt:5,   bAgi:5,   sc:15 },
  { id:113,  name:'エルククローナ グランデ',       bHp:6,    bPhy:8,   bInt:5,   bAgi:5,   sc:15 },
  { id:114,  name:'エルククローナ ヴェンティ',     bHp:7,    bPhy:9,   bInt:6,   bAgi:6,   sc:15 },
  { id:116,  name:'エルククローナ フラペチーノ',   bHp:13,   bPhy:15,  bInt:12,  bAgi:12,  sc:15 },
  { id:149,  name:'エルククローナ トール ドッピオ',bHp:6,    bPhy:8,   bInt:5,   bAgi:5,   sc:15 },
  { id:1063, name:'ゴースト・花木蘭',             bHp:639,  bPhy:239, bInt:39,  bAgi:87,  sc:1  },
  { id:1153, name:'ゴースト・那須与一',           bHp:1014, bPhy:326, bInt:71,  bAgi:166, sc:1  },

  // INT型 → 弱点: PHY
  { id:121,  name:'ハートブリード ショート',       bHp:5,    bPhy:4,   bInt:7,   bAgi:4,   sc:15 },
  { id:122,  name:'ハートブリード トール',         bHp:6,    bPhy:5,   bInt:8,   bAgi:5,   sc:15 },
  { id:123,  name:'ハートブリード グランデ',       bHp:6,    bPhy:5,   bInt:8,   bAgi:5,   sc:15 },
  { id:124,  name:'ハートブリード ヴェンティ',     bHp:7,    bPhy:6,   bInt:9,   bAgi:6,   sc:15 },
  { id:126,  name:'ハートブリード フラペチーノ',   bHp:13,   bPhy:12,  bInt:15,  bAgi:12,  sc:15 },
  { id:131,  name:'メリッサ ショート',             bHp:6,    bPhy:4,   bInt:6,   bAgi:4,   sc:15 },
  { id:132,  name:'メリッサ トール',               bHp:7,    bPhy:5,   bInt:7,   bAgi:5,   sc:15 },
  { id:1130, name:'ゴースト・周瑜',               bHp:927,  bPhy:111, bInt:242, bAgi:144, sc:1  },
  { id:1164, name:'ゴースト・武則天',             bHp:1044, bPhy:66,  bInt:284, bAgi:187, sc:1  },

  // 均衡型
  { id:101,  name:'クリーパー ショート',           bHp:8,    bPhy:4,   bInt:4,   bAgi:4,   sc:15 },
  { id:102,  name:'クリーパー トール',             bHp:9,    bPhy:5,   bInt:5,   bAgi:5,   sc:15 },
  { id:103,  name:'クリーパー グランデ',           bHp:9,    bPhy:5,   bInt:5,   bAgi:5,   sc:15 },
  { id:106,  name:'クリーパー フラペチーノ',       bHp:16,   bPhy:12,  bInt:12,  bAgi:12,  sc:15 },
  { id:1004, name:'ゴースト・劉邦',               bHp:1329, bPhy:206, bInt:173, bAgi:284, sc:1  },
  { id:1066, name:'ゴースト・スパルタクス',       bHp:1047, bPhy:66,  bInt:33,  bAgi:127, sc:1  },
];

function scaleEnemy(e) {
  return {
    id:   e.id,
    name: e.name,
    hp:   Math.min(450, Math.round(e.bHp  * e.sc * 0.8)),
    phy:  Math.min(150, Math.round(e.bPhy * e.sc * 0.5)),
    int:  Math.min(150, Math.round(e.bInt * e.sc * 0.5)),
    agi:  Math.min(100, Math.round(e.bAgi * e.sc * 0.4)),
  };
}

// ---- Audio ----
const bgm = new Audio('Audio/BGM/pve.mp3');
bgm.loop = true; bgm.volume = 0.35;

function playSound(src, vol = 0.5) {
  const a = new Audio(src); a.volume = vol; a.play().catch(() => {});
}

// ---- Sprite Effect ----
let effFrame = 0, effTimer = null;

function playEffect() {
  const el = $('effect-sprite');
  if (effTimer) clearInterval(effTimer);
  effFrame = 0; el.style.display = 'block';
  effTimer = setInterval(() => {
    const col = effFrame % 9, row = Math.floor(effFrame / 9);
    el.style.backgroundPosition = `${-col * 160}px ${-row * 160}px`;
    if (++effFrame >= 81) { clearInterval(effTimer); effTimer = null; el.style.display = 'none'; }
  }, 38);
}

// ---- DOM ----
const $ = id => document.getElementById(id);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const BACKGROUNDS = [
  1001,1002,1003,1004,1006,1010,1028,1030,1037,1038,1039,1041,
  1046,1047,1049,1050,1051,1052,1053,1054,1055,1056,
  1057,1058,1059,1060,2105,2205,2301,2405,2505,2605,2705,2805,2905,
];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

// ---- Game State ----
let S = {};

function startGame() {
  const hero = rand(HEROES_DATA);

  S = {
    score: 0, timeLeft: 60, gameActive: false,
    timerInt: null, enemyInt: null,

    hero,
    maxHp: hero.hp, curHp: hero.hp,
    curPhy: hero.phy, curInt: hero.int,
    passiveDone: false,
    reviveReady: hero.passive?.effect === 'revive',

    skillCharge: 0,

    enemy: null, eHp: 0, eMaxHp: 0, ePhy: 0, eInt: 0,
    lastEIdx: -1, killLock: false,
  };

  $('screen-game').style.backgroundImage = `url('Image/Backgrounds/${rand(BACKGROUNDS)}.png')`;
  $('hero-img').src = `Image/Heroes/${hero.id}.png`;
  $('hero-name').textContent = hero.name;
  $('score').textContent = '0';
  $('timer').textContent = '60';
  $('hud-right').classList.remove('urgent');
  updateSkillGauge();
  updatePassiveArea();

  showScreen('screen-game');
  bgm.currentTime = 0; bgm.play().catch(() => {});

  spawnEnemy();
  S.timerInt = setInterval(() => {
    S.timeLeft--;
    $('timer').textContent = String(S.timeLeft);
    if (S.timeLeft <= 10) $('hud-right').classList.add('urgent');
    if (S.timeLeft <= 0) endGame();
  }, 1000);

  S.gameActive = true;
}

// ---- Enemy Management ----
function spawnEnemy() {
  if (S.enemyInt) clearInterval(S.enemyInt);
  S.killLock = false;

  let idx;
  do { idx = Math.floor(Math.random() * ENEMIES_DATA.length); }
  while (idx === S.lastEIdx && ENEMIES_DATA.length > 1);
  S.lastEIdx = idx;

  const e = scaleEnemy(ENEMIES_DATA[idx]);
  S.enemy = e; S.eHp = e.hp; S.eMaxHp = e.hp; S.ePhy = e.phy; S.eInt = e.int;

  $('enemy-img').src = `Image/Enemies/${e.id}.png`;
  $('enemy-name').textContent = e.name;
  updateEnemyUI();
  updatePlayerUI();

  if (!S.passiveDone && S.hero.passive?.cond === 'battle_start') triggerPassive();

  const interval = Math.max(900, 3600 - e.agi * 28);
  S.enemyInt = setInterval(enemyAttack, interval);
}

function killEnemy() {
  if (S.killLock) return;
  S.killLock = true;
  S.gameActive = false;
  S.score++;
  $('score').textContent = String(S.score);
  $('enemy-name').textContent = '撃破！';
  playSound('Audio/SE/Battle/3_heal_resurrection.mp3', 0.35);
  setTimeout(() => { S.gameActive = true; spawnEnemy(); }, 420);
}

// ---- Damage Formulas ----
function dmgPhy() {
  const base = Math.max(1, S.curPhy * 0.5 - S.ePhy * 0.15);
  return Math.floor(base * (0.8 + Math.random() * 0.4));
}
function dmgInt() {
  const base = Math.max(1, S.curInt * 0.5 - S.eInt * 0.15);
  return Math.floor(base * (0.8 + Math.random() * 0.4));
}

// ---- Player Attack ----
function attack(type) {
  if (!S.gameActive || S.timeLeft <= 0) return;

  const dmg = type === 'phy' ? dmgPhy() : dmgInt();
  applyDmgToEnemy(dmg, 'dmg');
  playSound('Audio/SE/Battle/1_single_damage.mp3', 0.45);
  playEffect();

  const img = $('enemy-img');
  img.classList.remove('shake');
  void img.offsetWidth;
  img.classList.add('shake');

  S.skillCharge = Math.min(5, S.skillCharge + 1);
  updateSkillGauge();

  if (!S.passiveDone) {
    const p = S.hero.passive;
    if (p?.cond === 'on_skill') triggerPassive();
    if (p?.cond === 'on_skill_hp' && hpPct() < p.threshold) triggerPassive();
  }
}

// ---- Skill ----
function activateSkill() {
  if (S.skillCharge < 5 || !S.gameActive) return;
  S.skillCharge = 0;
  updateSkillGauge();

  const skillDmg = Math.floor(Math.max(S.curPhy, S.curInt) * 1.2);
  applyDmgToEnemy(skillDmg, 'skill');
  playSound('Audio/SE/Battle/2_area_damage.mp3', 0.6);
  playEffect();

  if (!S.passiveDone) {
    const p = S.hero.passive;
    if (p?.cond === 'on_skill') triggerPassive();
    if (p?.cond === 'on_skill_hp' && hpPct() < p.threshold) triggerPassive();
  }
}

function applyDmgToEnemy(dmg, floatType) {
  S.eHp = Math.max(0, S.eHp - dmg);
  updateEnemyUI();
  spawnFloat(dmg, floatType, $('enemy-img'));
  if (S.eHp <= 0) killEnemy();
}

// ---- Enemy Attack ----
function enemyAttack() {
  if (!S.gameActive) return;
  const atkStat = S.eInt > S.ePhy ? S.eInt : S.ePhy;
  const dmg = Math.max(1, Math.floor(atkStat * 0.3 * (0.8 + Math.random() * 0.4)));

  S.curHp = Math.max(0, S.curHp - dmg);
  updatePlayerUI();
  spawnFloat(dmg, 'enemy-dmg', $('hero-img'));

  const hi = $('hero-img');
  hi.classList.remove('flash-hit');
  void hi.offsetWidth;
  hi.classList.add('flash-hit');

  if (S.hero.passive?.cond === 'on_hit') {
    const heal = Math.floor(S.maxHp * S.hero.passive.val / 100);
    S.curHp = Math.min(S.maxHp, S.curHp + heal);
    showPassivePop(`${S.hero.passive.name}！HP +${heal}`);
    updatePlayerUI();
  }

  if (!S.passiveDone && S.hero.passive?.cond === 'hp_below' && hpPct() < S.hero.passive.threshold) {
    triggerPassive();
  }

  if (S.curHp <= 0) {
    if (S.reviveReady) {
      S.reviveReady = false;
      S.curHp = Math.floor(S.maxHp * 0.5);
      updatePlayerUI();
      showPassivePop('一騎当千！HP50%で復活！');
    } else {
      endGame();
    }
  }
}

// ---- Passive ----
function hpPct() { return (S.curHp / S.maxHp) * 100; }

function triggerPassive() {
  const p = S.hero.passive;
  if (!p || (S.passiveDone && p.cond !== 'on_hit')) return;
  if (p.cond !== 'on_hit') S.passiveDone = true;

  switch (p.effect) {
    case 'int_up': {
      S.curInt = Math.floor(S.curInt * (1 + p.val / 100));
      showPassivePop(`${p.name}！INT +${p.val}%`);
      updatePlayerUI();
      break;
    }
    case 'phy_up': {
      S.curPhy = Math.floor(S.curPhy * (1 + p.val / 100));
      showPassivePop(`${p.name}！PHY +${p.val}%`);
      updatePlayerUI();
      break;
    }
    case 'hp_heal': {
      const heal = Math.floor(S.maxHp * p.val / 100);
      S.curHp = Math.min(S.maxHp, S.curHp + heal);
      showPassivePop(`${p.name}！HP +${heal} 回復`);
      updatePlayerUI();
      break;
    }
    case 'debuff_phy': {
      S.ePhy = Math.floor(S.ePhy * (1 - p.val / 100));
      showPassivePop(`${p.name}！敵PHY -${p.val}%`);
      updateEnemyUI();
      break;
    }
    case 'debuff_int': {
      S.eInt = Math.floor(S.eInt * (1 - p.val / 100));
      showPassivePop(`${p.name}！敵INT -${p.val}%`);
      updateEnemyUI();
      break;
    }
    case 'bonus_dmg_phy': {
      const d = Math.floor(S.curPhy * p.val / 100);
      showPassivePop(`${p.name}！PHY ${p.val}%!`);
      applyDmgToEnemy(d, 'skill');
      break;
    }
    case 'bonus_dmg_int': {
      const d = Math.floor(S.curInt * p.val / 100);
      showPassivePop(`${p.name}！INT ${p.val}%!`);
      applyDmgToEnemy(d, 'skill');
      break;
    }
    case 'instant_dmg_int': {
      const d = Math.floor(S.curInt * p.val / 100);
      showPassivePop(`${p.name}！開幕INT ダメージ！`);
      applyDmgToEnemy(d, 'skill');
      break;
    }
  }

  updatePassiveArea();
}

// ---- UI Updates ----
function updatePlayerUI() {
  const pct = (S.curHp / S.maxHp) * 100;
  $('player-hp-fill').style.width = pct + '%';
  $('player-hp-fill').style.background = pct > 50 ? '#44aaff' : pct > 25 ? '#ffaa44' : '#ff4444';
  $('stat-phy').textContent = S.curPhy;
  $('stat-int').textContent = S.curInt;
}

function updateEnemyUI() {
  const pct = (S.eHp / S.eMaxHp) * 100;
  $('enemy-hp-fill').style.width = pct + '%';
  $('enemy-hp-fill').style.background = pct > 55 ? '#ff4444' : pct > 25 ? '#ffa844' : '#44ff88';
  $('enemy-phy-val').textContent = S.ePhy;
  $('enemy-int-val').textContent = S.eInt;

  const badge = $('weak-badge');
  if (S.ePhy < S.eInt)      { badge.textContent = '弱点:PHY'; badge.style.background = '#1e55dd'; }
  else if (S.eInt < S.ePhy) { badge.textContent = '弱点:INT'; badge.style.background = '#8833cc'; }
  else                       { badge.textContent = '均衡';     badge.style.background = '#555'; }
}

function updateSkillGauge() {
  $('skill-gauge-fill').style.width = (S.skillCharge / 5 * 100) + '%';
  const ready = S.skillCharge >= 5;
  $('btn-skill').classList.toggle('ready', ready);
  $('skill-btn-text').textContent = ready ? 'SKILL!' : `SKILL ${S.skillCharge}/5`;
}

function updatePassiveArea() {
  const p = S.hero.passive;
  if (!p) { $('passive-area').style.visibility = 'hidden'; return; }
  $('passive-area').style.visibility = 'visible';
  $('passive-name').textContent = p.name;
  const done = S.passiveDone && p.cond !== 'on_hit';
  $('passive-desc').textContent = done ? '（発動済み）' : p.desc;
  $('passive-area').style.opacity = done ? '0.4' : '1';
}

let popTimer = null;
function showPassivePop(text) {
  const el = $('passive-pop');
  el.textContent = text;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  if (popTimer) clearTimeout(popTimer);
  popTimer = setTimeout(() => el.classList.remove('show'), 2100);
}

function spawnFloat(val, type, refEl) {
  const rect = refEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = `dmg-float ${type}`;
  el.textContent = type === 'enemy-dmg' ? `-${val}` : `+${val}`;
  el.style.left = (rect.left + rect.width / 2 - 18 + (Math.random() - 0.5) * 30) + 'px';
  el.style.top  = (rect.top + (Math.random() - 0.5) * 20) + 'px';
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ---- End Game ----
function endGame() {
  if (S.timerInt) clearInterval(S.timerInt);
  if (S.enemyInt) clearInterval(S.enemyInt);
  S.gameActive = false;
  bgm.pause();
  playSound('Audio/SE/Jingles/win.mp3', 0.65);
  $('result-score').textContent = String(S.score);
  setTimeout(() => showScreen('screen-result'), 700);
}

// ---- Events ----
$('btn-start').addEventListener('click', startGame);
$('btn-retry').addEventListener('click', startGame);
function bindBtn(id, fn) {
  $(id).addEventListener('touchend', e => { e.preventDefault(); fn(); }, { passive: false });
  $(id).addEventListener('click', fn);
}

bindBtn('btn-phy', () => attack('phy'));
bindBtn('btn-int', () => attack('int'));
bindBtn('btn-skill', activateSkill);
