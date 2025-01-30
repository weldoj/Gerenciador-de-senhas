use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::response::status::{Created, NotFound};
use rocket::http::Status;
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
struct User{
    username: String;
    password: String;
}

#[derive(Serialize, Deserialize)]
struct Password{
    id: String;
    service: String;
    username: String;
    password: String;
}

