/* ================= Quiz Champion app ================= */
(function(){
"use strict";

const $ = sel => document.querySelector(sel);
const main = $("#main");
const nav = $("#nav");

/* ---------- progress storage ---------- */
const STORE_KEY = "quizchamp-progress";
function loadProg(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }catch(e){ return {}; } }
function saveProg(p){ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
function setScore(id, score, total){
  const p = loadProg();
  const prev = p[id];
  if(!prev || score > prev.score) p[id] = {score, total};
  saveProg(p); buildNav();
}
function getScore(id){ return loadProg()[id]; }

/* ---------- topic registry ---------- */
const SPECIALS = [window.MOVIES, window.CURRENT, window.CLUES, window.CROSSWORD];
function allTopics(){
  return [...window.MATHS_TOPICS, window.MOVIES, window.CROSSWORD,
          ...window.SCIENCE_TOPICS, window.CURRENT, window.CLUES];
}
function findTopic(id){ return allTopics().find(t => t.id === id); }

/* ---------- navigation ---------- */
const NAV_PLAN = [
  {label:null, items:[{id:"home", icon:"🏠", title:"Home & Battle Plan"}]},
  {label:"Mathematics", items:[
    ...window.MATHS_TOPICS.filter(t=>["series","dice","calendar","direction"].includes(t.id)),
    window.MOVIES,
    window.MATHS_TOPICS.find(t=>t.id==="mirror"),
    window.CROSSWORD
  ]},
  {label:"Science", items:[
    ...window.SCIENCE_TOPICS.filter(t=>["cell","fibre","motion"].includes(t.id)),
    window.CURRENT,
    window.CLUES,
    window.SCIENCE_TOPICS.find(t=>t.id==="video"),
    window.SCIENCE_TOPICS.find(t=>t.id==="handson")
  ]},
  {label:"Final Round", items:[window.RAPID]}
];

function buildNav(){
  nav.innerHTML = "";
  NAV_PLAN.forEach(group=>{
    if(group.label){
      const h = document.createElement("div");
      h.className = "nav-section"; h.textContent = group.label;
      nav.appendChild(h);
    }
    group.items.forEach(t=>{
      const a = document.createElement("button");
      a.className = "nav-item";
      a.dataset.route = t.id;
      const sc = getScore(t.id);
      a.innerHTML = `<span class="ic">${t.icon}</span><span>${t.title}</span>` +
        (sc ? `<span class="done">${sc.score}/${sc.total}</span>` : "");
      a.onclick = ()=>{ location.hash = t.id; closeSidebar(); };
      nav.appendChild(a);
    });
  });
  highlightNav();
}
function highlightNav(){
  const route = (location.hash || "#home").slice(1).split("/")[0];
  document.querySelectorAll(".nav-item").forEach(el=>{
    el.classList.toggle("active", el.dataset.route === route);
  });
}

/* ---------- sidebar mobile ---------- */
$("#menuBtn").onclick = ()=> $("#sidebar").classList.toggle("open");
function closeSidebar(){ $("#sidebar").classList.remove("open"); }
$("#resetProgress").onclick = ()=>{
  if(confirm("Reset all saved quiz scores?")){ localStorage.removeItem(STORE_KEY); buildNav(); render(); }
};

/* ================= QUIZ ENGINE ================= */
function quizHTML(container, questions, topicId, opts={}){
  let i = 0, score = 0;
  const qs = opts.shuffle ? shuffle([...questions]) : questions;
  function show(){
    if(i >= qs.length){ return finish(); }
    const q = qs[i];
    container.innerHTML = `
      <div class="qnum">Question ${i+1} of ${qs.length} &nbsp;•&nbsp; Score: ${score}</div>
      <div class="quiz-progress"><div style="width:${(i/qs.length)*100}%"></div></div>
      <div class="question">${q.q}</div>
      <div class="options">${q.opts.map((o,k)=>`<button class="opt" data-k="${k}">${String.fromCharCode(65+k)}. ${o}</button>`).join("")}</div>
      <div class="explain" style="display:none"></div>
      <div class="quiz-actions"><button class="btn" id="nextBtn" style="display:none">Next →</button></div>`;
    container.querySelectorAll(".opt").forEach(btn=>{
      btn.onclick = ()=>{
        const k = +btn.dataset.k;
        container.querySelectorAll(".opt").forEach(b=>b.disabled = true);
        container.querySelectorAll(".opt")[q.ans].classList.add("correct");
        if(k === q.ans){ score++; } else { btn.classList.add("wrong"); }
        if(q.exp){
          const ex = container.querySelector(".explain");
          ex.style.display = "block";
          ex.innerHTML = `<b>${k===q.ans ? "✅ Correct!" : "❌ Not quite."}</b> ${q.exp}`;
        }
        const nb = container.querySelector("#nextBtn");
        nb.style.display = "inline-block";
        nb.textContent = (i === qs.length-1) ? "See result 🏁" : "Next →";
        nb.onclick = ()=>{ i++; show(); };
        nb.focus();
      };
    });
  }
  function finish(){
    if(topicId) setScore(topicId, score, qs.length);
    const pct = Math.round(score/qs.length*100);
    const verdict = pct===100 ? "🏆 PERFECT! Tomorrow is yours." :
      pct>=80 ? "🔥 Excellent — quiz-ready!" :
      pct>=60 ? "💪 Good — revise the explanations you missed." :
      "📚 Re-read the Learn tab, then retry. You've got this!";
    container.innerHTML = `
      <div class="center" style="padding:30px 0">
        <div class="score-big">${score} / ${qs.length}</div>
        <p class="lead">${verdict}</p>
        <button class="btn" id="retryBtn">↺ Try again</button>
      </div>`;
    container.querySelector("#retryBtn").onclick = ()=>{ i=0; score=0; show(); };
  }
  show();
}
function shuffle(a){ for(let j=a.length-1;j>0;j--){ const k=Math.floor(Math.random()*(j+1)); [a[j],a[k]]=[a[k],a[j]]; } return a; }

/* ================= PAGE RENDERERS ================= */

function pageHeader(t){
  return `<h1>${t.icon} ${t.title}</h1><p class="lead">${t.desc||""}</p>`;
}

/* ----- standard topic: Learn / Examples / Practice ----- */
function renderTopic(t){
  const hasEx = t.examples && t.examples.length;
  main.innerHTML = pageHeader(t) + `
    <div class="tabs">
      <button class="tab active" data-tab="learn">📖 Learn</button>
      ${hasEx ? '<button class="tab" data-tab="examples">✍️ Worked Examples</button>' : ""}
      <button class="tab" data-tab="quiz">🎯 Practice Quiz (${t.quiz.length} Qs)</button>
    </div>
    <div id="tabBody"></div>`;
  const body = $("#tabBody");
  function showTab(name){
    document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===name));
    if(name==="learn"){ body.innerHTML = t.learn; }
    else if(name==="examples"){
      body.innerHTML = t.examples.map((e,i)=>`
        <div class="example"><div class="example-q">Q${i+1}. ${e.q} <span class="arrow">▼ solution</span></div>
        <div class="example-a">${e.a}</div></div>`).join("");
      body.querySelectorAll(".example-q").forEach(el=>{
        el.onclick = ()=> el.parentElement.classList.toggle("open");
      });
    }
    else { quizHTML(body, t.quiz, t.id); }
  }
  document.querySelectorAll(".tab").forEach(b=> b.onclick = ()=>showTab(b.dataset.tab));
  showTab("learn");
}

