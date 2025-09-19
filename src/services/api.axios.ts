import axios from "axios";

const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("✅ [API] Consulta exitosa a la API de criptomonedas");
    return {
      currency: "USD",
      rate: response.data.bpi.USD.rate,
      time: response.data.time.updated,
    };
  } catch (error: any) {
    console.error(" [API] Error al consultar API:", error.message);
    throw new Error("No se pudo obtener la información de la API externa.");
  }
};

export { fetchCryptoData };
