use crate::auth::{hash_senha, verificar_senha, gerar_qr_code_2fa};
use crate::cryp::{decrypt_password, encrypt_password};
use crate::db::DbPool;
use crate::models::{Ativar2FARequest, LoginUser, NewPassword, NewPasswordRequest, NewUser, Password, User};
use diesel::prelude::*;
use rocket::{post, get, State};
use rocket::serde::json::Json;
use rand::RngCore;
use base32::{encode, decode, Alphabet};
use totp_rs::{TOTP, Algorithm};
use std::time::SystemTimeError;

#[options("/register")]
pub fn options_register() {}


#[options("/login")]
pub fn options_login() {}



fn gerar_chave_secreta() -> String {
    let mut chave = [0u8; 20];
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

    let user = users
        .filter(email.eq(&login_data.email))
        .first::<User>(conn)
        .map_err(|e| format!("Erro ao buscar usuário: {}", e))?;

    if !verificar_senha(&login_data.senha, &user.senha)
        .map_err(|e| format!("Erro na verificação: {}", e))?
    {
        return Err("Senha incorreta!".to_string());
    }

    match &user.chave_secreta_2fa {
        Some(chave_secreta) => {
            
           let decoded_secret = decode(
            Alphabet::RFC4648 { padding: false }, 
            chave_secreta
        )
        .ok_or_else(|| "Chave secreta inválida".to_string())?;

            // 6. Criação do TOTP com parâmetros
            let totp = TOTP::new(
                Algorithm::SHA1,
                6,
                1,
                30,
                decoded_secret,
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

#[post("/store_password", data = "<password_data>")]
pub fn store_password(
    password_data: Json<NewPasswordRequest>, // Novo struct (veja abaixo)
    pool: &State<DbPool>,
) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão")?;

    use crate::schema::users::dsl::*;

     // Verifica se o usuário com o ID e EMAIL fornecidos existe
    let user_exists = users
        .filter(id.eq(password_data.user_id).and(email.eq(&password_data.email)))
        .first::<User>(conn)
        .optional()
        .map_err(|_| "Erro ao buscar usuário")?;

    if user_exists.is_none() {
        return Err("Usuário não encontrado ou e-mail incorreto".to_string());
    }

    // Criptografa a senha (gera encrypted_password + iv)
    let (encrypted_password, iv) = encrypt_password(&password_data.password)
        .map_err(|e| format!("Erro na criptografia: {}", e))?;

    // Cria a entrada para o banco de dados
    let new_password = NewPassword {
        user_id: password_data.user_id,
        site: password_data.site.clone(),
        email: password_data.email.clone(),
        encrypted_password,
        iv,
    };

    diesel::insert_into(crate::schema::passwords::table)
        .values(&new_password)
        .execute(conn)
        .map_err(|e| format!("Erro ao salvar senha: {}", e))?;

    Ok(Json("Senha armazenada com sucesso".to_string()))
}

#[get("/retrieve_password/<user_id_par>/<site_par>")]
pub fn retrieve_password(user_id_par: i32, site_par: String, pool: &State<DbPool>) -> Result<Json<String>, String> {
   let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;
   use crate::schema::passwords::dsl::*;


   let password_entry = passwords
       .filter(user_id.eq(user_id_par).and(site.eq(&site_par)))
       .first::<Password>(conn)
       .map_err(|e| match e {
        diesel::result::Error::NotFound => "Senha não encontrada".to_string(),
        _ => format!("Erro ao buscar senha: {}", e),
    })?;


   let decrypted_password = decrypt_password(&password_entry.encrypted_password, &password_entry.iv)
       .map_err(|e| format!("Erro na descriptografia: {}", e))?;


   Ok(Json(decrypted_password))
}
