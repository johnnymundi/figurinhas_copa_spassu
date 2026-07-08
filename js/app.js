/* ============================================================
   ÁLBUM DE FIGURINHAS — Copa Spassu 2026 (livro de páginas)
   ============================================================ */
(function () {
  "use strict";

  const STORAGE_KEY = "figurinhas_copa_spassu_v3";
  const byN = {};
  STICKERS.forEach((s) => (byN[s.n] = s));

  // mapa: número da figurinha -> índice da página onde ela se cola
  const stickerPage = {};
  PAGES.forEach((p, i) => {
    if (p.slots) p.slots.forEach((sl) => { if (sl.n != null) stickerPage[sl.n] = i; });
  });
  const TOTAL_GLUABLE = Object.keys(stickerPage).length;

  /* ---------- helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  const todayStr = () => new Date().toISOString().slice(0, 10);

  /* ---------- estado ---------- */
  function defaultState() {
    return { glued: {}, tray: [], repeats: {}, day: todayStr(), packsLeft: CONFIG.packsPerDay, uid: 1, autoBackup: null, openedCount: 0 };
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!s) return defaultState();
      if (s.day !== todayStr()) { s.day = todayStr(); s.packsLeft = CONFIG.packsPerDay; }
      return Object.assign(defaultState(), s);
    } catch (e) { return defaultState(); }
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }
  let state = load();

  const isGlued = (n) => !!state.glued[n];
  const inTray = (n) => state.tray.some((t) => t.n === n);

  let currentPage = 0;
  let previewMode = false;

  /* ==========================================================
     SORTEIO
     ========================================================== */
  function drawOne() {
    const pool = [];
    STICKERS.forEach((s) => { const w = RARITY_WEIGHT[s.rarity] || 1; for (let i = 0; i < w; i++) pool.push(s.n); });
    return pool[Math.floor(Math.random() * pool.length)];
  }
  function openPackDraw() {
    const res = [];
    for (let i = 0; i < CONFIG.stickersPerPack; i++) {
      const n = drawOne();
      const dup = res.some((r) => r.n === n && r.isNew);
      res.push({ n, isNew: !isGlued(n) && !inTray(n) && !dup });
    }
    return res;
  }
  function commitPack(cards) {
    cards.forEach((c) => {
      if (c.isNew) state.tray.push({ n: c.n, uid: state.uid++ });
      else state.repeats[c.n] = (state.repeats[c.n] || 0) + 1;
    });
    save();
  }

  /* ==========================================================
     COLAR
     ========================================================== */
  function glueSticker(uid, n) {
    const i = state.tray.findIndex((t) => t.uid === uid);
    if (i < 0) return;
    state.tray.splice(i, 1);
    state.glued[n] = true;
    save();
    renderPage();
    const slotEl = document.querySelector('.aslot.filled[data-n="' + n + '"]');
    if (slotEl) slotEl.classList.add("just-glued");
  }
  function glueAllCurrent() {
    state.tray.filter((t) => stickerPage[t.n] === currentPage).forEach((t) => (state.glued[t.n] = true));
    state.tray = state.tray.filter((t) => stickerPage[t.n] !== currentPage);
    save();
    renderPage();
  }

  // Completar álbum automaticamente (toggle): cola TODAS; ao desfazer, volta ao estado anterior
  function toggleAutoComplete() {
    if (!state.autoBackup) {
      // exige senha para liberar o "completar automaticamente"
      const pwd = prompt("Digite a senha para completar o álbum automaticamente:");
      if (pwd === null) return; // cancelou
      if (pwd.trim().toLowerCase() !== "farofinha") { alert("Senha incorreta!"); return; }
      // guarda o que estava colado/na bandeja e cola tudo
      state.autoBackup = { glued: Object.assign({}, state.glued), tray: state.tray.slice() };
      Object.keys(stickerPage).forEach((n) => { state.glued[n] = true; });
      state.tray = [];
    } else {
      // desfaz: restaura exatamente o estado anterior
      state.glued = state.autoBackup.glued;
      state.tray = state.autoBackup.tray;
      state.autoBackup = null;
    }
    save();
    renderPage();
  }
  function updateAutoBtn() {
    const b = document.querySelector("#btn-auto-complete");
    const on = !!state.autoBackup;
    b.textContent = on ? "↩️ Desfazer (voltar ao anterior)" : "🪄 Completar álbum automaticamente";
    b.classList.toggle("active", on);
  }

  /* ==========================================================
     RENDER: PÁGINA ATUAL DO LIVRO
     ========================================================== */
  function renderPage() {
    const p = PAGES[currentPage];
    const pageEl = $("#album-page");
    const img = $("#album-page-img");
    img.src = p.img;
    pageEl.querySelectorAll(".aslot").forEach((e) => e.remove());

    $("#page-indicator").textContent = `Página ${currentPage + 1}/${PAGES.length} — ${p.title}`;
    $("#page-prev").disabled = currentPage === 0;
    $("#page-next").disabled = currentPage === PAGES.length - 1;

    const isCover = p.type === "cover";
    pageEl.classList.toggle("is-cover", isCover);
    $("#cover-hint").style.display = isCover ? "" : "none";
    $("#album-tray").style.display = isCover ? "none" : "";
    $("#progress-wrap").style.display = isCover ? "none" : "";
    $("#btn-toggle-complete").style.display = isCover ? "none" : "";
    $("#btn-auto-complete").style.display = isCover ? "none" : "";
    updateAutoBtn();
    if (isCover) return;

    p.slots.forEach((sl) => {
      const d = el("div", "aslot");
      d.style.left = sl.x + "%"; d.style.top = sl.y + "%";
      d.style.width = sl.w + "%"; d.style.height = sl.h + "%";

      if (sl.n == null) { // vaga reservada (futuras especiais)
        d.classList.add("empty", "reserved");
        d.appendChild(el("div", "aslot-num", "?"));
        pageEl.appendChild(d); return;
      }
      d.dataset.n = sl.n;
      const s = byN[sl.n];
      if (isGlued(sl.n)) {
        d.classList.add("filled", "rarity-" + s.rarity);
        const im = el("img", "aslot-img"); im.src = s.img; d.appendChild(im);
        d.title = "Ver " + s.name + " em tela cheia";
        d.addEventListener("click", () => openViewer(s));
      } else if (previewMode) {
        d.classList.add("preview");
        const im = el("img", "aslot-img"); im.src = s.img; d.appendChild(im);
        d.appendChild(el("div", "aslot-miss", "✗ FALTA"));
      } else {
        d.classList.add("empty");
        d.appendChild(el("div", "aslot-num", "Nº " + sl.n));
      }
      pageEl.appendChild(d);
    });

    renderTray();
    updateProgress();
  }

  function updateProgress() {
    const have = Object.keys(state.glued).filter((n) => state.glued[n]).length;
    $("#progress-label").textContent = `Coladas: ${have}/${TOTAL_GLUABLE}`;
    $("#progress-fill").style.width = (have / TOTAL_GLUABLE) * 100 + "%";
  }

  /* ==========================================================
     RENDER: PORTA-FIGURINHAS (só as da página atual)
     ========================================================== */
  function renderTray() {
    const list = $("#tray-list");
    list.innerHTML = "";
    const here = state.tray.filter((t) => stickerPage[t.n] === currentPage);
    $("#btn-cola-todas").style.display = here.length ? "" : "none";

    if (!here.length) {
      list.appendChild(el("div", "tray-empty", "Nada para colar aqui. Abra envelopes! ✉️"));
    } else {
      here.forEach((item) => {
        const s = byN[item.n];
        const c = el("div", "tray-card rarity-" + s.rarity);
        c.dataset.n = item.n;
        c.appendChild(el("div", "star-badge", "★"));
        const im = el("img", "tray-img"); im.src = s.img; c.appendChild(im);
        c.appendChild(el("div", "tray-label", s.name + " · Nº" + s.n));
        c.addEventListener("pointerdown", (e) => startTrayDrag(e, item));
        list.appendChild(c);
      });
    }
    const others = state.tray.length - here.length;
    $("#tray-other").textContent = others ? `+ ${others} figurinha(s) para colar em outras páginas` : "";
  }

  /* ==========================================================
     RENDER: ENVELOPES
     ========================================================== */
  function renderPacks() {
    $("#packs-left").textContent = state.packsLeft;
    $("#packs-max").textContent = CONFIG.packsPerDay;
    $("#packs-badge").textContent = state.packsLeft > 0 ? state.packsLeft : "";
    const shelf = $("#packs-shelf");
    shelf.innerHTML = "";
    if (state.packsLeft <= 0) {
      shelf.appendChild(el("div", "empty-msg", "Você já abriu seus " + CONFIG.packsPerDay + " envelopes hoje. Volte amanhã! 🌙"));
      return;
    }
    for (let i = 0; i < state.packsLeft; i++) {
      const b = el("button", "pack");
      const im = el("img", "pack-img"); im.src = CONFIG.envelopeImg; b.appendChild(im);
      b.appendChild(el("div", "pack-cta", "Abrir envelope"));
      b.addEventListener("click", startOpen);
      shelf.appendChild(b);
    }
  }

  /* ==========================================================
     NAVEGAÇÃO DO LIVRO
     ========================================================== */
  function goPage(i) { if (i < 0 || i >= PAGES.length) return; currentPage = i; previewMode = false; $("#btn-toggle-complete").textContent = "👁️ Ver completo"; renderPage(); }
  $("#page-prev").addEventListener("click", () => goPage(currentPage - 1));
  $("#page-next").addEventListener("click", () => goPage(currentPage + 1));
  $("#album-page").addEventListener("click", () => { if (PAGES[currentPage].type === "cover") goPage(currentPage + 1); });
  document.addEventListener("keydown", (e) => {
    if (!$("#tab-album").classList.contains("active")) return;
    if (e.key === "ArrowRight") goPage(currentPage + 1);
    if (e.key === "ArrowLeft") goPage(currentPage - 1);
  });

  /* ==========================================================
     DRAG-AND-DROP
     ========================================================== */
  let drag = null;
  const correctEmptySlot = (n) => document.querySelector('.aslot.empty[data-n="' + n + '"]');

  function startTrayDrag(e, item) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (previewMode) return;
    e.preventDefault();
    const s = byN[item.n];
    const ghost = el("div", "drag-ghost");
    const im = el("img"); im.src = s.img; ghost.appendChild(im);
    document.body.appendChild(ghost);
    drag = { item, ghost, n: item.n };
    moveGhost(e);
    const target = correctEmptySlot(item.n);
    if (target) target.classList.add("target");
    document.addEventListener("pointermove", onDragMove);
    document.addEventListener("pointerup", onDragUp);
  }
  const moveGhost = (e) => { drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px"; };
  function onDragMove(e) {
    if (!drag) return;
    e.preventDefault();
    moveGhost(e);
    const target = correctEmptySlot(drag.n);
    if (target) target.classList.toggle("over", pointerInside(e, target));
  }
  function onDragUp(e) {
    if (!drag) return;
    const target = correctEmptySlot(drag.n);
    let placed = false;
    if (target && pointerInside(e, target)) { glueSticker(drag.item.uid, drag.n); placed = true; }
    if (drag.ghost.parentNode) document.body.removeChild(drag.ghost);
    document.querySelectorAll(".aslot.target, .aslot.over").forEach((a) => a.classList.remove("target", "over"));
    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragUp);
    drag = null;
  }
  function pointerInside(e, node) {
    const r = node.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }

  /* ==========================================================
     VISUALIZADOR
     ========================================================== */
  const viewerOverlay = $("#viewer-overlay");
  function openViewer(s) {
    $("#viewer-img").src = s.img;
    $("#viewer-name").textContent = s.name;
    $("#viewer-meta").textContent = "Nº " + s.n + " · " + s.club;
    const r = $("#viewer-rarity");
    r.textContent = RARITY_LABEL[s.rarity] || s.rarity;
    r.className = "viewer-rarity rarity-" + s.rarity;
    viewerOverlay.classList.add("active");
  }
  $("#viewer-close").addEventListener("click", () => viewerOverlay.classList.remove("active"));
  viewerOverlay.addEventListener("click", (e) => { if (e.target === viewerOverlay) viewerOverlay.classList.remove("active"); });

  /* ==========================================================
     ABAS
     ========================================================== */
  function switchTab(name) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.querySelectorAll(".tabpanel").forEach((p) => p.classList.toggle("active", p.id === "tab-" + name));
  }
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => switchTab(t.dataset.tab)));

  /* ==========================================================
     TOOLBAR
     ========================================================== */
  $("#btn-toggle-complete").addEventListener("click", (e) => {
    previewMode = !previewMode;
    e.target.textContent = previewMode ? "🙈 Ocultar" : "👁️ Ver completo";
    renderPage();
  });
  $("#btn-cola-todas").addEventListener("click", glueAllCurrent);
  $("#btn-auto-complete").addEventListener("click", toggleAutoComplete);

  /* ==========================================================
     ABERTURA DO ENVELOPE
     ========================================================== */
  const openOverlay = $("#open-overlay");
  const revealOverlay = $("#reveal-overlay");
  const envelope = $("#envelope");
  const tearStrip = $("#tear-strip");
  const ripFill = $("#rip-fill");
  let rip = 0, dragging = false, lastX = 0, pendingCards = null, opening = false;

  function updateRip() { envelope.style.setProperty("--rip", rip); ripFill.style.width = rip * 100 + "%"; }
  function startOpen() {
    if (state.packsLeft <= 0) return;
    rip = 0; opening = false; dragging = false;
    envelope.classList.remove("opening"); updateRip();
    openOverlay.classList.add("active");
  }
  tearStrip.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragging = true; lastX = e.clientX; e.preventDefault();
  });
  document.addEventListener("pointermove", (e) => {
    if (!dragging || opening) return;
    const w = envelope.getBoundingClientRect().width || 300;
    rip += Math.abs(e.clientX - lastX) / w; lastX = e.clientX;
    if (rip > 1) rip = 1;
    updateRip();
    if (rip >= 1) { dragging = false; finishOpen(); }
  });
  document.addEventListener("pointerup", () => { dragging = false; });
  function finishOpen() {
    if (opening) return;
    opening = true;
    envelope.classList.add("opening");
    state.packsLeft--;
    state.openedCount = (state.openedCount || 0) + 1;
    save();
    pendingCards = openPackDraw();
    setTimeout(() => { openOverlay.classList.remove("active"); renderPacks(); showReveal(pendingCards); }, 700);
  }
  $("#btn-cancel-open").addEventListener("click", () => openOverlay.classList.remove("active"));

  // resetar envelopes do dia (mais envelopes)
  $("#btn-reset-packs").addEventListener("click", () => {
    state.packsLeft = CONFIG.packsPerDay;
    save();
    renderPacks();
  });

  /* ==========================================================
     REVELAÇÃO
     ========================================================== */
  function showReveal(cards) {
    const wrap = $("#reveal-cards");
    wrap.innerHTML = "";
    cards.forEach((c, i) => {
      const s = byN[c.n];
      const card = el("div", "reveal-card rarity-" + s.rarity);
      card.style.animationDelay = i * 0.15 + "s";
      if (c.isNew) card.appendChild(el("div", "star-badge", "★ NOVA"));
      else card.appendChild(el("div", "rep-badge", "repetida"));
      const im = el("img", "card-img"); im.src = s.img; card.appendChild(im);
      wrap.appendChild(card);
    });
    revealOverlay.classList.add("active");
    $("#btn-reveal-done").onclick = () => {
      const news = cards.filter((c) => c.isNew);
      commitPack(cards);
      revealOverlay.classList.remove("active");
      // se ainda há envelopes, continua na aba Envelopes para abrir mais;
      // quando acabarem, vai pro álbum na página da 1ª figurinha nova.
      if (state.packsLeft <= 0 && news.length && stickerPage[news[0].n] != null) {
        currentPage = stickerPage[news[0].n];
      }
      renderPage();
      renderPacks();
      switchTab(state.packsLeft > 0 ? "envelopes" : "album");
      // a cada 3 envelopes abertos: pausa para apreciar os gestores
      if (state.openedCount && state.openedCount % 3 === 0) showPausa();
    };
  }

  /* ==========================================================
     PAUSA (a cada 3 envelopes) — gestores + contagem 5s que vira X
     ========================================================== */
  const pausaOverlay = $("#pausa-overlay");
  const pausaTimer = $("#pausa-timer");
  let pausaInterval = null;
  function showPausa() {
    let left = 5;
    clearInterval(pausaInterval);
    pausaTimer.classList.remove("ready");
    pausaTimer.onclick = null;
    pausaTimer.textContent = left;
    pausaOverlay.classList.add("active");
    pausaInterval = setInterval(() => {
      left--;
      if (left > 0) {
        pausaTimer.textContent = left; // contagem regressiva
      } else {
        clearInterval(pausaInterval);
        pausaTimer.textContent = "✕";        // vira botão de fechar
        pausaTimer.classList.add("ready");
        pausaTimer.onclick = () => pausaOverlay.classList.remove("active");
      }
    }, 1000);
  }

  /* ---------- INIT ---------- */
  renderPage();
  renderPacks();
})();
