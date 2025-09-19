import axios from "axios";
import { ICrypto } from "../interfaces/crypto";

export async function getCryptoPrices(): Promise<ICrypto[]> {
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const params = { vs_currency: "usd", ids: "bitcoin,ethereum,cardano" };

  const maxRetries = 3;
  let attempt = 0;
  let lastError: any = null;

  while (attempt < maxRetries) {
    try {
      const res = await axios.get(url, {
        params,
        timeout: 8000,
        headers: {
          "User-Agent": "api-services/1.0 (+https://localhost)"
        }
      });
      return res.data;
    } catch (err: any) {
      lastError = err;
      const code = err.code || err?.response?.status;
      const msg = err.message || "Unknown error";
      console.error(`Intento ${attempt + 1} de ${maxRetries} - Error CoinGecko:`, { code, msg });

      // Si es error de DNS/red o timeout, reintentar con backoff
      const retriableCodes = ["ECONNRESET", "ECONNABORTED", "ENOTFOUND", "ETIMEDOUT", "EAI_AGAIN"]; // + timeouts
      const status = err?.response?.status;
      const retriableStatus = [429, 500, 502, 503, 504];

      if (retriableCodes.includes(code) || retriableStatus.includes(status)) {
        attempt++;
        if (attempt < maxRetries) {
          const delayMs = Math.pow(2, attempt) * 500; // 1s, 2s, 4s
          await new Promise(r => setTimeout(r, delayMs));
          continue;
        }
      }
      // Si no es reintentable o se agotaron intentos, salir
      break;
    }
  }

  console.error("Error fetching CoinGecko API (final):", {
    code: lastError?.code || lastError?.response?.status,
    message: lastError?.message,
  });
  throw new Error("No se pudo obtener datos de CoinGecko");
}
