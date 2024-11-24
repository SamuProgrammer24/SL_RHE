import Database from 'better-sqlite3';

const options = {
    fileMustExist: false,
    readonly: false,
    verbose: console.log,  
};

const basededatos = new Database('basededatos.db', options);

console.log('basededatos', {basededatos});


//basededatos.pragma('journal_mode = WAL');


basededatos.exec(`
 CREATE TABLE IF NOT EXISTS Usuarios (
  usuarioid integer PRIMARY KEY,        
  email varchar(250) NOT NULL,     
  password varchar(250) NOT NULL
 );

 INSERT OR REPLACE INTO Usuarios (usuarioid, email, password) VALUES (1, '123@ejemplo.com', 'samuel');
 INSERT OR REPLACE INTO Usuarios (usuarioid, email, password) VALUES (2, 'osl@ejemplo.com', 'OSL2024');
 INSERT OR REPLACE INTO Usuarios (usuarioid, email, password) VALUES (3, 'sl2024@ejemplo.com', 'santalucia');
`);








export default basededatos;
