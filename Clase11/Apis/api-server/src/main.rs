use actix_web::{web, App, HttpResponse, HttpServer, Result};
use actix_cors::Cors;
use serde_json::json;
use std::sync::Arc;

#[derive(serde::Deserialize)]
struct Data {
    sede: String,
    municipio: String,
    departamento: String,
    partido: String,
}

async fn receive_data(data: web::Json<Data>) -> Result<HttpResponse> {
    let received_data = data.into_inner();
    let response_body = format!(
        "Received data: Sede: {}, Municipio: {}, Departamento: {}, Partido: {}",
        received_data.sede, received_data.municipio, received_data.departamento, received_data.partido
    );

    // Imprimir la solicitud en la consola
    println!("Received POST request to /data");

    Ok(HttpResponse::Ok().json(json!({ "message": response_body })))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .wrap(actix_web::middleware::Logger::default()) // Agregar el middleware Logger
            .route("/data", web::post().to(receive_data))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}