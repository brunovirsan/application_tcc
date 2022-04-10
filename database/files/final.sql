-- TABLE
CREATE TABLE dados_sensores(
  idDado INTEGER PRIMARY KEY AUTOINCREMENT,
  fkDispositivo INTEGER,
  dado TEXT NOT NULL,
  data_captura DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  FOREIGN KEY(fkDispositivo) REFERENCES dispositivo(idDispositivo)
 
);
CREATE TABLE demo (id integer primary key, name varchar(20), hint text);
CREATE TABLE dispositivo(
  idDispositivo INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  sensor TEXT NOT NULL,
  topico TEXT not NULL,
  fkUsuario INTEGER,
  FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario)
);
CREATE TABLE sqlite_sequence(name,seq);

CREATE TABLE usuario(
  idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT not NULL,
  password text not NULL
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
