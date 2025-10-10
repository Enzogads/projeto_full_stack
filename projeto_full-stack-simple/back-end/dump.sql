CREATE DATABASE senai;
USE senai;

CREATE TABLE usuario (
  id INT PRIMARY_KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  ativo INT NOT NULL,
  data_cadastro DATETIME NOT NULL,
  nivel INT NULL,
)

//armazenador_log

CREATE TABLE lgs(
	id INT PRIMARY KEY AUTO_INCREMENT,
	categoria TEXT,
    horas_trabalhadas INT,
    linha_de_codigo INT,
    bugs_corrigidos INT
);