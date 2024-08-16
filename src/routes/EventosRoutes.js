import { Router } from "express";

import { Agenda, criarEventos, inscreveParticipantes, registerParticipante, CancelarEvento, Editar } from "../controllers/EventosController.js"

const router = Router();
router.get("/agenda", Agenda);
router.post("/participantes/registrar", registerParticipante)
router.post("/criar", criarEventos);
router.post("/inscrever", inscreveParticipantes);
router.delete("/cancelar", CancelarEvento);
router.put("/editar", Editar)

export default router;