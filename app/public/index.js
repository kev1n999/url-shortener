const url = document.getElementById("url");
const shortenerBtn = document.getElementById("shortener-btn");
const result = document.getElementById("result");
const redirectBtn = document.getElementById("redirect-btn");

let shortUrl = "";

shortenerBtn.addEventListener("click", () => {
  result.textContent = "Encurtando URL...";
  redirectBtn.disabled = true;
  shortUrl = "";

  fetch("/api/shortener/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      originalUrl: url.value,
    }),
  })
    .then((r) => r.json())
    .then((shortener) => {
      shortUrl = shortener.shortUrl;
      result.textContent = shortUrl;
      redirectBtn.disabled = false;
    })
    .catch((err) => {
      result.textContent = err.message;
    });
});

redirectBtn.addEventListener("click", () => {
  if (!shortUrl) {
    return;
  }

  window.location.href = shortUrl;
});
