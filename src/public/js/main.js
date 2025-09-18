const button = document.getElementById("fetchBtn");
const urlInput = document.getElementById("url");
const output = document.getElementById("output");

button.addEventListener("click", async () => {
  const url = urlInput.value;
  output.textContent = "⏳ Enviando petición...";

  try {
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();

    output.textContent = "✅ Respuesta:\n" + JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "❌ Error: " + err;
  }
});
