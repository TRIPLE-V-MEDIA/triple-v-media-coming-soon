"use strict";

// South Africa Standard Time is UTC+02:00 year-round.
const LAUNCH_DATE = new Date("2027-01-15T00:00:00+02:00").getTime();

// Update this manually as your website development progresses (0–100).
const DEVELOPMENT_PROGRESS = 75;

// Email address that should receive launch-update request drafts.
const CONTACT_EMAIL = "info.triplev.media@gmail.com";
const $ = (selector) => document.querySelector(selector);
const pad = (value) => String(value).padStart(2, "0");
function updateCountdown() {
  const remaining = Math.max(0, LAUNCH_DATE - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = pad(hours);
  $("#minutes").textContent = pad(minutes);
  $("#seconds").textContent = pad(seconds);
  if (remaining === 0) {
    $("#launch-message").textContent =
      "It's launch day! Welcome to the next chapter of Triple V Media.";
    clearInterval(countdownInterval);
  }
}
const progress = Math.min(100, Math.max(0, DEVELOPMENT_PROGRESS));
$("#progress-number").textContent = `${progress}%`;
$("#progress-bar").setAttribute("aria-valuenow", String(progress));
$("#progress-fill").style.width = `${progress}%`;
$("#year").textContent = new Date().getFullYear();
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
$("#notify-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#email").value.trim();
  if (!$("#email").checkValidity()) {
    $("#email").reportValidity();
    return;
  }
  if (!CONTACT_EMAIL) {
    $("#form-note").textContent =
      "Setup required: set CONTACT_EMAIL in script.js to the address that should receive launch-update requests. Your address has not been saved.";
    return;
  }
  const subject = encodeURIComponent("Triple V Media — launch updates request");
  const body = encodeURIComponent(
    `Please notify me when Triple V Media launches.\n\nMy email: ${email}`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  $("#form-note").textContent =
    "Your email app should open with a draft. Please send it to request launch updates; no signup has been saved on this site.";
});
