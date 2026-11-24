/* ==========================================================================
   OASYS RP — Script principal
   Les textes, liens et statuts se modifient dans config/config.js
   ========================================================================== */
(function () {
  "use strict";

  var C = window.OASYS || {};
  var L = C.liens || {};
  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------------------------------------------------------------- Outils */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    try {
      var x = new URL(u, location.href);
      return /^(https?|fivem):$/.test(x.protocol) ? x.href : "#";
    } catch (e) { return "#"; }
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  }
  function isFree(item) { return norm(item.statut).indexOf("dispo") === 0; }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function prettyUrl(u) { return String(u || "").replace(/^https?:\/\//, "").replace(/\/$/, ""); }

  /* ---------------------------------------------------------------- Icônes */
  var I = {
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3l-.6 1.3a18.2 18.2 0 0 0-5.6 0L8.6 3a19.5 19.5 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.8 19.8 0 0 0 6 3l1.3-2.1a12.8 12.8 0 0 1-2-1l.5-.4a14 14 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.7 19.7 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.3c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.5 8 10.5s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.3a2.9 2.9 0 1 1-2-2.8V9.1a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.8Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 4.5v15l12-7.5-12-7.5Z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>'
  };
  window.OASYS_ICONS = I;

  /* ---------------------------------------------------------------- Header */
  var page = document.body.getAttribute("data-page") || "";
  var NAV = [
    ["accueil", "Accueil", "index.html"],
    ["serveur", "Le serveur", "serveur.html"],
    ["reglement", "Règlement", "reglement.html"],
    ["entreprises", "Entreprises", "entreprises.html"],
    ["cites", "Cités", "cites.html"],
    ["boutique", "Boutique", "boutique.html"]
  ];

  var header = $("[data-header]");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="Accueil OASYS RP"><img src="assets/img/logo.webp" alt="" width="40" height="40"><span>OASYS <b>RP</b></span></a>' +
      '<button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Navigation principale">' +
      NAV.map(function (n) {
        var active = n[0] === page;
        return '<a class="nav__link' + (active ? " is-active" : "") + '" href="' + n[2] + '"' + (active ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
      }).join("") +
      '<a class="btn btn--sky btn--sm" href="' + esc(safeUrl(L.discord)) + '" target="_blank" rel="noopener">' + I.discord + "Discord</a>" +
      "</nav></div>";

    var burger = $(".burger", header);
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    $$(".nav a", header).forEach(function (a, i) {
      a.style.transitionDelay = (0.05 + i * 0.05) + "s";
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") document.body.classList.remove("menu-open");
    });

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------- Footer */
  var footer = $("[data-footer]");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><a class="brand" href="index.html"><img src="assets/img/logo.webp" alt="" width="40" height="40"><span>OASYS <b>RP</b></span></a>' +
      "<p>" + esc(C.description) + "</p></div>" +
      '<div class="footer-col"><h4>Navigation</h4>' + NAV.map(function (n) { return '<a href="' + n[2] + '">' + n[1] + "</a>"; }).join("") + "</div>" +
      '<div class="footer-col"><h4>Communauté</h4>' +
      '<a href="' + esc(safeUrl(L.discord)) + '" target="_blank" rel="noopener">Discord</a>' +
      '<a href="' + esc(safeUrl(L.tiktok)) + '" target="_blank" rel="noopener">TikTok</a>' +
      '<a href="rejoindre.html">Nous rejoindre</a></div>' +
      '<div class="footer-col"><h4>Jouer</h4>' +
      '<a href="' + esc(safeUrl(L.fivem)) + '" target="_blank" rel="noopener">Se connecter sur FiveM</a>' +
      '<a href="' + esc(safeUrl(L.tebex)) + '" target="_blank" rel="noopener">Boutique Tebex</a>' +
      '<a href="https://fivem.net" target="_blank" rel="noopener">Télécharger FiveM</a></div>' +
      "</div>" +
      '<div class="footer-word" aria-hidden="true">OASYS RP</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(C.nom || "OASYS RP") + ". Tous droits réservés.</span>" +
      "<span>Serveur non affilié à Rockstar Games ni à Take-Two Interactive.</span></div>" +
      "</div>";
  }

  /* ---------------------------------------------------------------- Liens génériques
     data-link="discord|tiktok|fivem|tebex|..." → href depuis la config
     data-text="fivem"                          → affiche l'URL lisible       */
  $$("[data-link]").forEach(function (a) {
    var u = L[a.getAttribute("data-link")];
    if (u) { a.href = safeUrl(u); a.target = "_blank"; a.rel = "noopener"; }
  });
  $$("[data-text]").forEach(function (el) {
    var k = el.getAttribute("data-text");
    el.textContent = k === "slogan" || k === "description" || k === "nom" ? (C[k] || "") : prettyUrl(L[k]);
  });
  $$("[data-icon]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", I[el.getAttribute("data-icon")] || ""); });

  /* ---------------------------------------------------------------- Compteurs */
  var ents = C.entreprises || [];
  var cites = C.cites || [];
  var counts = {
    "entreprises": ents.length,
    "cites": cites.length,
    "entreprises-libres": ents.filter(isFree).length,
    "cites-libres": cites.filter(isFree).length
  };
  $$("[data-count]").forEach(function (el) {
    var v = counts[el.getAttribute("data-count")];
    el.textContent = v == null ? "" : pad(v);
  });

  var statsBox = $("[data-stats]");
  if (statsBox && C.stats) {
    statsBox.innerHTML = C.stats.map(function (s) {
      var v = String(s.valeur);
      if (v.indexOf("auto:") === 0) v = pad(counts[v.slice(5)] || 0);
      return '<div class="stat"><b>' + esc(v) + "</b><span>" + esc(s.label) + "</span></div>";
    }).join("");
  }

  $$("[data-free-names]").forEach(function (el) {
    var list = el.getAttribute("data-free-names") === "cites" ? cites : ents;
    var free = list.filter(isFree);
    el.innerHTML = free.length
      ? free.map(function (x) { return "<span>" + esc(x.nom) + "</span>"; }).join("")
      : "<span>Aucune pour le moment</span>";
  });

  /* ---------------------------------------------------------------- Listes de statuts */
  function renderRoster(box) {
    var type = box.getAttribute("data-roster");
    var list = type === "cites" ? cites : ents;
    var fallback = type === "cites" ? L.demandeCite : L.candidatureEntreprise;
    var actionLabel = type === "cites" ? "Faire une demande" : "Postuler";

    // Disponibles en premier, ordre de la config conservé ensuite
    var sorted = list.map(function (x, i) { return { x: x, i: i }; }).sort(function (a, b) {
      return (isFree(b.x) - isFree(a.x)) || (a.i - b.i);
    });

    if (!list.length) {
      box.innerHTML = '<p class="note-line">' + I.info + "Aucune donnée : vérifie le fichier config/config.js (une virgule ou un guillemet manque peut-être).</p>";
      return;
    }
    var ul = document.createElement("ul");
    ul.className = "roster" + (type === "cites" ? " roster--big" : "");
    ul.innerHTML = sorted.map(function (o, k) {
      var x = o.x, free = isFree(x);
      var cat = x.categorie ? '<span class="row__cat">' + esc(x.categorie) + "</span>" : "";
      var desc = x.description ? esc(x.description) : "";
      var action = free
        ? '<a class="btn btn--sky btn--sm" href="' + esc(safeUrl(x.lien || fallback)) + '" target="_blank" rel="noopener">' + actionLabel + I.arrow + "</a>"
        : "";
      return '<li class="row ' + (free ? "is-free" : "is-taken") + '" data-state="' + (free ? "libre" : "prise") + '" data-reveal style="--d:' + Math.min(k * 0.06, 0.5) + 's">' +
        '<span class="row__num">' + pad(k + 1) + "</span>" +
        '<div class="row__main">' + cat + '<h3 class="row__name">' + esc(x.nom) + "</h3></div>" +
        '<p class="row__desc">' + desc + "</p>" +
        '<div class="row__status"><span class="status ' + (free ? "status--on" : "status--off") + '"><i></i>' + (free ? "Disponible" : "Occupée") + "</span></div>" +
        '<div class="row__action">' + action + "</div>" +
        "</li>";
    }).join("");

    var nFree = list.filter(isFree).length;
    var bar = document.createElement("div");
    bar.className = "roster-bar";
    bar.innerHTML =
      '<div class="tabs" role="tablist">' +
      '<button class="tab is-active" role="tab" aria-selected="true" data-filter="all">Toutes<sup>' + pad(list.length) + "</sup></button>" +
      '<button class="tab" role="tab" aria-selected="false" data-filter="libre">Disponibles<sup>' + pad(nFree) + "</sup></button>" +
      '<button class="tab" role="tab" aria-selected="false" data-filter="prise">Occupées<sup>' + pad(list.length - nFree) + "</sup></button>" +
      "</div>" +
      '<div class="roster-legend"><span class="status status--on"><i></i>Disponible</span><span class="status status--off"><i></i>Occupée</span></div>';

    box.innerHTML = "";
    box.appendChild(bar);
    box.appendChild(ul);

    $$(".tab", bar).forEach(function (t) {
      t.addEventListener("click", function () {
        $$(".tab", bar).forEach(function (o) { o.classList.remove("is-active"); o.setAttribute("aria-selected", "false"); });
        t.classList.add("is-active"); t.setAttribute("aria-selected", "true");
        var f = t.getAttribute("data-filter");
        $$(".row", ul).forEach(function (r) {
          r.classList.toggle("is-hidden", f !== "all" && r.getAttribute("data-state") !== f);
        });
      });
    });
  }
  $$("[data-roster]").forEach(renderRoster);

  /* ---------------------------------------------------------------- Règlement */
  var rulesBox = $("[data-rules]");
  if (rulesBox) {
    var R = window.OASYS_REGLEMENT || { texte: "" };
    var inline = function (s) {
      return esc(s)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
    };
    var html = [], toc = [], para = [], list = [], sec = 0, sub = 0;
    var flushP = function () { if (para.length) { html.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };
    var flushL = function () { if (list.length) { html.push("<ul>" + list.map(function (l) { return "<li>" + inline(l) + "</li>"; }).join("") + "</ul>"); list = []; } };

    String(R.texte || "").split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flushP(); flushL(); return; }
      var m;
      if ((m = line.match(/^##\s+(.*)$/))) {
        flushP(); flushL(); sub++;
        html.push('<h3 id="art-' + sec + "-" + sub + '">' + inline(m[1]) + "</h3>");
      } else if ((m = line.match(/^#\s+(.*)$/))) {
        flushP(); flushL(); sec++; sub = 0;
        toc.push({ id: "partie-" + sec, t: m[1] });
        html.push('<h2 id="partie-' + sec + '"><span>' + pad(sec) + "</span>" + inline(m[1]) + "</h2>");
      } else if ((m = line.match(/^[-•]\s+(.*)$/))) {
        flushP(); list.push(m[1]);
      } else if ((m = line.match(/^>\s?(.*)$/))) {
        flushP(); flushL();
        html.push("<blockquote><p>" + inline(m[1]) + "</p></blockquote>");
      } else {
        flushL(); para.push(line);
      }
    });
    flushP(); flushL();
    rulesBox.innerHTML = html.join("");

    $$("[data-rules-date]").forEach(function (el) { el.textContent = R.miseAJour || ""; });
    $$("[data-rules-count]").forEach(function (el) { el.textContent = pad(toc.length); });

    var tocBox = $("[data-toc]");
    if (tocBox) {
      tocBox.innerHTML = toc.map(function (t, i) {
        return '<li><a href="#' + t.id + '"><span>' + pad(i + 1) + "</span>" + esc(t.t) + "</a></li>";
      }).join("");
      var links = $$("a", tocBox);
      var heads = toc.map(function (t) { return document.getElementById(t.id); });
      var spy = function () {
        var y = window.scrollY + 160, cur = 0;
        heads.forEach(function (h, i) { if (h && h.offsetTop <= y) cur = i; });
        links.forEach(function (a, i) { a.classList.toggle("is-active", i === cur); });
      };
      window.addEventListener("scroll", spy, { passive: true });
      spy();
    }

    // Recherche dans le règlement
    var search = $("[data-rules-search]");
    if (search) {
      var blocks = $$("p, li, h3", rulesBox);
      blocks.forEach(function (b) { b.setAttribute("data-src", b.innerHTML); });
      search.addEventListener("input", function () {
        var q = search.value.trim();
        var nq = norm(q);
        var first = null;
        blocks.forEach(function (b) {
          b.innerHTML = b.getAttribute("data-src");
          b.classList.remove("is-dim");
          if (nq.length < 2) return;
          if (norm(b.textContent).indexOf(nq) === -1) { b.classList.add("is-dim"); return; }
          if (!first) first = b;
          var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
          walkText(b, re);
        });
        if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }
  function walkText(node, re) {
    $$("*", node).concat([node]).forEach(function (el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType !== 3 || !re.test(n.nodeValue)) return;
        re.lastIndex = 0;
        var span = document.createElement("span");
        span.innerHTML = esc(n.nodeValue).replace(re, "<mark>$1</mark>");
        el.replaceChild(span, n);
      });
    });
  }

  /* ---------------------------------------------------------------- Packs Oasys Coins */
  var coinBox = $("[data-coins]");
  if (coinBox && C.coins && C.coins.length) {
    coinBox.hidden = false;
    $(".coins__grid", coinBox).innerHTML = C.coins.map(function (c) {
      var href = esc(safeUrl(c.lien || L.tebex));
      return '<a class="coin" data-reveal href="' + href + '" target="_blank" rel="noopener">' +
        '<span class="coin__img"><img src="' + esc(c.image) + '" alt="Pack ' + esc(c.quantite) + ' Oasys Coins" loading="lazy" width="900" height="900"></span>' +
        (c.tag ? '<span class="coin__tag">' + esc(c.tag) + "</span>" : "") +
        '<span class="coin__body"><span class="coin__qty">' + esc(c.quantite) + "<small>Oasys Coins" + (c.offert ? ' <b class="coin__gift">' + esc(c.offert) + " offerts</b>" : ' <b class="coin__gift" aria-hidden="true" style="visibility:hidden">0</b>') + "</small></span>" +
        '<span class="coin__price">' + esc(c.prix) + "</span>" +
        '<span class="btn btn--sm btn--sky">Acheter' + I.arrow + "</span></span></a>";
    }).join("");
    $$(".coin", coinBox).forEach(function (a, i) {
      var pkg = C.coins[i].paquet;
      if (pkg) a.setAttribute("data-paquet", String(pkg));
    });
  }

  /* ---------------------------------------------------------------- Paiement direct Tebex
     Acheter -> panier Tebex -> connexion FiveM (obligatoire chez Tebex) -> retour ici
     -> fenêtre de paiement Tebex par-dessus le site (sinon page pay.tebex.io). */
  var ckToken = C.tebex && C.tebex.checkoutToken;
  if (coinBox && ckToken && window.fetch) {
    var API = "https://headless.tebex.io/api/";
    var KEY = "oasys_tebex_achat";
    var here = location.origin + location.pathname;

    var toast = document.createElement("div");
    toast.className = "pay-toast";
    toast.setAttribute("role", "status");
    toast.hidden = true;
    document.body.appendChild(toast);
    var msg = function (t, err) {
      toast.textContent = t;
      toast.classList.toggle("is-err", !!err);
      toast.hidden = !t;
    };
    var api = function (path, method, body) {
      return fetch(API + path, {
        method: method || "GET",
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : undefined,
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok) throw new Error(j.detail || j.title || ("Erreur " + r.status));
          return j;
        });
      });
    };
    var fail = function (e) {
      sessionStorage.removeItem(KEY);
      msg("Paiement impossible : " + (e && e.message ? e.message : "réessaie dans un instant") + ".", true);
      setTimeout(function () { msg(""); }, 7000);
    };

    var loadTebexJs = function () {
      if (window.Tebex) return Promise.resolve(window.Tebex);
      return new Promise(function (ok, ko) {
        var s = document.createElement("script");
        s.src = "https://js.tebex.io/v/1.js";
        s.onload = function () { window.Tebex ? ok(window.Tebex) : ko(); };
        s.onerror = ko;
        document.head.appendChild(s);
      });
    };
    var payer = function (basket) {
      var link = basket.links && basket.links.checkout;
      loadTebexJs().then(function (Tebex) {
        Tebex.checkout.init({
          ident: basket.ident,
          theme: "dark",
          colors: [{ name: "primary", color: "#3fd0fb" }, { name: "secondary", color: "#0b1622" }],
        });
        Tebex.checkout.on("payment:complete", function () {
          msg("Paiement validé ! Tes coins arrivent en jeu (/boutique).");
          setTimeout(function () { msg(""); }, 9000);
        });
        Tebex.checkout.launch();
        msg("");
      }).catch(function () {
        if (link) location.href = link; else fail();
      });
    };

    // Clic sur Acheter : nouveau panier puis connexion FiveM
    coinBox.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest(".coin[data-paquet]");
      if (!a) return;
      e.preventDefault();
      msg("Préparation du paiement…");
      api("accounts/" + encodeURIComponent(ckToken) + "/baskets", "POST", {
        complete_url: here + "?paiement=ok",
        cancel_url: here,
        complete_auto_redirect: true,
      }).then(function (j) {
        var ident = j.data.ident;
        sessionStorage.setItem(KEY, JSON.stringify({ ident: ident, paquet: Number(a.getAttribute("data-paquet")) }));
        return api("accounts/" + encodeURIComponent(ckToken) + "/baskets/" + encodeURIComponent(ident) +
          "/auth?returnUrl=" + encodeURIComponent(here + "?achat=1"));
      }).then(function (links) {
        var l = (links || [])[0];
        if (!l || !l.url) throw new Error("connexion FiveM indisponible");
        msg("Connexion FiveM…");
        location.href = l.url;
      }).catch(fail);
    });

    // Retour de la connexion FiveM : ajoute le pack puis ouvre le paiement
    var params = new URLSearchParams(location.search);
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (err) { saved = null; }
    if (params.has("achat") && saved && saved.ident && saved.paquet) {
      history.replaceState(null, "", here + location.hash);
      msg("Ajout du pack…");
      api("baskets/" + encodeURIComponent(saved.ident) + "/packages", "POST", { package_id: saved.paquet, quantity: 1 })
        .then(function () { return api("accounts/" + encodeURIComponent(ckToken) + "/baskets/" + encodeURIComponent(saved.ident)); })
        .then(function (j) { sessionStorage.removeItem(KEY); payer(j.data); })
        .catch(fail);
    } else if (params.get("paiement") === "ok") {
      history.replaceState(null, "", here + location.hash);
      msg("Paiement validé ! Tes coins arrivent en jeu (/boutique).");
      setTimeout(function () { msg(""); }, 9000);
    }
  }

  /* ---------------------------------------------------------------- Tebex (optionnel) */
  var pkgBox = $("[data-tebex-packages]");
  var token = C.tebex && C.tebex.publicToken;
  if (pkgBox && token && window.fetch) {
    fetch("https://headless.tebex.io/api/accounts/" + encodeURIComponent(token) + "/categories?includePackages=1")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (json) {
        var rows = [];
        (json.data || []).forEach(function (cat) {
          (cat.packages || []).forEach(function (p) { rows.push({ cat: cat.name, p: p }); });
        });
        if (!rows.length) return;
        var base = safeUrl(L.tebex).replace(/\/$/, "");
        pkgBox.hidden = false;
        $(".packages__list", pkgBox).innerHTML = rows.map(function (o) {
          var p = o.p;
          var price = p.total_price != null ? p.total_price : p.base_price;
          var priceTxt = price != null ? Number(price).toFixed(2).replace(".", ",") + " " + (p.currency || "€") : "";
          var img = p.image ? '<img src="' + esc(safeUrl(p.image)) + '" alt="" loading="lazy">' : '<span class="pkg__ph"></span>';
          return '<div class="pkg">' + img +
            '<div><span class="pkg__cat">' + esc(o.cat) + '</span><div class="pkg__name">' + esc(p.name) + "</div></div>" +
            '<span class="pkg__price">' + esc(priceTxt) + "</span>" +
            '<a class="btn btn--sm" href="' + esc(base + "/package/" + encodeURIComponent(p.id)) + '" target="_blank" rel="noopener">Voir' + I.arrow + "</a></div>";
        }).join("");
      })
      .catch(function () { /* boutique affichée via le bouton uniquement */ });
  }

  /* ---------------------------------------------------------------- Vidéo du hero */
  var vid = $(".hero__media video");
  if (vid) {
    var conn = navigator.connection || {};
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conn.saveData || reduce) {
      vid.removeAttribute("autoplay"); vid.pause();
    } else {
      var p = vid.play && vid.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  /* ---------------------------------------------------------------- Apparitions au scroll */
  var revealables = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
    $$(".feature").forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }
  $$("[data-stagger]").forEach(function (group) {
    $$("[data-reveal]", group).forEach(function (el, i) { el.style.setProperty("--d", (i * 0.08) + "s"); });
  });

  /* ---------------------------------------------------------------- Retour en haut */
  var top = document.createElement("button");
  top.className = "back-top";
  top.type = "button";
  top.setAttribute("aria-label", "Retour en haut");
  top.innerHTML = I.up;
  top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(top);
  window.addEventListener("scroll", function () { top.classList.toggle("is-visible", window.scrollY > 900); }, { passive: true });

  /* ---------------------------------------------------------------- Transitions de page */
  requestAnimationFrame(function () { document.body.classList.add("is-ready"); });
  window.addEventListener("pageshow", function (e) { if (e.persisted) document.body.classList.remove("is-leaving"); document.body.classList.add("is-ready"); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute("href") || "";
    if (!/\.html(#.*)?$/.test(href) || href.indexOf("://") !== -1) return;
    var here = location.pathname.split("/").pop() || "index.html";
    if (href.split("#")[0] === here) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(function () { location.href = href; }, 220);
  });
})();
