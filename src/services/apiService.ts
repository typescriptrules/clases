import express from "express";
import type { Request, Response } from "express";


const router = express.Router();

// GET /pokemon/:name
export async function getPokemon (req: Request, res: Response) {
    try {
        const { name } = req.params;
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name?.toLowerCase()}`);
        if (!name) {
            return res.status(400).json({ error: "Debes enviar un nombre de Pokémon" });
        }
        if (!resp.ok) {
            return res.status(resp.status).json({ error: "Pokémon no encontrado" });
        }
        const data = await resp.json();
        res.json({
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t: any) => t.type.name),
        });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

