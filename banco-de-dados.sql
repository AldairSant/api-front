CREATE DATABASE catalogo_produtos;

USE catalogo_produtos;

CREATE TABLE produtos
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    preco DECIMAL(10, 2)
);