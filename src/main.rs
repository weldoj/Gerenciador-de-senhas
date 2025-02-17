#[macro_use] extern crate rocket;

pub mod db;
pub mod auth;
pub mod routes;
pub mod models;
pub mod schema;
pub mod cryp;

use db::establish_connection;

#[launch]
fn rocket() -> _ {
    let pool = establish_connection();

    rocket::build()
        .manage(pool)
        .mount("/api", routes![routes::register, routes::login, routes::ativar_2fa, routes::store_password, routes::retrieve_password, routes::delete_password, routes::sites, routes::get_senhas])
}

