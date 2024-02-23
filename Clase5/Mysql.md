
# MYSQL

### ¿Como Descargar la imagen de MySQL?

utilizaremos el siguiente comando para descargar la imagen de MYSQL.

```sh
docker pull mysql
```

### Referencia: [MYSQL](https://hub.docker.com/_/mysql)


## Levantar el contenedor

```sh 
docker run --name <nombre_contenedor> -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<mi_password> <nombre_imagen>
```

Ejemplo: 
```sh
docker run --name mysql-db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret mysql
```
docker run --name mysql-db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysql123 mysql

## Acceder al contenedor
```sh
docker exec -it <nombre_contendor> mysql -uroot -p<mi_password>
```

Ejemplo:
```sh
docker exec -it mysql-db mysql -uroot -psecret
```

Aquí podrán utilizar la sintaxis de MySQL
```sh
CREATE DATABASE <mi_base>;

USE DATABASE <mi_base>;
```

### Con Persistencia

```sh 
docker run -dp 3306:3306 --name <nombre_contendor>  -e MYSQL_ROOT_PASSWORD=<mi_password> --mount src=<volumen>,dst=/var/lib/mysql mysql
```

Ejemplo:
```sh
docker run -d -p 3306:3306 --name mysql-db  -e MYSQL_ROOT_PASSWORD=secret --mount src=mysql-data,dst=/var/lib/mysql mysql
```

### Instalar DBeaver en  Ubuntu 22.04

```sh
sudo snap install dbeaver-ce
```