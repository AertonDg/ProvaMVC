import { Router } from "express";

import { ALLpalestrante, newPalestrante, } from "../controllers/PalestranteController.js"

const router = Router();

router.get("/palestrantes", ALLpalestrante);

router.post("/palestrantes", newPalestrante);

export default router;