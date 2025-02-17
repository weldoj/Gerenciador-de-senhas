use diesel::{prelude::*, sqlite::Sqlite};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize)]
pub struct User {
    pub id: Option<i32>, // Campo nullable
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String,
    pub chave_secreta_2fa: Option<String>,
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

#[derive(Debug, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::passwords)]
#[diesel(check_for_backend(Sqlite))]
pub struct Password {
    pub id: Option<i32>,
    pub user_id: i32,
    pub site: String,
    pub email: String,
    pub encrypted_password: String,
    pub iv: String,
    pub url: Option<String>,      // Campo opcional
    pub url_image: Option<String> // Campo opcional
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::passwords)]
pub struct NewPassword {
    pub user_id: i32,
    pub site: String,
    pub email: String,
    pub url: String,     
    pub url_image: String,
    pub encrypted_password: String,
    pub iv: String,
}

#[derive(Deserialize)]
pub struct NewPasswordRequest {
    pub user_id: i32,
    pub site: String,
    pub email: String,
    pub url: String,     
    pub url_image: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct DeletePasswordRequest {
    pub username: String,
    pub site: String,
}

#[derive(Serialize)]
pub struct PasswordResponse {
    pub site: String,
    pub senha: String,
}