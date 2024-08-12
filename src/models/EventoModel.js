import conn from "../config/conn.js"

const tabelaEventos = /*sql*/ `
  CREATE TABLE IF NOT EXISTS evento (
    id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

conn.query(tabelaEventos, (err) => {
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela [EVENTO] criada!");
  
});