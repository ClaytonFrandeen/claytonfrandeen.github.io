// ── BOOT SEQUENCE ──────────────────────────────────────────────
(function () {
  const label = document.getElementById('bootLabel');
  if (!label) return;

  const lines = [
    { text: '// INITIALIZING...', delay: 0 },
    { text: '// SYS_CHECK · ALL SYSTEMS NOMINAL', delay: 1000 },
    { text: '// SYS_INIT · UNIT-04 · READY', delay: 2000 },
  ];

  let lineIndex = 0;

  function typeLine(text, onDone) {
    label.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'boot-cursor';
    label.appendChild(cursor);
    let i = 0;
    const interval = setInterval(() => {
      label.textContent = text.slice(0, i);
      label.appendChild(cursor);
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTimeout(onDone, 300);
      }
    }, 38);
  }

  function runNext() {
    if (lineIndex >= lines.length) {
      const cursor = label.querySelector('.boot-cursor');
      if (cursor) setTimeout(() => cursor.remove(), 800);
      return;
    }
    const { text, delay } = lines[lineIndex++];
    setTimeout(() => typeLine(text, runNext), delay);
  }

  setTimeout(runNext, 300);
})();


// ── DATA ───────────────────────────────────────────────────────
const tapeData = {
  // PROJECTS
  trek: {
    type: 'project',
    title: 'Trek App',
    meta: '2025 · Android · Team Project',
    desc: 'Android fitness tracker built with Kotlin and Firebase. Real-time GPS run tracking, route mapping, step counting, and calorie tracking. I owned the full backend, Firestore schema design, Firebase Auth, and Docker infrastructure. Built as a team project at CSU San Marcos.',
    tags: ['Kotlin', 'Firebase', 'Firestore', 'Google Maps API', 'Docker', 'Android'],
    link: 'https://github.com/ClaytonFrandeen/Trekapp/tree/main',
    linkLabel: 'VIEW PROJECT →',
  },
  avian: {
    type: 'project',
    title: 'Hallowed Feathers',
    meta: '2026 · Unity · Team Project',
    desc: 'Dark bird-themed souls-like RPG built in Unity. Fight through waves of enemies, rest at ancient nests, level up, and face a brutal avian boss. I built the core gameplay loop — full combat system, hit detection, health and stamina, leveling, enemy AI, and nest respawn mechanics.',
    tags: ['Unity', 'C#', 'Git', 'Game Dev', 'Souls-like'],
    link: 'https://github.com/ClaytonFrandeen/hollow-feathers',
    linkLabel: 'VIEW PROJECT →',
  },
  snail: {
    type: 'project',
    title: 'S.N.A.I.L',
    meta: '2026 · Robotics · Team Project',
    desc: 'Autonomous robot car that detects and chases a soccer ball in real time using computer vision. I built the full CV pipeline, collected and labeled training data, trained the YOLO model from scratch, and integrated it into the live camera feed connected to ROS2 navigation nodes.',
    tags: ['Python', 'YOLO', 'ROS2', 'Docker', 'Computer Vision'],
    link: 'https://github.com/ClaytonFrandeen/S.N.A.I.L',
    linkLabel: 'VIEW PROJECT →',
  },
  portfolio: {
    type: 'project',
    title: 'Portfolio Website',
    meta: '2026 · Web · Solo',
    desc: 'This site. Built with vanilla HTML, CSS, and JS with a cassette futurism aesthetic. Deployed on GitHub Pages.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    link: 'https://claytonfrandeen.github.io',
    linkLabel: 'VIEW SITE →',
  },
  unity: {
    type: 'project',
    title: 'Unity Game (WIP)',
    meta: 'In Progress · Solo',
    desc: 'A personal game project currently in development using Unity. More details coming soon.',
    tags: ['Unity', 'C#', 'Game Dev'],
    link: '#',
    linkLabel: 'COMING SOON',
  },

  // WORK EXPERIENCE
  treobytes: {
    type: 'work',
    title: 'Tréobytes',
    meta: 'STEM Facilitator · DECEMBER 2025 - MARCH 2026',
    desc: 'Delivered hands-on STEM lessons to elementary students covering buoyancy, forces, and gravity. Guided a culminating research project through to individual trifold presentations. Organized and ran a competitive boat navigation event, handling all scoring and logistics.',
    tags: ['Education', 'Robotics', 'Curriculum', 'Mentorship'],
    link: '#',
    linkLabel: null,
    skills: [
      { name: 'Curriculum',  val: 85 },
      { name: 'Robotics',    val: 72 },
      { name: 'Mentorship',  val: 88 },
      { name: 'Comm.',       val: 90 },
    ],
  },

  photogenic: {
    type: 'work',
    title: 'Photogenic INC. / San Diego Zoo Safari Park',
    meta: 'Photo Sales Associate · MARCH 2025 - CURRENT',
    desc: 'ront-line customer engagement at a high-volume zoo environment — greeting and photographing 300+ visitors daily. Presented and sold photo packages using interpersonal skills and product knowledge. Set up and managed portable kiosk displays to showcase guest photos on-site.',
    tags: ['Photography', 'Sales', 'Customer Service'],
    link: '#',
    linkLabel: null,
    skills: [
      {name: 'Photography', val: 70 },
      {name: 'Sales', val: 85 },
      {name: 'Customer Service', val: 100}
    ],
  },

  bettys: {
    type: 'work',
    title: 'Betty Burgers',
    meta: 'Cashier -> Assistant Manager · JULY 2021 - JULY 2024',
    desc: 'Grew from cashier to assistant manager over three years at a fast-paced burger joint. Handled 100+ daily customer interactions, managed transactions, food delivery, and take-out prep. As AM, supported open/close operations, trained staff on promotions to drive sales, supervised team procedures, and managed multiple $300 cash drawers with a 100% end-of-day accuracy rate.',      
    tags: ['Customer Service', 'Leadership', 'Efficiency'],
    link: '#',
    linkLabel: null,
    skills: [
      {name: 'Customer Service', val: 100},
      {name: 'Leadership', val: 80},
      {name: 'Efficiency', val: 88}
    ]
  }

};


