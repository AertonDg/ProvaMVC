import { conn, handleError } from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const ALLpalestrante = (request, response) => {
    try {
        conn.query(
            "SELECT * FROM palestrante",
            (err, results) => {
                if (err) {
                    handleError(response, err, "Erro ao buscar todos os palestrantes");
                } else {
                    response.status(200).json(results);
                }
            }
        );
    } catch (error) {
        handleError(response, error, "Erro ao listar os palestrantes.");
    }
};
export const newPalestrante = (request, response) => {
    const { nome, expertise } = request.body;
    const id = uuidv4();

    if (!nome || !expertise) {
        response.status(400).json({ message: "nome e expertise é obrigatorio" });
        return;
    }

    const query = "INSERT INTO palestrante (id, nome, expertise) VALUES (?, ?, ?)";
    conn.query(query, [id, nome, expertise], (err) => {
        if (err) {
            response.status(500).json({ message: "erro ao criar palestrante" });
            return;
        }
        response.status(200).json({ message: "palestrante criado com sucesso" });
    });
};	
