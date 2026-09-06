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

  /* ---- Déchèterie : saison en cours + ouvert/fermé ---- */
  var dechEl = document.getElementById("dechetterie-data");
  if (dechEl) {
    try {
      var dech = JSON.parse(dechEl.textContent);
      var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      var now = new Date();
      var mmdd = String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");

      var saisonActive = dech.saisons.find(function (s) {
        return s.debut <= s.fin
          ? mmdd >= s.debut && mmdd <= s.fin
          : mmdd >= s.debut || mmdd <= s.fin;
      }) || dech.saisons[0];

      document.querySelectorAll(".dechetterie__saison").forEach(function (bloc) {
        var actif = bloc.getAttribute("data-saison") === saisonActive.id;
        bloc.classList.toggle("est-active", actif);
        var h3 = bloc.querySelector("h3");
        if (actif && h3) h3.insertAdjacentHTML("beforeend", ' <span class="dechetterie__badge">période actuelle</span>');
      });

      var minutesNow = now.getHours() * 60 + now.getMinutes();
      var toMin = function (hhmm) { var t = hhmm.split(":"); return (+t[0]) * 60 + (+t[1]); };
      var plagesJour = saisonActive.jours[jours[now.getDay()]] || [];
      var ouvert = plagesJour.some(function (p) { return minutesNow >= toMin(p[0]) && minutesNow < toMin(p[1]); });

      var prochaine = null;
      for (var d = 0; d < 8 && !prochaine; d++) {
        var jour = jours[(now.getDay() + d) % 7];
        var plages = saisonActive.jours[jour] || [];
        for (var k = 0; k < plages.length; k++) {
          if (d === 0 && minutesNow >= toMin(plages[k][0])) continue;
          prochaine = (d === 0 ? "aujourd'hui" : d === 1 ? "demain" : jour.toLowerCase()) + " à " + plages[k][0].replace(":", " h ").replace(/ 00$/, "");
          break;
        }
      }

      var statut = document.querySelector("[data-dechetterie-statut]");
      if (statut) {
        statut.hidden = false;
        statut.classList.add(ouvert ? "est-ouvert" : "est-ferme");
        statut.textContent = ouvert
          ? "Ouvert en ce moment"
          : "Fermé actuellement" + (prochaine ? " — réouverture " + prochaine : "");
      }
    } catch (e) {}
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
