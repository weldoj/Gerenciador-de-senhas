use aes_gcm::{aead::{Aead, KeyInit, OsRng, AeadCore}, Aes256Gcm, Key, Nonce};
use base64::{encode, decode};
use std::env;
use dotenvy::dotenv;

fn get_secret_key() -> Result<[u8; 32], String> {
    dotenv().ok(); // Carrega variáveis do .env
    let key_str = env::var("SECRET_KEY").map_err(|_| "SECRET_KEY não definida")?;

    let key_bytes = key_str.as_bytes();
    if key_bytes.len() != 32 {
        return Err("A chave deve ter 32 bytes (256 bits)".to_string());
    }

    let mut key_array = [0u8; 32];
    key_array.copy_from_slice(key_bytes);
    Ok(key_array)
}

pub fn encrypt_password(password: &str) -> Result<(String, String), String> {
    let binding = get_secret_key()?;
    let key = Key::<Aes256Gcm>::from_slice(&binding);
    let cipher = Aes256Gcm::new(key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    let encrypted = cipher.encrypt(&nonce, password.as_bytes()).map_err(|_| "Erro ao criptografar")?;

    Ok((encode(&encrypted), encode(nonce.as_slice())))
}

pub fn decrypt_password(encrypted_password: &str, iv: &str) -> Result<String, String> {
    let binding = get_secret_key()?;
    let key = Key::<Aes256Gcm>::from_slice(&binding);
    let cipher = Aes256Gcm::new(key);

    let decoded_iv = decode(iv).map_err(|_| "Erro ao decodificar IV")?; // Armazenar em variável
    let nonce = Nonce::from_slice(&decoded_iv);
    let decrypted = cipher.decrypt(nonce, decode(encrypted_password).map_err(|_| "Erro ao decodificar senha")?.as_ref())
        .map_err(|_| "Erro ao descriptografar")?;

    Ok(String::from_utf8(decrypted).map_err(|_| "Erro ao converter para string")?)
}
