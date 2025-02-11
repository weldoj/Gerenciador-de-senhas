use crate::auth::{hash_senha, verificar_senha, gerar_qr_code_2fa};
use crate::db::DbPool;
use crate::models::{NewUser, User, LoginUser, Ativar2FARequest};
use diesel::prelude::*;
use rocket::{post, State};
use rocket::serde::json::Json;
use rand::RngCore;
use base32::{encode, decode, Alphabet};
use totp_rs::{TOTP, Algorithm};
use std::time::SystemTimeError;

// 1. Tamanho correto da chave (20 bytes = 160 bits)
fn gerar_chave_secreta() -> String {
    let mut chave = [0u8; 20];  // Tamanho corrigido
    rand::thread_rng().fill_bytes(&mut chave);
    encode(Alphabet::RFC4648 { padding: false }, &chave)
}

#[post("/register", data = "<user_data>")]
pub fn register(user_data: Json<NewUser>, pool: &State<DbPool>) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;

    let chave_2fa = gerar_chave_secreta();

    let hashed_password = hash_senha(&user_data.senha)
        .map_err(|e| format!("Erro ao gerar hash: {}", e))?;

    let new_user = NewUser {
        nome: user_data.nome.clone(),
        email: user_data.email.clone(),
        username: user_data.username.clone(),
        senha: hashed_password,
        chave_secreta_2fa: Some(chave_2fa),
    };

    diesel::insert_into(crate::schema::users::table)
        .values(&new_user)
        .execute(conn)
        .map_err(|e| format!("Erro ao inserir usuário: {}", e))?;

    Ok(Json("Usuário registrado com sucesso".to_string()))
}

#[post("/login", data = "<login_data>")]
pub fn login(login_data: Json<LoginUser>, pool: &State<DbPool>) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;

    use crate::schema::users::dsl::*;

    // 2. Tratamento melhorado de erros
    let user = users
        .filter(email.eq(&login_data.email))
        .first::<User>(conn)
        .map_err(|e| format!("Erro ao buscar usuário: {}", e))?;

    // 3. Verificação de senha simplificada
    if !verificar_senha(&login_data.senha, &user.senha)
        .map_err(|e| format!("Erro na verificação: {}", e))?
    {
        return Err("Senha incorreta!".to_string());
    }

    // 4. Fluxo 2FA melhorado
    match &user.chave_secreta_2fa {
        Some(chave_secreta) => {
            // 5. Decodificação com tratamento de erro detalhado
           // 5. Decodificação com tratamento de erro detalhado
           let decoded_secret = decode(
            Alphabet::RFC4648 { padding: false }, 
            chave_secreta
        )
        .ok_or_else(|| "Chave secreta inválida".to_string())?;

            // 6. Criação do TOTP com parâmetros corrigidos
            let totp = TOTP::new(
                Algorithm::SHA1,
                6,
                1,
                30,
                decoded_secret, // Corrigido: Vec<u8> diretamente
            ).map_err(|e| format!("Erro ao criar TOTP: {}", e))?;
                    // 7. Verificação do código com logs
            let codigo = login_data.codigo_2fa.as_ref()
                .ok_or("Código 2FA obrigatório!".to_string())?;


            if totp.check_current(codigo)
                .map_err(|e: SystemTimeError| format!("Erro de tempo: {}", e))?
            {
                Ok(Json(format!("Login bem-sucedido! Bem-vindo, {}", user.username)))
            } else {
                Err("Código 2FA inválido!".to_string())
            }
        }
        None => Ok(Json(format!("Login bem-sucedido! Bem-vindo, {}", user.username))),
    }
}

#[post("/ativar-2fa", data = "<data>")]
pub fn ativar_2fa(data: Json<Ativar2FARequest>, pool: &State<DbPool>) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;

    use crate::schema::users::dsl::*;

    let usuario = users
        .filter(username.eq(&data.username))
        .first::<User>(conn)
        .map_err(|_| "Usuário não encontrado".to_string())?;

    let chave_secreta = usuario.chave_secreta_2fa
        .ok_or("Usuário não tem 2FA ativado".to_string())?;

    let qr_code_path = gerar_qr_code_2fa(&usuario.username, &chave_secreta);

    Ok(Json(format!("QR Code salvo em: {}", qr_code_path)))
}