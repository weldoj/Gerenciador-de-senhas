#[derive(Queryable)]
pub struct User {
    pub id: i32,
    pub nome: String,
    pub email: String,
    pub username: String,
    pub senha: String
}