// ── STATE ──────────────────────────────────────────────────────
let currentTapeId = null;
let vuInterval    = null;


// ── LOAD TAPE ─────────────────────────────────────────────────
function loadTape(id) {
  if (currentTapeId === id) return;

  const sourceCassette = document.querySelector(`.cassette[data-id="${id}"]`);
  if (!sourceCassette) return;

  // If something already loaded, eject it first (instant, no anim)
  if (currentTapeId) {
    _clearDeck();
  }

  currentTapeId = id;

  // Mark the source cassette as loading (fade it)
  sourceCassette.classList.add('loading');

  // ── Build the flying clone ──
  const sourceBody  = sourceCassette.querySelector('.tape-body');
  const sourceLabel = sourceCassette.querySelector('.tape-label');
  const sourceTitle = sourceCassette.querySelector('.tape-title');
  const sourceSub   = sourceCassette.querySelector('.tape-subtitle');

  const flying      = document.getElementById('flyingTape');
  const flyingBody  = document.getElementById('flyingTapeBody');
  const flyingLabel = document.getElementById('flyingTapeLabel');
  const flyingTitle = document.getElementById('flyingTapeTitle');
  const flyingSub   = document.getElementById('flyingTapeSub');

  // Copy tape colors
  const tapeColor  = getComputedStyle(sourceCassette).getPropertyValue('--tape-color').trim();
  const labelColor = getComputedStyle(sourceCassette).getPropertyValue('--label-color').trim();
  flyingBody.style.background  = tapeColor  || '#1a1a1a';
  flyingLabel.style.background = labelColor || '#fff2e6';
  flyingTitle.textContent      = sourceTitle ? sourceTitle.textContent : '';
  flyingSub.textContent        = sourceSub   ? sourceSub.textContent   : '';

  // Copy any inline label overrides
  if (sourceLabel) {
    const bg     = sourceLabel.style.background;
    const border = sourceLabel.style.borderColor;
    if (bg)     flyingLabel.style.background   = bg;
    if (border) flyingLabel.style.borderColor  = border;
  }
  if (sourceTitle && sourceTitle.style.color) {
    flyingTitle.style.color = sourceTitle.style.color;
  }
  if (sourceSub && sourceSub.style.color) {
    flyingSub.style.color = sourceSub.style.color;
  }

  // Position flying tape at source
  const srcRect  = sourceBody.getBoundingClientRect();
  const deckSlot = document.getElementById('deckSlot');
  const dstRect  = deckSlot.getBoundingClientRect();

  flying.style.transition = 'none';
  flying.style.left       = srcRect.left + 'px';
  flying.style.top        = srcRect.top  + 'px';
  flying.style.width      = srcRect.width + 'px';
  flying.style.height     = srcRect.height + 'px';
  flying.classList.add('animating');

  // Animate to deck slot
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flying.style.transition = 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
      flying.style.left       = dstRect.left + 'px';
      flying.style.top        = dstRect.top  + 'px';
      flying.style.width      = '100px';
      flying.style.height     = '64px';
    });
  });

  // After animation lands, populate deck and board
  setTimeout(() => {
    flying.classList.remove('animating');
    flying.style.opacity = '0';

    _populateDeck(id, tapeColor, labelColor, sourceLabel, sourceTitle, sourceSub);
    _populateBoard(id);

    sourceCassette.classList.remove('loading');
  }, 520);
}


