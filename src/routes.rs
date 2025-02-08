use crate::auth::{hash_senha, verificar_senha};
use crate::db::DbPool;
use crate::models::{NewUser, User, LoginUser};
use diesel::prelude::*;
use rocket::{post, State};
use rocket::serde::json::Json;

#[post("/register", data = "<user_data>")]
pub fn register(user_data: Json<NewUser>, pool: &State<DbPool>) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;

    let hashed_password = hash_senha(&user_data.senha)
        .map_err(|_| "Erro ao gerar hash da senha".to_string())?;

    let new_user = NewUser {
        nome: user_data.nome.clone(),
        email: user_data.email.clone(),
        username: user_data.username.clone(),
        senha: hashed_password,
    };

    diesel::insert_into(crate::schema::users::table)
        .values(&new_user)
        .execute(conn)
        .map_err(|e| format!("Erro ao inserir usuário: {:?}", e))?;

    Ok(Json("Usuário registrado com sucesso".to_string()))
}


#[post("/login", data = "<login_data>")]
pub fn login(login_data: Json<LoginUser>, pool: &State<DbPool>) -> Result<Json<String>, String> {
    let conn = &mut pool.get().map_err(|_| "Erro ao obter conexão".to_string())?;

    use crate::schema::users::dsl::*;

    let user = users
        .filter(email.eq(&login_data.email))
        .first::<User>(conn)
        .ok();

    match user {
        Some(user) => match verificar_senha(&login_data.senha, &user.senha) {
            Ok(true) => Ok(Json(format!("Login bem-sucedido! Bem-vindo, {}", user.username))),
            Ok(false) => Ok(Json("Senha incorreta!".to_string())),
            Err(e) => Err(format!("Erro ao verificar senha: {:?}", e)),

        },
        None => Err("Usuário não encontrado!".to_string()),
    }
}
