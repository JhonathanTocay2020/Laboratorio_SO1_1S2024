use rocket::{routes, serde::json::Json};
use rocket::post;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Data {
    sede: String,
    municipio: String,
    departamento: String,
    partido: String,
}

#[post("/send_data", data = "<data>")]
async fn send_data(data: Json<Data>) -> String {
    let client = Client::new();
    let server_url = "http://localhost:8080/data";
    let response = client.post(server_url).json(&data.into_inner()).send().await;

    match response {
        Ok(_) => "Data sent successfully!".to_string(),
        Err(e) => format!("Failed to send data: {}", e),
    }
}

#[rocket::main]
async fn main() {
    rocket::build().mount("/", routes![send_data]).launch().await.unwrap();
}