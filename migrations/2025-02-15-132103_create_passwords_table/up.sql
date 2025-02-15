-- Your SQL goes here
CREATE TABLE passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    site TEXT NOT NULL,
    email TEXT NOT NULL,
    encrypted_password TEXT NOT NULL,
    iv TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, site) -- Restringe duplicatas diretamente na tabela
);