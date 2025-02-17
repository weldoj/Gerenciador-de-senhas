-- Your SQL goes here
-- Criar nova tabela com estrutura correta
CREATE TABLE passwords_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    site TEXT NOT NULL,
    email TEXT NOT NULL,
    encrypted_password TEXT NOT NULL,
    iv TEXT NOT NULL,
    url TEXT,
    url_image TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


-- Excluir a tabela antiga
DROP TABLE passwords;

-- Renomear a nova tabela para 'passwords'
ALTER TABLE passwords_new RENAME TO passwords;

-- Recriar índice único
CREATE UNIQUE INDEX idx_passwords_user_id_site ON passwords (user_id, site);
