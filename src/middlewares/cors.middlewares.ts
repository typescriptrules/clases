import cors from "cors";

export const corsMiddleware = cors({
    origin: "http://localhost:3002/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});