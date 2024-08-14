import { conn, handleError } from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

export const criarEventos = (request, response) => {
    const { titulo, data, palestranteId } = request.body;
    if (!titulo || !data || !palestranteId) {
        return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        conn.query(
            'SELECT * FROM evento WHERE titulo = ? AND data = ? AND palestranteId = ?',
            [titulo, data, palestranteId]
        );
        const id = uuidv4();
        conn.query(
            'INSERT INTO eventos (id, titulo, data, palestranteId) VALUES (?, ?, ?, ?)',
            [id, titulo, data, palestranteId]
        );
        response.status(200).json({ message: 'Evento cadastrado com sucesso' });
    } catch (error) {
        handleError(response, error, 'Erro ao cadastrar Evento');
    }
}
export const Agenda = (request, response) => {
    try {
        conn.query(
            "SELECT * FROM evento.eventos",
            (err, results) => {
                if (err) {
                    handleError(response, err, "Erro ao buscar eventos");
                } else {
                    response.status(200).json(results);
                }
            }
        );
    } catch (error) {
        handleError(response, error, "Erro ao listar eventos.");
    }

}

export const inscreveParticipantes = (request, response) => {

}
export const registerParticipante = (request, response) => {
    const { nome, email } = request.body;
    if (!nome || !email) {
        return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        if (!email.includes("@")) {
            return response.status(422).json({ message: "E-mail deve conter @" })
        }

        conn.query(
            'INSERT INTO participante ( nome, email) VALUES ( ?, ?)',
            [nome, email]
        );
        response.status(201).json({ message: 'participante cadastrado com sucesso' });
    } catch (error) {
        handleError(response, error, 'Erro ao cadastrar participante');
    }
}