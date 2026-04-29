// ===== Theme =====
(function () {
  const saved = localStorage.getItem('theme110');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme110', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme110', 'dark');
    }
  });
})();

// ===== TOC + topnav =====
(function () {
  const sections = Array.from(document.querySelectorAll('section.card'));
  const toc = document.getElementById('toc');
  const topnav = document.getElementById('topnav');
  sections.forEach(sec => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    a.textContent = h2.textContent;
    li.appendChild(a);
    toc.appendChild(li);

    const t = document.createElement('a');
    t.href = '#' + sec.id;
    const num = h2.textContent.match(/^\d+/);
    t.textContent = num ? num[0] : h2.textContent;
    t.title = h2.textContent;
    topnav.appendChild(t);
  });

  // Scrollspy
  const links = Array.from(document.querySelectorAll('.toc a, .topnav a'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => observer.observe(s));
})();

// ===== Search =====
(function () {
  const input = document.getElementById('search');
  const sections = Array.from(document.querySelectorAll('section.card'));

  function clearHighlights() {
    document.querySelectorAll('.search-hit').forEach(el => el.classList.remove('search-hit'));
    sections.forEach(s => s.classList.remove('search-hidden'));
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    clearHighlights();
    if (!q) return;
    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (!text.includes(q)) {
        sec.classList.add('search-hidden');
      } else {
        // Highlight individual elements
        sec.querySelectorAll('li, p, td, h3, h4').forEach(el => {
          if (el.textContent.toLowerCase().includes(q)) el.classList.add('search-hit');
        });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.blur();
    }
  });
})();

