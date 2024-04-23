# Instalar Rust en Ubuntu

```sh
sudo apt update
sudo apt install -y build-essential
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustc --version
```

# Comandos Rocket RUST

Crear un Componente nuevo

```sh
cargo new app-cliente
```

Crear un Componente nuevo

Ejecutar 

```sh
cargo run
```

Eliminar los paquetes/dependencias descargadas

```sh
cargo clean
```