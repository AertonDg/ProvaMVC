import "dotenv/config"
import express from "express"

import PalestranteRoutes from "./routes/PalestranteRoutes.js"
import EventosRoutes from "./routes/EventosRoutes.js"

import conn from "./config/conn.js";

import "./models/EventoModel.js"
import "./models/PalestranteModel.js"
import "./models/ParticipanteModel.js"

const PORT = process.env.PORT;

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use("/", PalestranteRoutes)
app.use("/eventos", PalestranteRoutes);
app.use("/eventos", EventosRoutes)

app.use((request, response) => {
    response.status(404).json({ message: "recurso não encontrado" })
})


app.listen(PORT, () => {
    console.log("servidor on PORT " + PORT)
})