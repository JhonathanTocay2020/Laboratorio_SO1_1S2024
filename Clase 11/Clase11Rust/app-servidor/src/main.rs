use rocket::response::status::BadRequest;
use rocket::serde::json::{json, Value as JsonValue};
use rocket::serde::json::Json;

#[derive(rocket::serde::Deserialize)]
struct Data {
    sede: String,
    municipio: String,
    departamento: String,
    partido: String,
}

#[rocket::post("/data", data = "<data>")]
fn receive_data(data: Json<Data>) -> Result<String, BadRequest<String>> {
    let received_data = data.into_inner();
    let response = JsonValue::from(json!({
        "message": format!("Received data: Sede: {}, Municipio: {}, Departamento: {}, Partido: {}", received_data.sede, received_data.municipio, received_data.departamento, received_data.partido)
    }));
    Ok(response.to_string())
}

#[rocket::main]
async fn main() {
    let config = rocket::Config {
        port: 8080,
        ..rocket::Config::default()
    };
    rocket::custom(config)
        .mount("/", rocket::routes![receive_data])
        .launch()
        .await
        .unwrap();
}