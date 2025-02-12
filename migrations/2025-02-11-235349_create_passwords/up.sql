-- Your SQL goes here
CREATE TABLE passwords (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nome_servico TEXT NOT NULL,
    email TEXT NOT NULL,
    url_servico TEXT,
    url_image TEXT,
    senha TEXT NOT NULL,
    senha_size INT UNSIGNED NOT NULL
);