use diesel::r2d2::{ConnectionManager, Pool};
use diesel::SqliteConnection;
use std::env;
use dotenvy::dotenv;

pub type DbPool = Pool<ConnectionManager<SqliteConnection>>;

pub fn establish_connection() -> DbPool {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL não definida");
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    Pool::builder().build(manager).expect("Falha ao criar pool de conexão")
}