function _populateDeck(id, tapeColor, labelColor, sourceLabel, sourceTitle, sourceSub) {
  const data     = tapeData[id];
  const preview  = document.getElementById('deckTapePreview');
  const status   = document.getElementById('deckStatus');
  const ejectBtn = document.getElementById('ejectBtn');

  // Build a mini tape inside the deck preview
  preview.innerHTML = `
    <div class="tape-body" style="background:${tapeColor || '#1a1a1a'};">
      <div class="tape-notch"></div>
      <div class="tape-label" style="background:${labelColor || '#fff2e6'};">
        <div class="tape-title" style="${sourceTitle && sourceTitle.style.color ? 'color:' + sourceTitle.style.color : ''}">${sourceTitle ? sourceTitle.textContent : ''}</div>
        <div class="tape-subtitle" style="${sourceSub && sourceSub.style.color ? 'color:' + sourceSub.style.color : ''}">${sourceSub ? sourceSub.textContent : ''}</div>
      </div>
      <div class="tape-window">
        <div class="spool"></div><div class="tape-ribbon"></div><div class="spool"></div>
      </div>
    </div>`;

  // Slide into deck
  setTimeout(() => preview.classList.add('loaded'), 20);

  status.textContent = data.type === 'work' ? 'WORK EXP' : 'PROJECT';
  status.classList.add('has-tape');
  ejectBtn.disabled = false;

  // VU meter pulse
  _startVu();
}


function _populateBoard(id) {
  const data = tapeData[id];

  document.getElementById('boardIdle').style.display = 'none';

  const detail = document.getElementById('boardDetail');
  detail.classList.add('visible');

  document.getElementById('detailTypeLabel').textContent =
    data.type === 'work' ? '// WORK EXPERIENCE' : '// PROJECT';
  document.getElementById('detailTitle').textContent = data.title;
  document.getElementById('detailMeta').textContent  = data.meta;
  document.getElementById('detailDesc').textContent  = data.desc;

  // Tags
  const tagsEl = document.getElementById('detailTags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="detail-tag">${t}</span>`).join('');

  // Link
  const linkEl = document.getElementById('detailLink');
  if (data.linkLabel && data.link && data.link !== '#') {
    linkEl.innerHTML = `<a href="${data.link}" target="_blank" class="btn">${data.linkLabel}</a>`;  
  } else {
    linkEl.innerHTML = '';
  }

  // Skills (work tapes only)
  const skillsEl = document.getElementById('detailSkills');
  const skillRows = document.getElementById('skillRows');

  if (data.type === 'work' && data.skills) {
    skillsEl.classList.add('visible');
    skillRows.innerHTML = data.skills.map(s => `
      <div class="skill-row">
        <span class="skill-name">${s.name}</span>
        <div class="skill-track"><div class="skill-fill" data-val="${s.val}" style="width:0%"></div></div>
        <span class="skill-val">${s.val}</span>
      </div>`).join('');

    // Animate bars after a short delay
    setTimeout(() => {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.val + '%';
      });
    }, 80);
  } else {
    skillsEl.classList.remove('visible');
    skillRows.innerHTML = '';
  }

  // Now playing
  document.getElementById('nowPlaying').innerHTML =
    `▶ NOW PLAYING: ${data.title.toUpperCase()} <span>█</span>`;
}


// ── EJECT TAPE ─────────────────────────────────────────────────
function ejectTape() {
  if (!currentTapeId) return;
  _clearDeck();
  currentTapeId = null;
}


function _clearDeck() {
  // Slide preview out
  const preview = document.getElementById('deckTapePreview');
  preview.classList.remove('loaded');
  setTimeout(() => { preview.innerHTML = ''; }, 450);

  document.getElementById('deckStatus').textContent = 'NO TAPE';
  document.getElementById('deckStatus').classList.remove('has-tape');
  document.getElementById('ejectBtn').disabled = true;

  // Hide board detail, show idle
  const detail = document.getElementById('boardDetail');
  detail.classList.remove('visible');
  document.getElementById('boardIdle').style.display = 'flex';
  document.getElementById('nowPlaying').innerHTML = '';

  _stopVu();
}


// ── VU METER ──────────────────────────────────────────────────
const vuBars = ['vu1','vu2','vu3','vu4','vu5'];

function _startVu() {
  _stopVu();
  vuInterval = setInterval(() => {
    vuBars.forEach((id, i) => {
      const bar = document.getElementById(id);
      if (!bar) return;
      const r = Math.random();
      const h = Math.floor(20 + r * 70);
      bar.style.height = h + '%';
      bar.classList.toggle('active',    h > 30);
      bar.classList.toggle('active-hi', h > 85);
    });
  }, 120);
}

function _stopVu() {
  if (vuInterval) clearInterval(vuInterval);
  vuInterval = null;
  vuBars.forEach(id => {
    const bar = document.getElementById(id);
    if (!bar) return;
    bar.style.height = '30%';
    bar.classList.remove('active', 'active-hi');
  });
}