/* ----- movies: flashcards + quiz ----- */
function renderMovies(){
  const t = window.MOVIES;
  main.innerHTML = pageHeader(t) + t.intro + `
    <div class="tabs">
      <button class="tab active" data-tab="cards">🃏 Flashcards</button>
      <button class="tab" data-tab="quiz">🎯 Practice Quiz (${t.quiz.length} Qs)</button>
    </div>
    <div id="tabBody"></div>`;
  const body = $("#tabBody");
  function showTab(name){
    document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===name));
    if(name==="cards"){
      body.innerHTML = `<p class="small">Click a card to flip it. Learn front→back, then test back→front!</p>
      <div class="flash-grid">` + t.cards.map(c=>`
        <div class="flash"><div class="flash-inner">
          <div class="flash-face flash-front">
            <div class="big">${c.emoji}</div>
            <div class="ttl">${c.title}</div>
            <div class="hint">tap to reveal</div>
          </div>
          <div class="flash-face flash-back">
            <h4>${c.person}</h4>
            <p><b>Cast:</b> ${c.actor}</p>
            <p>${c.facts}</p>
            <p class="scene"><b>Famous scenes:</b> ${c.scenes}</p>
          </div>
        </div></div>`).join("") + `</div>`;
      body.querySelectorAll(".flash").forEach(f=> f.onclick = ()=> f.classList.toggle("flipped"));
    } else {
      quizHTML(body, t.quiz, t.id);
    }
  }
  document.querySelectorAll(".tab").forEach(b=> b.onclick = ()=>showTab(b.dataset.tab));
  showTab("cards");
}