// ===== Quiz =====
(function () {
  const QUIZ = window.QUIZ_DATA || [];
  const area = document.getElementById('quiz-area');
  const startBtn = document.getElementById('quiz-start');
  const catSel = document.getElementById('quiz-category');
  const cntSel = document.getElementById('quiz-count');
  const shuffleChk = document.getElementById('quiz-shuffle');
  const instantChk = document.getElementById('quiz-instant');

  const PROGRESS_KEY = 'quiz110-progress';
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderProgress() {
    const p = loadProgress();
    const totalQ = QUIZ.length;
    const answered = Object.keys(p).length;
    const correct = Object.values(p).filter(v => v.correct).length;
    const fill = document.getElementById('progress-fill');
    const txt = document.getElementById('progress-text');
    if (answered === 0) {
      fill.style.width = '0%';
      txt.textContent = `Ingen quiz startet enda. (${totalQ} spørsmål totalt)`;
      return;
    }
    const pct = Math.round((correct / totalQ) * 100);
    fill.style.width = pct + '%';
    txt.textContent = `${correct}/${totalQ} riktig (${pct}%) — ${answered} besvart`;
  }
  renderProgress();

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (confirm('Nullstille all quizprogresjon?')) {
      localStorage.removeItem(PROGRESS_KEY);
      renderProgress();
      area.innerHTML = '';
    }
  });

  function buildQuestion(q, idx, total, instant) {
    const card = document.createElement('div');
    card.className = 'quiz-question';
    card.dataset.qid = q.id;

    const meta = document.createElement('div');
    meta.className = 'qmeta';
    meta.textContent = q.kategori.toUpperCase() + (q.riktig.length > 1 ? ' • flere svar' : '');
    card.appendChild(meta);

    const num = document.createElement('div');
    num.className = 'qnum';
    num.textContent = `Spørsmål ${idx + 1} av ${total}`;
    card.appendChild(num);

    const qt = document.createElement('div');
    qt.className = 'qtext';
    qt.textContent = q.sporsmal;
    card.appendChild(qt);

    const optsWrap = document.createElement('div');
    const userPicks = new Set();

    q.valg.forEach((v, i) => {
      const opt = document.createElement('div');
      opt.className = 'qopt';
      opt.textContent = v;
      opt.addEventListener('click', () => {
        if (opt.classList.contains('disabled')) return;
        if (q.riktig.length > 1) {
          // multi-select: toggle
          if (userPicks.has(i)) { userPicks.delete(i); opt.style.outline = ''; }
          else { userPicks.add(i); opt.style.outline = '2px solid var(--blue)'; }
        } else {
          // single-select: lock immediately
          userPicks.clear();
          userPicks.add(i);
          if (instant) finalize();
        }
      });
      optsWrap.appendChild(opt);
    });
    card.appendChild(optsWrap);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn small';
    submitBtn.textContent = 'Svar';
    submitBtn.style.marginTop = '8px';
    if (q.riktig.length > 1 || !instant) {
      card.appendChild(submitBtn);
      submitBtn.addEventListener('click', finalize);
    }

    function finalize() {
      const opts = optsWrap.querySelectorAll('.qopt');
      const correctSet = new Set(q.riktig);
      const isCorrect = correctSet.size === userPicks.size && [...correctSet].every(i => userPicks.has(i));

      opts.forEach((el, i) => {
        el.classList.add('disabled');
        el.style.outline = '';
        if (correctSet.has(i)) el.classList.add('correct');
        if (userPicks.has(i) && !correctSet.has(i)) el.classList.add('wrong');
      });

      if (q.forklaring) {
        const expl = document.createElement('div');
        expl.className = 'qexpl';
        expl.innerHTML = '<strong>Forklaring:</strong> ' + q.forklaring;
        card.appendChild(expl);
      }

      submitBtn.remove();

      const p = loadProgress();
      const prev = p[q.id] || { tries: 0 };
      p[q.id] = { correct: isCorrect, tries: prev.tries + 1, ts: Date.now() };
      saveProgress(p);
      renderProgress();

      // Check if all questions in current set are done
      const totalCards = document.querySelectorAll('.quiz-question').length;
      const doneCards = document.querySelectorAll('.quiz-question .qopt.correct, .quiz-question .qopt.wrong').length;
      // Count cards where ANY opt has correct/wrong class
      let cardsDone = 0;
      document.querySelectorAll('.quiz-question').forEach(c => {
        if (c.querySelector('.qopt.correct') || c.querySelector('.qopt.wrong')) cardsDone++;
      });
      if (cardsDone === totalCards) {
        showSummary();
      }
    }

    return card;
  }

  function showSummary() {
    const cards = document.querySelectorAll('.quiz-question');
    let right = 0, total = cards.length;
    cards.forEach(c => {
      const wrong = c.querySelector('.qopt.wrong');
      if (!wrong) right++;
    });
    const sum = document.createElement('div');
    sum.className = 'quiz-summary';
    const pct = Math.round((right / total) * 100);
    sum.innerHTML = `
      <h3>Resultat</h3>
      <div class="score">${right} / ${total} (${pct}%)</div>
      <p>${pct >= 80 ? 'Solid! Klar for eksamen.' : pct >= 60 ? 'Godkjent. Repeter feilene over.' : 'Trenger mer repetisjon. Les igjennom forklaringene og kjør på nytt.'}</p>
      <button class="btn primary" onclick="document.getElementById('quiz-start').click()">Ny test</button>
    `;
    area.prepend(sum);
    sum.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  startBtn.addEventListener('click', () => {
    area.innerHTML = '';
    let pool = QUIZ.slice();
    const cat = catSel.value;
    if (cat !== 'all') pool = pool.filter(q => q.kategori === cat);
    if (shuffleChk.checked) pool = shuffle(pool);
    const cnt = parseInt(cntSel.value, 10);
    if (cnt > 0) pool = pool.slice(0, cnt);

    if (pool.length === 0) {
      area.innerHTML = '<p>Ingen spørsmål funnet for valgt kategori.</p>';
      return;
    }

    pool.forEach((q, i) => area.appendChild(buildQuestion(q, i, pool.length, instantChk.checked)));
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
