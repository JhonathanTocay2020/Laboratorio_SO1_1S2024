# Docker Compose

### Construir imagenes

```sh
docker compose build
```

### Levantar contenedores

```sh
docker compose up -d
```

NOTA: Si aun no se han construido las imaganes se puede agregar el comando --build al final para que las contruya y luego levante los contenedores.

### Detener contenedores

```sh
docker compose down
```

### Si el archivo .yml no se llama "docker-compose" utilizaremos los siguientes comandos.

```sh
docker-compose -f <nombre_archivo.yml> up -d
docker-compose -f <nombre_archivo.yml> down
```

# Docker Volumenes

### Listar los Volumenes.
```sh
docker volume ls
```

### Crear un Volumen.

```sh
docker volume create <nombre_del_volumen>
```

### Eliminar un volumen.

```sh
docker volume rm <nombre_del_volumen>
```

### Eliminar todos los volúmenes no utilizados.

```sh
docker volume prune
```
# Descargar Mongo 

```sh
docker pull mongo
```

### Correr MongoDB

```sh
docker run -d -p 27017:27017 --name MongoDB  mongo
```

# MONGODB COMPASS
### Descargar el DEB de MONGODB COMPASS

```sh
wget https://downloads.mongodb.com/compass/mongodb-compass_1.35.0_amd64.deb
```

### Instalar MONGODB COMPASS

```sh
sudo dpkg -i mongodb-compass_1.35.0_amd64.deb
```

### Iniciar MONGODB COMPASS

```sh
mongodb-compass
```

### Instalar DBeaver en  Ubuntu 22.04

```sh
sudo snap install dbeaver-ce
```