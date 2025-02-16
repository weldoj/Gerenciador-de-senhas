#[macro_use] extern crate rocket;

mod db;
mod auth;
mod routes;
mod models;
mod schema;
mod cryp;
mod cors;

use db::establish_connection;
use cors::CORS;

#[launch]
fn rocket() -> _ {
    let pool = establish_connection();

    rocket::build()
        .manage(pool)
        .mount("/api", routes![routes::register, routes::login, routes::ativar_2fa, routes::store_password, routes::retrieve_password ,routes::options_register ,routes::options_login])
        .attach(CORS) // Ativa o suporte a CORS
}

