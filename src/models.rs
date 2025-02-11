use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String,  // Hash da senha
    pub chave_secreta_2fa: Option<String>, // Nova coluna adicionada
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser {
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String,
    pub chave_secreta_2fa: Option<String>, // Adicionado ao cadastro
}

#[derive(Deserialize, Serialize)]
pub struct LoginUser {
    pub email: String,
    pub senha: String,
    pub codigo_2fa: Option<String>,
}

#[derive(Deserialize)]
pub struct Ativar2FARequest {
    pub username: String,
}