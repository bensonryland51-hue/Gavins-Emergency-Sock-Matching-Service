(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var dialog = document.getElementById("notify-dialog");
  document.querySelectorAll("[data-notify]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        alert("Gavin has been notified. (He hasn't.)");
      }
    });
  });

  var form = document.getElementById("report-form");
  var result = document.getElementById("form-result");
  if (!form || !result) return;

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
})();
