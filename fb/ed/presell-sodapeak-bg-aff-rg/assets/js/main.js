// Contagem regressiva (30s), mantida em cookie para sobreviver a recarregamentos
(function () {
  var el = document.getElementById("timer");
  var m = document.cookie.match(/(?:^|; )timer=(\d+)/);
  var t = (m && +m[1]) || 30;
  function show() {
    el.textContent = "This presentation will start in " +
      String((t / 60) | 0).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  }
  show();
  var id = setInterval(function () {
    if (t > 0) t--;
    show();
    document.cookie = "timer=" + t + ";max-age=60;path=/";
    if (!t) clearInterval(id);
  }, 1000);
})();

// Repassa os parâmetros da URL do anúncio (utm, clickid etc.) para os links de saída
if (location.search) {
  var q = new URLSearchParams(location.search);
  document.querySelectorAll("a[href]").forEach(function (a) {
    var u = new URL(a.href);
    q.forEach(function (v, k) { if (!u.searchParams.has(k)) u.searchParams.append(k, v); });
    a.href = u;
  });
}
