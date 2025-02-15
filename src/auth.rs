use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use totp_rs::{Algorithm, TOTP};
use qrcode::QrCode;
use image::{ImageBuffer, Luma, Rgb};
use std::fs;

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

/// Função para gerar um QR Code para 2FA
pub fn gerar_qr_code_2fa(usuario: &str, chave_secreta: &str) -> String {
    let _totp = TOTP::new(
        Algorithm::SHA1,
        6,  // 6 dígitos
        1, // Período de 30 segundos
        30,  // Skew de 1 (janela de validação)
        chave_secreta.as_bytes().to_vec(),
    )
    .unwrap();

    let url = format!(
        "otpauth://totp/{}:{}?secret={}&issuer={}",
        "MeuApp",      // Nome do seu app
        usuario,       // O nome do usuário (ou email, dependendo de como você deseja)
        chave_secreta, // A chave secreta gerada
        "MeuApp"       // O nome do "issuer", que geralmente é o nome do aplicativo ou serviço
    );

    // Gerando o QR code
    let qr_code = QrCode::new(url).unwrap();

    // Obtendo a matriz de pixels do QR code
    let qr_width = qr_code.width();
    let qr_image_buffer = ImageBuffer::from_fn(qr_width as u32, qr_width as u32, |x, y| {
        let pixel = qr_code[(x as usize, y as usize)];
        if pixel == qrcode::Color::Dark {
            Luma([0u8]) // Preto
        } else {
            Luma([255u8]) // Branco
        }
    });

    let dir = "qrcodes/";
    fs::create_dir_all(dir).unwrap(); // Garante que a pasta existe
    let filename = format!("{}{}_qrcode.png", dir, usuario);

    // Convertendo a imagem para RGB e salvando
    let image_rgb: ImageBuffer<Rgb<u8>, Vec<u8>> = ImageBuffer::from_fn(
        qr_image_buffer.width(),
        qr_image_buffer.height(),
        |x, y| {
            let luma = qr_image_buffer.get_pixel(x, y);
            Rgb([luma[0], luma[0], luma[0]]) // Convertendo para RGB
        },
    );

    image_rgb.save(&filename).unwrap(); // Salva o QR Code

    filename // Retorna o caminho do arquivo salvo
}