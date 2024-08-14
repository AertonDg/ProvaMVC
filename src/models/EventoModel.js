import conn from "../config/conn.js"

const tabelaEventos = /*sql*/ `
  CREATE TABLE IF NOT EXISTS eventos (
    titulo VARCHAR(60) PRIMARY KEY,
    data DATE NOT NULL,
    palestranteId INT NOT NULL,
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