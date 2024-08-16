import conn from "../config/conn.js"

const tabelaEventos = /*sql*/ `
  CREATE TABLE IF NOT EXISTS eventos (
    id VARCHAR(60) PRIMARY KEY,
    titulo VARCHAR(60) NOT NULL,
    data_evento DATE NOT NULL,
    palestranteId VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

conn.query(tabelaEventos, (err) => {
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela [EVENTOS] criada!");
  
});