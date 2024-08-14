import { Router } from "express";

import { Agenda, criarEventos, inscreveParticipantes, registerParticipante } from "../controllers/EventosController.js"

const router = Router();
router.get("/agenda", Agenda);
router.post("/participantes/registrar", registerParticipante)
router.post("/criar", criarEventos);
router.post("/inscrever", inscreveParticipantes)

export default router