# Clase 9 - GRPC

### GRPC

Descargar Librerias para GRPC y agregarlas al GOPATH

```sh
go get -u google.golang.org/protobuf/cmd/protoc-gen-go
go list -f '{{.Target}}' google.golang.org/protobuf/cmd/protoc-gen-go
export PATH=$PATH:$(go env GOPATH)/bin
```

Generar Archivos compilados

```sh
protoc --go_out=. --go-grpc_out=. nombre_archivo.proto
```

### Descargar Mysql

```sh
docker pull mysql
```

Script

```SQL
Create Database clase9;
use clase9;

create table votos(
    id_voto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    no_sede varchar(200),
    municipio varchar(200),
    departamento varchar(200),
    partido varchar(200)
);

select * from votos;
DELETE from votos; 
```