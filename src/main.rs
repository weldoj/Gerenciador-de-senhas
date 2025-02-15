#[macro_use] extern crate rocket;

mod db;
mod auth;
mod routes;
mod models;
mod schema;
mod cryp;

use db::establish_connection;

#[launch]
fn rocket() -> _ {
    let pool = establish_connection();

    rocket::build()
        .manage(pool)
        .mount("/api", routes![routes::register, routes::login, routes::ativar_2fa, routes::store_password, routes::retrieve_password])
}

