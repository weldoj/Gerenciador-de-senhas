

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

/// Função para gerar um hash da senha
pub fn hash_senha(senha: &str) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();

    let hash = argon2.hash_password(senha.as_bytes(), &salt)?.to_string();
    Ok(hash)
}

/// Função para verificar a senha
pub fn verificar_senha(senha: &str, hash: &str) -> Result<bool, argon2::password_hash::Error> {
    let argon2 = Argon2::default();
    let parsed_hash = PasswordHash::new(hash)?;

    Ok(argon2.verify_password(senha.as_bytes(), &parsed_hash).is_ok())
}


