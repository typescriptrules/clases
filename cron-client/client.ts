import axios, {type AxiosResponse} from "axios";
import cron from "node-cron";

const API_URL = "http://localhost:3001/api/ping";

cron.schedule("*/1 * * * *", async () => {
    try {
        const res: AxiosResponse = await axios.get(API_URL, {
            headers: {
                "X-Cron-Job": "cron-client-1",
            },
        });

        console.log(`[OK] ${new Date().toISOString()} - Status: ${res.status}`);
    } catch (err: any) {
        console.error(`[ERROR] ${new Date().toISOString()} -`, err.message);
    }
});