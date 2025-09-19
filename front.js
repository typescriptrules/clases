const urlInput = document.getElementById("url");
const bodyInput = document.getElementById("body");
const output = document.getElementById("output");

async function hacerPeticion(metodo) {
  const url = urlInput.value;
  output.textContent = `⏳ Enviando petición ${metodo}...`;

  let data = null;
  if (["POST", "PUT"].includes(metodo) && bodyInput.value.trim()) {
    try {
      data = JSON.parse(bodyInput.value);
    } catch (err) {
      output.textContent = `⚠️ El JSON del body no es válido:\n${err}`;
      return;
    }
  }

  try {
    const res = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null
    });

    const responseData = await res.json();
    output.textContent = `✅ Respuesta ${metodo}:\n` + JSON.stringify(responseData, null, 2);
  } catch (err) {
    output.textContent = `❌ Error en ${metodo}: ${err}`;
  }
}

document.getElementById("getBtn").addEventListener("click", () => hacerPeticion("GET"));
document.getElementById("postBtn").addEventListener("click", () => hacerPeticion("POST"));
document.getElementById("putBtn").addEventListener("click", () => hacerPeticion("PUT"));
document.getElementById("deleteBtn").addEventListener("click", () => hacerPeticion("DELETE"));