/* ----- crossword ----- */
function renderCrossword(){
  const t = window.CROSSWORD;
  // build cell map
  const cells = {}; // "r,c" -> {letter, num}
  let num = 1;
  const startNums = {};
  t.words.forEach(w=>{
    const key = w.row + "," + w.col;
    if(!(key in startNums)){ startNums[key] = num++; }
    w.num = startNums[key];
    for(let i=0;i<w.word.length;i++){
      const r = w.row + (w.dir==="D" ? i : 0);
      const c = w.col + (w.dir==="A" ? i : 0);
      cells[r+","+c] = cells[r+","+c] || {};
      cells[r+","+c].letter = w.word[i];
    }
  });
  Object.keys(startNums).forEach(k=>{ if(cells[k]) cells[k].num = startNums[k]; });

  let gridHTML = `<div class="cw-grid" style="grid-template-columns:repeat(${t.cols},34px)">`;
  for(let r=0;r<t.rows;r++){
    for(let c=0;c<t.cols;c++){
      const cell = cells[r+","+c];
      if(cell){
        gridHTML += `<div class="cw-cell">${cell.num?`<span class="cw-num">${cell.num}</span>`:""}<input maxlength="1" data-r="${r}" data-c="${c}" autocomplete="off"></div>`;
      } else {
        gridHTML += `<div class="cw-cell block"></div>`;
      }
    }
  }
  gridHTML += "</div>";

  const across = t.words.filter(w=>w.dir==="A").sort((a,b)=>a.num-b.num);
  const down = t.words.filter(w=>w.dir==="D").sort((a,b)=>a.num-b.num);
  main.innerHTML = pageHeader(t) + `
    <div class="card tip"><b>How the real round works:</b> you'll get clues like these — maths vocabulary, famous mathematicians, shapes. Fill this one as a team warm-up, then study the vocab bank below.</div>
    <div class="cw-wrap">
      <div>${gridHTML}
        <div class="quiz-actions">
          <button class="btn" id="cwCheck">✔ Check</button>
          <button class="btn secondary" id="cwReveal">👁 Reveal all</button>
          <button class="btn ghost" id="cwClear">Clear</button>
          <span id="cwMsg" class="small"></span>
        </div>
      </div>
      <div class="cw-clues">
        <h3>Across</h3><ul>${across.map(w=>`<li data-w="${w.word}"><b>${w.num}.</b> ${w.clue} <span class="small">(${w.word.length})</span></li>`).join("")}</ul>
        <h3>Down</h3><ul>${down.map(w=>`<li data-w="${w.word}"><b>${w.num}.</b> ${w.clue} <span class="small">(${w.word.length})</span></li>`).join("")}</ul>
      </div>
    </div>
    <hr class="divider">` + t.vocab;

  const inputs = [...main.querySelectorAll(".cw-cell input")];
  inputs.forEach(inp=>{
    inp.addEventListener("input", ()=>{
      inp.classList.remove("ok","ko");
      if(inp.value){
        // advance to next input
        const idx = inputs.indexOf(inp);
        if(idx < inputs.length-1) inputs[idx+1].focus();
      }
    });
  });
  $("#cwCheck").onclick = ()=>{
    let right = 0, filled = 0;
    inputs.forEach(inp=>{
      const want = cells[inp.dataset.r+","+inp.dataset.c].letter;
      inp.classList.remove("ok","ko");
      if(!inp.value) return;
      filled++;
      if(inp.value.toUpperCase() === want){ inp.classList.add("ok"); right++; }
      else inp.classList.add("ko");
    });
    const total = inputs.length;
    $("#cwMsg").textContent = `${right}/${total} letters correct`;
    if(right === total) {
      $("#cwMsg").textContent = "🏆 Crossword complete!";
      setScore(t.id, 1, 1);
    }
    // mark solved clues
    main.querySelectorAll(".cw-clues li").forEach(li=>{
      const w = t.words.find(x=>x.word===li.dataset.w);
      let solved = true;
      for(let i=0;i<w.word.length;i++){
        const r = w.row + (w.dir==="D"?i:0), c = w.col + (w.dir==="A"?i:0);
        const inp = inputs.find(x=>+x.dataset.r===r && +x.dataset.c===c);
        if(!inp || inp.value.toUpperCase() !== w.word[i]){ solved = false; break; }
      }
      li.classList.toggle("solved", solved);
    });
  };
  $("#cwReveal").onclick = ()=>{
    inputs.forEach(inp=>{
      inp.value = cells[inp.dataset.r+","+inp.dataset.c].letter;
      inp.classList.add("ok");
    });
  };
  $("#cwClear").onclick = ()=>{ inputs.forEach(inp=>{ inp.value=""; inp.classList.remove("ok","ko"); }); $("#cwMsg").textContent=""; };
}

