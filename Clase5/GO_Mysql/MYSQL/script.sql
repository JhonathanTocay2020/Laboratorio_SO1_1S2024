CREATE DATABASE clase5;
USE clase5;

CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    carnet VARCHAR(20)
);

select * from estudiantes;

INSERT INTO estudiantes (nombre, carnet) VALUES
    ('Juan Pérez', "12345"),
    ('María Gómez', "67890"),
    ('Carlos Rodríguez', "54321"),
    ('Ana López', "98765"),
    ('Pedro Martínez', "24680");
    
DROP  table estudiantes;