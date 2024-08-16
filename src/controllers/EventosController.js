import { conn, handleError } from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

export const criarEventos = (request, response) => {
    const { titulo, data_evento, palestranteId } = request.body;

    if (!titulo) {
        response.status(500).send({ message: "O titulo é obrigatório" });
        return;
    }

    if (!data_evento) {
        response.status(500).send({ message: "A data é obrigatório" });
        return;
    }

    if (!palestranteId) {
        response.status(500).send({ message: "o id do Palestrante é obrigatório" });
        return;
    }
    const id = uuidv4();

    const checkSql = /*sql*/ `
          SELECT * FROM eventos
          WHERE ?? = ?
      `;

    const checkSqlData = ["id", id]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar o evento" });
            return console.log("[EVENTO POST FAIL] " + err);
        }

        if (data.length > 0) {
            response.status(500).json({ message: "Evento já existente" });
            return console.log("[EVENTO POST FAIL] " + err);
        }

        const insertSql = /*sql*/ `
          INSERT INTO eventos
          (id, titulo, data_evento, palestranteId)
          VALUES (
           '${id}' , ' ${titulo}',  ' ${data_evento}',   '${palestranteId}'
              )
          `;

        conn.query(insertSql, (err, data) => {
            if (err) {
                response.status(500).json({ message: "Error ao cadastrar o EVENTO" });
                return console.log("[EVENTO POST FAIL] " + err);
            }

            response.status(201).json({ message: "evento cadastrado" });
        });
    });

};
export const Agenda = (request, response) => {
    const sql = "SELECT * FROM eventos";

    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar os eventos" });
            return console.log("[EVENTOS GET FAIL]" + err);
        }

        const eventos = data;
        response.json({ message: eventos });
    })
};
export const inscreveParticipantes = (request, response) => {
};
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
export const CancelarEvento = (request, response) => {
    const { id } = request.params;

    const deleteSql = /*sql*/ `
    DELETE FROM eventos
    WHERE ?? = ?
  `;

    const deleteSqlData = ["id", id]

    conn.query(deleteSql, deleteSqlData, (err) => {
        if (err) {
            response.status(500).json({ message: "Erro ao deletar evento" });
            return;
        }

        response.json({ message: "evento foi deletado" });
    });
};
export const Editar = (request, response) => {
    const { titulo, data_evento, palestranteId } = request.body;

    if (!titulo) {
        response.status(500).send({ message: "O titulo é obrigatório" });
        return;
    }

    if (!data_evento) {
        response.status(500).send({ message: "A data é obrigatório" });
        return;
    }

    if (!palestranteId) {
        response.status(500).send({ message: "o id do Palestrante é obrigatório" });
        return;
    }

    const id = uuidv4();

    const sql = /*sql*/ `
      SELECT * FROM eventos
      WHERE ?? = ?
    `;

    const checkSqlData = ["id", id];

    conn.query(sql, checkSqlData, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar EVENTO" });
            return;
        }

        if (data.length > 0) {
            response.status(404).json({ message: "EVENTO não encontrado" });
            return;
        }

        const updateSql = /*sql*/ `
      UPDATE eventos
      SET ?? = ?,
      titulo = '${titulo}',
      data_evento = '${data_evento}',
      palestranteId = "${palestranteId}"
      WHERE ?? = ?
    `;

        const updateSqlData = ["titulo", titulo, "data_evento", data_evento, "palestranteId", palestranteId, "id", id]

        conn.query(updateSql, updateSqlData, (err) => {
            if (err) {
                console.log("[EVENTO PUT FAIL] " + err);
                response.status(500).json({ message: "Erro ao atualizar o EVENTO" });
            }

            response.json({ message: "EVENTO atualizado" });
        });
    });
};
