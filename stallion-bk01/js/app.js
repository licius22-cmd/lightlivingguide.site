/* ============================================================================
   app.js — Page behaviors (JellyRock back-redirect advertorial)
     1. Carry URL query params into on-page links
     2. Back-button redirect (core behavior)
     3. Countdown timer (10 min, session-persistent)
     4. Social-proof purchase popup
========================================================================== */

/* -- 1. Carry the current query string into every internal link ------------ */
(function () {
  function skippable(a) {
    var h = a.getAttribute("href") || "";
    return !h || h.startsWith("#") || /^javascript:/i.test(h);
  }
  function apply(root) {
    var search = window.location.search;
    if (!search) return;
    (root || document).querySelectorAll("a").forEach(function (a) {
      if (skippable(a)) return;
      var raw = a.getAttribute("href"), url;
      try { url = new URL(raw, location.origin); } catch (e) { return; }
      var out = new URLSearchParams(url.search);
      new URLSearchParams(search).forEach(function (v, k) { if (!out.has(k)) out.set(k, v); });
      url.search = out.toString();
      if (raw.startsWith("//")) a.setAttribute("href", "//" + url.host + url.pathname + url.search + url.hash);
      else if (/^[a-zA-Z][\w+.-]*:/.test(raw)) a.setAttribute("href", url.toString());
      else a.setAttribute("href", url.pathname + url.search + url.hash);
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    apply();
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === "A") apply(n.parentNode || document);
          else if (n.querySelectorAll) apply(n);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  });
})();

/* -- 2. Back-button redirect ----------------------------------------------- */
(function () {
  var base = "https://rt.lightlivingguide.site/6ab58005c1d182af34b1075d?sub1={{ad.id}}&sub2={{adset.id}}&sub3={{campaign.id}}&sub4={{ad.name}}&sub5={{adset.name}}&sub6={{campaign.name}}&sub7={{placement}}&sub8={{site_source_name}}&utm_source=facebook&utm_medium=paid&sub12=backredirect2";
  var target = base + (base.includes("?") ? "&" : "?") + window.location.search.replace("?", "");
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", function () {
    setTimeout(function () { location.href = target; }, 150);
  });
})();

/* -- 3. Countdown timer (10 min, session-persistent) ----------------------- */
(function () {
  var KEY = "vb_countdown_end", DURATION = 10 * 60 * 1000;
  var end = sessionStorage.getItem(KEY);
  if (!end) { end = Date.now() + DURATION; sessionStorage.setItem(KEY, end); }
  end = parseInt(end);
  var el = document.getElementById("countdown");
  function tick() {
    var left = end - Date.now();
    if (left <= 0) { if (el) el.textContent = "00:00"; return; }
    var m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
    if (el) el.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
})();

/* -- 4. Social-proof purchase popup ---------------------------------------- */
(function () {
  var INTERVAL_BETWEEN = 10, VISIBLE_TIME = 6;
  var IMAGES = {
    2: "images/2-frascos.webp",
    3: "images/3-frascos.webp",
    6: "images/6-frascos.webp"
  };
  var PEOPLE = ["Benjamin","Michael","James","William","Daniel","Christopher","David","Henry","John","Robert","Thomas","Joseph","Matthew","Anthony","Mark","Richard","Charles","Paul","Steven","Andrew"];
  var CITIES = ["St. Louis, MO","Austin, TX","Denver, CO","Tampa, FL","Columbus, OH","Portland, OR","Tulsa, OK","Phoenix, AZ","Dallas, TX","Miami, FL"];
  var QTYS = [2, 3, 6];
  var pop = document.getElementById("ndPop");
  if (!pop) return;
  var imgEl = document.getElementById("ndPopImg"),
      nameEl = document.getElementById("ndPopName"),
      titleEl = document.getElementById("ndPopTitle"),
      timeEl = document.getElementById("ndPopTime");
  function rand(a) { return a[Math.floor(Math.random() * a.length)]; }
  function show() {
    var qty = rand(QTYS);
    nameEl.textContent = rand(PEOPLE) + " from " + rand(CITIES);
    titleEl.textContent = "Just Bought " + qty + " Bottles";
    timeEl.textContent = Math.floor(Math.random() * 58 + 2) + " min ago";
    imgEl.src = IMAGES[qty];
    pop.classList.remove("hide");
    pop.classList.add("show");
    setTimeout(function () {
      pop.classList.add("hide");
      setTimeout(function () { pop.classList.remove("show"); }, 400);
    }, VISIBLE_TIME * 1000);
  }
  window.ndClosePop = function () {
    pop.classList.add("hide");
    setTimeout(function () { pop.classList.remove("show"); }, 400);
  };
  setTimeout(show, 3000);
  setInterval(show, (VISIBLE_TIME + INTERVAL_BETWEEN) * 1000);
})();