/* ----- clue round ----- */
function renderClues(){
  const t = window.CLUES;
  main.innerHTML = pageHeader(t) + t.intro + `<div id="clueGame"></div>`;
  const box = $("#clueGame");
  const items = shuffle([...t.items]);
  let i = 0, score = 0, cluesUsed = 0;
  function show(){
    if(i >= items.length) return finish();
    const item = items[i];
    let revealed = 1;
    function draw(){
      box.innerHTML = `
        <div class="card">
          <div class="qnum">Mystery ${i+1} of ${items.length} • Score: ${score}</div>
          ${item.clues.map((c,k)=> k < revealed
            ? `<div class="clue-box"><span class="tag">Clue ${k+1}</span>${c}</div>`
            : `<div class="clue-box clue-hidden"><span class="tag">Clue ${k+1}</span>🔒 hidden — reveal only if stuck</div>`).join("")}
          <div class="quiz-actions">
            ${revealed < 3 ? `<button class="btn secondary" id="revealBtn">🔓 Reveal clue ${revealed+1}</button>` : ""}
            <button class="btn" id="answerBtn">💡 Show answer</button>
          </div>
          <div id="answerArea"></div>
        </div>`;
      const rb = $("#revealBtn");
      if(rb) rb.onclick = ()=>{ revealed++; cluesUsed++; draw(); };
      $("#answerBtn").onclick = ()=>{
        $("#answerArea").innerHTML = `
          <div class="explain" style="margin-top:14px"><b>Answer:</b> ${item.answer}<br><span class="small">${item.detail}</span></div>
          <div class="quiz-actions">
            <span class="small">Did your team get it?</span>
            <button class="btn good" id="gotIt">✅ Got it (after ${revealed} clue${revealed>1?"s":""})</button>
            <button class="btn ghost" id="missed">❌ Missed</button>
          </div>`;
        $("#gotIt").onclick = ()=>{ score += (4 - revealed); i++; show(); };
        $("#missed").onclick = ()=>{ i++; show(); };
      };
    }
    draw();
  }
  function finish(){
    const max = items.length * 3;
    setScore(t.id, score, max);
    box.innerHTML = `<div class="center" style="padding:30px 0">
      <div class="score-big">${score} / ${max}</div>
      <p class="lead">Scoring: 3 pts after 1 clue, 2 after 2, 1 after all 3 — exactly how clue rounds reward early answers.</p>
      <button class="btn" id="again">↺ Play again (reshuffled)</button></div>`;
    $("#again").onclick = renderClues;
  }
  show();
}

