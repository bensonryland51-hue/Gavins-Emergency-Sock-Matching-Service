(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVG_NS = "http://www.w3.org/2000/svg";

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function wait(ms) { return reduceMotion ? 0 : ms; }

  function replayClass(el, cls) {
    if (reduceMotion) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Toast */
  var toast = document.getElementById("toast");
  var toastTimer;
  function say(message) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = "";
    // Re-set text on the next frame so screen readers announce repeated messages.
    requestAnimationFrame(function () {
      toast.textContent = message;
      toast.classList.add("is-visible");
    });
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 4200);
  }

  /* Threat level */
  var threatLevels = [
    ["ELEVATED", "— laundry day is approaching."],
    ["SEVERE", "— a sock has been seen near the dryer."],
    ["ARGYLE", "— diamond-pattern activity reported."],
    ["ODD", "— socks are no longer in even numbers."],
    ["BEIGE", "— nothing is happening, very calmly."],
    ["DEFCON SOCK", "— Gavin has put his shoes on."]
  ];
  var threatBtn = document.getElementById("threat-btn");
  var threatDesc = document.getElementById("threat-desc");
  var threatIndex = 0;
  if (threatBtn && threatDesc) {
    threatBtn.addEventListener("click", function () {
      threatIndex = (threatIndex + 1) % threatLevels.length;
      threatBtn.textContent = threatLevels[threatIndex][0];
      threatDesc.textContent = threatLevels[threatIndex][1];
      replayClass(threatBtn, "is-boing");
    });
  }

  /* Pricing pop-up */
  var tierMessages = {
    basic: "You chose Basic Pair-Up. Gavin will get round to it. Possibly.",
    priority: "Priority Darn selected. Please prepare 3 lint balls in small, unmarked bags.",
    platinum: "Platinum Sole Mate. Gavin is ironing his special lanyard.",
    enterprise: "Our sales team (Gavin) is thrilled. He is doing a little dance."
  };
  var dialog = document.getElementById("notify-dialog");
  document.querySelectorAll("[data-notify]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var extra = tierMessages[btn.getAttribute("data-notify")] || "";
      var p = dialog && dialog.querySelector("p");
      if (p) p.textContent = "(He hasn't.) " + extra + " Nothing was purchased and nothing was sent. This is a parody.";
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      else say("Gavin has been notified. (He hasn't.)");
    });
  });

  /* Sock panel */
  var sockReplies = {
    comfort: [
      "The sock feels 12% better.",
      "There, there. Lots of socks go it alone these days.",
      "The sock would like a moment."
    ],
    dryer: [
      "The dryer denies everything.",
      "The dryer has asked for a lawyer.",
      "The dryer is humming innocently."
    ],
    summon: [
      "Gavin has been summoned. He is finishing his tea.",
      "Gavin is on his way. He has taken the scenic route.",
      "Gavin's ears are burning. Professionally."
    ],
    sniff: [
      "Inconclusive. Please do not do that again.",
      "Notes of cheddar and regret.",
      "The sock has filed a complaint."
    ],
    panic: [
      "Panic logged. Please continue panicking calmly.",
      "Remain calm. The sock certainly isn't.",
      "Your panic has been forwarded to the relevant department (Gavin)."
    ]
  };
  var pressCount = 0;
  var pressEl = document.getElementById("press-count");
  document.querySelectorAll("[data-sock-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var action = btn.getAttribute("data-sock-action");
      pressCount += 1;
      if (pressEl) pressEl.textContent = pressCount;
      replayClass(btn, "is-boing");
      if (action === "inside-out") {
        var flipped = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", String(flipped));
        say(flipped ? "It was inside out all along." : "Back the right way round. Probably.");
        return;
      }
      say(pick(sockReplies[action]));
    });
  });

  /* Poke Gavin */
  var poke = document.getElementById("poke-gavin");
  if (poke) {
    var pokeLines = [
      "Gavin waves. Gavin is very busy.",
      "Please do not poke the staff.",
      "Gavin says hello. Gavin says that's enough now.",
      "That tickles. Unprofessionally."
    ];
    poke.addEventListener("click", function () {
      replayClass(poke, "is-boing");
      say(pick(pokeLines));
    });
  }

  /* Fake report form */
  var form = document.getElementById("report-form");
  var result = document.getElementById("form-result");
  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.elements.sock;
      var desc = input.value.trim();
      result.classList.remove("is-error");
      result.textContent = "";

      if (!desc) {
        input.setAttribute("aria-invalid", "true");
        result.classList.add("is-error");
        result.textContent = "Please describe the sock. Gavin cannot work with vibes alone.";
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");

      var heading = document.createElement("strong");
      heading.textContent = "Gavin is on his way.";
      var body = document.createElement("span");
      body.textContent =
        "Case #" + Math.floor(1000 + Math.random() * 9000) +
        " opened for: \u201C" + desc + "\u201D. Please remain near your laundry basket. " +
        "(Nothing was actually sent. This is a parody.)";
      result.append(heading, body);
      result.focus();
      form.reset();
    });
  }

  /* Secret sock matching game */
  var SOCK_TYPES = [
    { id: "stripes", name: "red striped", fill: "url(#pat-stripes)" },
    { id: "dots", name: "navy polka-dot", fill: "url(#pat-dots)" },
    { id: "argyle", name: "argyle", fill: "url(#pat-argyle)" },
    { id: "rainbow", name: "rainbow", fill: "url(#pat-rainbow)" },
    { id: "festive", name: "festive green", fill: "url(#pat-festive)" },
    { id: "black", name: "black", fill: "#151515" },
    { id: "nearly-black", name: "nearly black", fill: "#4a3d36" }
  ];
  var MISMATCH_LINES = [
    "Those are not a pair. Gavin is disappointed.",
    "Bold choice. Wrong, but bold.",
    "A {a} sock and a {b} sock? Gavin has seen things, but not that.",
    "That's not a match. That's a cry for help.",
    "Fashion is subjective. Matching is not."
  ];
  var MATCH_LINES = [
    "Reunited! The {a} socks are going home.",
    "A perfect match. The {a} pair is crying happy lint.",
    "The {a} socks have been reunited. Somewhere, a drawer rejoices."
  ];

  var hud = document.getElementById("game-hud");
  var statusEl = document.getElementById("game-status");
  var resetBtn = document.getElementById("game-reset");
  var winDialog = document.getElementById("win-dialog");
  var winText = document.getElementById("win-text");
  var winAgain = document.getElementById("win-again");
  var confetti = document.getElementById("confetti");
  var hosts = Array.prototype.slice.call(document.querySelectorAll("main > section:not(.stats)"));

  var selected = null;
  var busy = false;
  var matched = 0;
  var attempts = 0;

  function fill(template, a, b) {
    return template.replace("{a}", a).replace("{b}", b || "");
  }

  function makeSockSvg(type) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 48 60");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#sock-shape");
    use.setAttribute("fill", type.fill);
    svg.appendChild(use);
    return svg;
  }

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function updateStatus() {
    if (statusEl) statusEl.textContent = "Pairs reunited: " + matched + " of " + SOCK_TYPES.length;
  }

  function showHud() {
    if (hud) hud.hidden = false;
  }

  function scatter() {
    document.querySelectorAll(".lost-sock").forEach(function (el) { el.remove(); });
    selected = null;
    busy = false;
    matched = 0;
    attempts = 0;
    updateStatus();

    var socks = [];
    SOCK_TYPES.forEach(function (t) { socks.push(t, t); });
    shuffle(socks);

    var slots = [];
    hosts.forEach(function (host) { slots.push([host, "top"], [host, "bottom"]); });
    shuffle(slots);

    socks.forEach(function (type, i) {
      var slot = slots[i % slots.length];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lost-sock lost-sock-" + slot[1];
      btn.dataset.sock = type.id;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Lost " + type.name + " sock");
      btn.style.left = (2 + Math.random() * 78).toFixed(1) + "%";
      btn.style.setProperty("--tilt", (Math.random() * 50 - 25).toFixed(0) + "deg");
      if (Math.random() < 0.5) btn.classList.add("is-mirrored");
      btn.appendChild(makeSockSvg(type));
      btn.addEventListener("click", onSockClick);
      slot[0].appendChild(btn);
    });
  }

  function onSockClick(event) {
    var sock = event.currentTarget;
    if (busy || sock.classList.contains("is-matched")) return;
    showHud();

    if (selected === sock) {
      sock.classList.remove("is-selected");
      sock.setAttribute("aria-pressed", "false");
      selected = null;
      say("Sock put back down. It looks hurt.");
      return;
    }

    if (!selected) {
      selected = sock;
      sock.classList.add("is-selected");
      sock.setAttribute("aria-pressed", "true");
      say("Sock picked up. Now find its partner.");
      return;
    }

    var first = selected;
    selected = null;
    attempts += 1;
    var nameA = first.getAttribute("aria-label").replace(/^Lost | sock$/g, "");
    var nameB = sock.getAttribute("aria-label").replace(/^Lost | sock$/g, "");

    if (first.dataset.sock === sock.dataset.sock) {
      busy = true;
      matched += 1;
      [first, sock].forEach(function (el) {
        el.classList.remove("is-selected");
        el.classList.add("is-matched");
        el.setAttribute("aria-pressed", "false");
        el.disabled = true;
        spawnHeart(el);
      });
      updateStatus();
      say(fill(pick(MATCH_LINES), nameA));
      setTimeout(function () {
        first.remove();
        sock.remove();
        busy = false;
        if (matched === SOCK_TYPES.length) win();
        else if (document.activeElement === document.body || !document.activeElement) {
          var next = document.querySelector(".lost-sock:not(.is-matched)");
          if (next) next.focus({ preventScroll: true });
        }
      }, wait(700));
      return;
    }

    busy = true;
    sock.classList.add("is-selected");
    [first, sock].forEach(function (el) { replayClass(el, "is-wrong"); });
    say(fill(pick(MISMATCH_LINES), nameA, nameB));
    setTimeout(function () {
      [first, sock].forEach(function (el) {
        el.classList.remove("is-selected", "is-wrong");
        el.setAttribute("aria-pressed", "false");
      });
      busy = false;
    }, wait(600));
  }

  function spawnHeart(el) {
    if (reduceMotion) return;
    var heart = document.createElement("span");
    heart.className = "sock-heart";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = "\u2665";
    heart.style.left = el.style.left;
    el.parentNode.appendChild(heart);
    if (el.classList.contains("lost-sock-bottom")) heart.classList.add("sock-heart-bottom");
    setTimeout(function () { heart.remove(); }, 1200);
  }

  function rainSocks() {
    if (reduceMotion || !confetti) return;
    confetti.textContent = "";
    for (var i = 0; i < 28; i++) {
      var s = document.createElement("span");
      s.className = "confetti-sock";
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDelay = (Math.random() * 1.2).toFixed(2) + "s";
      s.style.animationDuration = (2.4 + Math.random() * 1.6).toFixed(2) + "s";
      s.appendChild(makeSockSvg(pick(SOCK_TYPES)));
      confetti.appendChild(s);
    }
    setTimeout(function () { confetti.textContent = ""; }, 5000);
  }

  function win() {
    var verdict = attempts <= SOCK_TYPES.length
      ? "A flawless performance. Gavin suspects cheating, but admires it."
      : attempts <= SOCK_TYPES.length * 2
        ? "Gavin is weeping openly."
        : "It took a while, but so does laundry.";
    if (winText) {
      winText.textContent = "You reunited all " + SOCK_TYPES.length + " pairs in " + attempts +
        " attempts. " + verdict + " You have been awarded the Order of the Matching Pair (honorary, non-transferable, not real).";
    }
    if (statusEl) statusEl.textContent = "All pairs reunited. Drawer status: immaculate.";
    rainSocks();
    if (winDialog && typeof winDialog.showModal === "function") winDialog.showModal();
    else say("Every sock is home. Gavin is weeping openly.");
  }

  function restart() {
    if (winDialog && winDialog.open) winDialog.close();
    scatter();
    say("Oh no. The socks have escaped again.");
  }

  if (resetBtn) resetBtn.addEventListener("click", restart);
  if (winAgain) winAgain.addEventListener("click", restart);

  if (hosts.length) scatter();

  if (window.console && console.info) {
    console.info("%cPsst. " + SOCK_TYPES.length * 2 + " socks are loose on this page. Match the pairs.", "color:#d7192d;font-weight:bold");
  }
})();
