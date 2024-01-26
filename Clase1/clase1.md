# Instalacion de Docker en Ubuntu 22.04

### [Docker](https://docs.docker.com/engine/install/ubuntu/)

## Desinstalar Versiones Anteriores a Docker
```sh
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

## Instalacion Utilizando el repositorio de Docker

1. Actualizacion de los paquetes

```sh
sudo apt-get update
```

2. Instalacion de dependencias.
```sh
sudo apt-get install ca-certificates curl gnupg
```
3. Agregue la clave GPG oficial de Docker:
```sh
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```
4. configurar el repositorio

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

5. Instalacion de Docker Engine

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

6. Estado de Docker.
```sh
sudo systemctl status docker
```

7. Ver las Versiones de Docker y Docker Compose
```sh
docker version
docker compose version
```

# Comandos de Docker

## Construir una Imagen

```sh
docker build -t nombre_de_la_imagen .
```
Nota: El punto al final del comando indica que el contexto de construcción es el directorio actual.

## Ejecutar una imagen

```sh 
sudo docker run -d -p <<puerto a exponer>>:<<puerto del contenedor>> <<nombre imagen>>
```
Nota: 
-d: Indica que el contenedor se ejecutará en segundo plano.
-p <puerto_a_exponer>:<puerto_del_contenedor>: Este flag permite mapear puertos entre el host (tu sistema) y el contenedor. 

## Ejecutar una imagen visualizando mensajes en consola

```
sudo docker run -p <<puerto a exponer>>:<<puerto del contenedor>> <<nombre imagen>>
```
## Ver las imagenes descargadas o construidas

```sh
sudo docker images
```

## Ver todos los contenedores

```sh
sudo docker ps -a
```

## Ver todos los contenedores activos

```sh
sudo docker ps
```
## Eliminar todas las imagenes, contenedores y volumenes.

```sh
sudo docker system prune -a
```

## Eliminar un contenedir especifico.

```sh
sudo docker rm <<id container>>
```

## Eliminar una imagen especifica.

```sh
sudo docker rmi <<id image>>
```

# Forzar a eliminar una imagen especifica 

```sh
sudo docker rmi -f <<id image>>
```
