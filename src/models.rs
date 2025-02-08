use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String,  // Hash da senha
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser {
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginUser {
    pub email: String,
    pub senha: String,
}