/* ----- rapid relay ----- */
function renderRapid(){
  const t = window.RAPID;
  main.innerHTML = `<h1>${t.icon} ${t.title}</h1><p class="lead">${t.desc}</p>
  <div class="card">
    <h3>Rules (same as tomorrow)</h3>
    <ul><li><strong>90 seconds</strong> on the clock, max <strong>25 questions</strong>.</li>
    <li>Answer instantly — a wrong answer still moves you forward. <strong>Never freeze; say something.</strong></li>
    <li>Practise saying answers OUT LOUD — that's how the relay works.</li></ul>
    <div class="center mt"><button class="btn" id="startRelay" style="font-size:18px;padding:14px 34px">🚦 START 90-SECOND RELAY</button></div>
  </div>
  <div id="relayArea"></div>`;
  $("#startRelay").onclick = startRelay;

  function startRelay(){
    const area = $("#relayArea");
    const qs = shuffle([...t.pool]).slice(0,25);
    let i = 0, score = 0, attempted = 0, timeLeft = 90, timerId = null;
    $("#startRelay").disabled = true;

    function tick(){
      timeLeft--;
      const tm = $("#relayTimer");
      if(tm){ tm.textContent = timeLeft + "s"; tm.classList.toggle("low", timeLeft<=15); }
      if(timeLeft<=0) finish();
    }
    timerId = setInterval(tick, 1000);

    function show(){
      if(i>=qs.length) return finish();
      const q = qs[i];
      area.innerHTML = `
        <div class="relay-head">
          <div class="timer" id="relayTimer">${timeLeft}s</div>
          <div class="relay-score">Q ${i+1}/25 &nbsp;•&nbsp; <b>${score}</b> correct</div>
        </div>
        <div class="card">
          <div class="question">${q.q}</div>
          <div class="options">${q.opts.map((o,k)=>`<button class="opt" data-k="${k}">${o}</button>`).join("")}</div>
        </div>`;
      area.querySelectorAll(".opt").forEach(btn=>{
        btn.onclick = ()=>{
          attempted++;
          if(+btn.dataset.k === q.ans) score++;
          i++; show();
        };
      });
    }
    function finish(){
      clearInterval(timerId);
      $("#startRelay").disabled = false;
      setScore("rapid", score, 25);
      const rate = attempted ? Math.round(score/attempted*100) : 0;
      area.innerHTML = `<div class="center card" style="padding:34px">
        <div class="score-big">${score} / ${attempted}</div>
        <p class="lead">${attempted} attempted in ${90-Math.max(timeLeft,0)}s • accuracy ${rate}%</p>
        <p>${score>=18?"🏆 Relay legend — you'd smash the real one!":score>=12?"🔥 Strong pace. Push speed a little more.":"💪 Speed comes with reps — run it again!"}</p>
        <button class="btn" id="againRelay">↺ Run it again</button></div>`;
      $("#againRelay").onclick = startRelay;
    }
    show();
  }
}

