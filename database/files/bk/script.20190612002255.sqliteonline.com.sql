CREATE TABLE dados_coletados(
  id_dado INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_dispositivo INTEGER,
  payload TEXT NOT NULL,
  data_captura DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  FOREIGN KEY(fk_dispositivo) REFERENCES dispositivo(id_dispositivo)

)