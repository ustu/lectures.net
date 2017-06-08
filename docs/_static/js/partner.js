// Yandex.RTB R-A-231467-1
var div = document.getElementById('yandex-partner');
div.innerHTML = '<div id="yandex_rtb_R-A-231467-1"></div>';

(function(w, d, n, s, t) {
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
  s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//an.yandex.ru/system/context.js";
  s.async = true;
  t.parentNode.insertBefore(s, t);
})(this, this.document, "yandexContextAsyncCallbacks");