/* ----- home ----- */
function renderHome(){
  const prog = loadProg();
  const tiles = NAV_PLAN.slice(1).flatMap(g=>g.items);
  const done = Object.keys(prog).length;
  main.innerHTML = `
  <div class="hero">
    <h1>🏆 Inter-House Maths & Science Quiz — Battle Plan</h1>
    <p>Quiz is <strong>TOMORROW</strong>. Every topic below has concepts → tricks → worked examples → a practice quiz. Clear them all, then run the Rapid Relay twice.</p>
    <div class="stat-row">
      <div class="stat"><div class="n">${tiles.length}</div><div class="l">topics</div></div>
      <div class="stat"><div class="n">${done}</div><div class="l">completed</div></div>
      <div class="stat"><div class="n">150+</div><div class="l">practice questions</div></div>
      <div class="stat"><div class="n">90s</div><div class="l">relay simulator</div></div>
    </div>
  </div>
  <div class="card tip">
    <h3>📋 Tonight's study order (recommended)</h3>
    <ol>
      <li><strong>Maths logic sweep (60–75 min):</strong> Number Series → Cube & Dice → Calendar → Direction → Mirror Images. Learn tab, then quiz each. These are pure technique — biggest score gains.</li>
      <li><strong>Movies & Mathematicians (20 min):</strong> flip all flashcards twice, then quiz. Easy marks if you know the scenes.</li>
      <li><strong>Science core (45 min):</strong> Cell Biology → Fibre to Fabric → Laws of Motion. The quizzes tell you exactly what to re-read.</li>
      <li><strong>Current Affairs (20 min):</strong> read notes once, quiz twice. Nobel 2026 + Gaganyaan are near-certain questions.</li>
      <li><strong>Game rounds (20 min):</strong> Clue Round game + Crossword + read the Hands-on bank with your team.</li>
      <li><strong>Finish with 2× Rapid Relay</strong> — decide NOW who your relay player is (fastest recall under pressure).</li>
    </ol>
  </div>
  <h2>Jump in</h2>
  <div class="topic-tiles">
    ${tiles.map(t=>{
      const sc = prog[t.id];
      return `<a class="tile" href="#${t.id}">
        <div class="t-ic">${t.icon}</div>
        <div class="t-name">${t.title}</div>
        <div class="t-desc">${t.desc||""}</div>
        ${sc?`<div class="t-score">✔ best: ${sc.score}/${sc.total}</div>`:""}
      </a>`;
    }).join("")}
  </div>
  <hr class="divider">
  <div class="card">
    <h3>🎯 Day-of-quiz tactics</h3>
    <ul>
      <li><strong>Buzzer discipline:</strong> in clue rounds, early answers earn more — but only buzz when 2 of 3 agree.</li>
      <li><strong>Rough paper:</strong> for direction & calendar questions, ALWAYS draw/write. 10 seconds of drawing beats 60 seconds of imagining.</li>
      <li><strong>Hands-on round:</strong> use the 5-minute script — concept, demo, 3-sentence science, 1 application. Rehearse once before presenting.</li>
      <li><strong>Relay player:</strong> skip-say-next — never spend more than 4 seconds on one question.</li>
      <li><strong>Sleep ≥ 7 hours.</strong> A rested brain beats a crammed one at recall speed. 😴</li>
    </ul>
  </div>`;
}

/* ---------- router ---------- */
function render(){
  const route = (location.hash || "#home").slice(1);
  highlightNav();
  window.scrollTo(0,0);
  if(route === "home" || route === "") return renderHome();
  if(route === "movies") return renderMovies();
  if(route === "crossword") return renderCrossword();
  if(route === "clues") return renderClues();
  if(route === "rapid") return renderRapid();
  const t = findTopic(route);
  if(t) return renderTopic(t);
  renderHome();
}
window.addEventListener("hashchange", render);
buildNav();
render();
})();
