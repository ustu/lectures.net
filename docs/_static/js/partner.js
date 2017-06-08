// Yandex.RTB R-A-231467-1
var div = document.getElementById('yandex-partner');
div.innerHTML = '<div id="yandex_rtb_R-A-231467-1"></div>';

(function(w, d, n, s, t) {
  console.log(w, d)
  w[n] = w[n] || [];
  w[n].push(function() {
    Ya.Context.AdvManager.render({
      blockId: "R-A-231467-1",
      renderTo: "yandex_rtb_R-A-231467-1",
      horizontalAlign: false,
      async: true
    });
  });
  t = d.getElementsByTagName("script")[0];
  s = d.createElement("script");
  s.type = "text/javascript";
  s.src = "//an.yandex.ru/system/context.js";
  s.async = true;
  t.parentNode.insertBefore(s, t);
})(window, document, "yandexContextAsyncCallbacks");
