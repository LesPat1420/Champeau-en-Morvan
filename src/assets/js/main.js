(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  var burger = document.querySelector("[data-menu-toggle]");
  var menu = document.getElementById("menu-principal");

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("est-ouvert");
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      document.body.style.overflow = ouvert && window.innerWidth <= 980 ? "hidden" : "";
    });

    menu.querySelectorAll(".menu__deplier").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sous = btn.parentElement.querySelector(".menu__sous-liste");
        if (!sous) return;
        var ouvert = sous.classList.toggle("est-ouvert");
        btn.setAttribute("aria-expanded", ouvert ? "true" : "false");
        btn.textContent = ouvert ? "–" : "+";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("est-ouvert")) {
        menu.classList.remove("est-ouvert");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        burger.focus();
      }
    });
  }

  /* ---- Alerte : mémoriser la fermeture ---- */
  var alerte = document.getElementById("alerte-info");
  if (alerte) {
    var cle = "alerte-fermee:" + alerte.textContent.trim().slice(0, 60);
    try {
      if (sessionStorage.getItem(cle) === "1") alerte.hidden = true;
    } catch (e) {}
    var fermer = alerte.querySelector("[data-fermer-alerte]");
    if (fermer) {
      fermer.addEventListener("click", function () {
        alerte.hidden = true;
        try { sessionStorage.setItem(cle, "1"); } catch (e) {}
      });
    }
  }

  /* ---- Diaporama du héros ---- */
  var diapos = document.querySelectorAll(".hero__diapo");
  if (diapos.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var i = 0;
    setInterval(function () {
      diapos[i].classList.remove("est-active");
      i = (i + 1) % diapos.length;
      diapos[i].classList.add("est-active");
    }, 6000);
  }
})();
