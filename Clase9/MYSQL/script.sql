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