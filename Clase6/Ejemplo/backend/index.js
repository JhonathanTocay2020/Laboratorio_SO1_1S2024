const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');

const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 2024;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({msg: 'Sistemas Operativo 1 - 1s2024 - clase6'});
});

app.post('/Registrar', (req, res) => {
  const { nombre, carnet } = req.body;

  const query = 'INSERT INTO estudiantes(nombre, carnet) VALUES (?, ?)';
  pool.query(query, [nombre, carnet], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lastInsertID = results.insertId;
      console.log('Se ha insertado Correctamente:', lastInsertID);
      res.json({ id: lastInsertID, nombre, carnet });
    }
  });
});

app.get('/Estudiantes', (req, res) => {
  const query = 'SELECT * FROM estudiantes';
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lista = results.map((row) => ({
        id: row.id,
        nombre: row.nombre,
        carnet: row.carnet
      }));
      res.json(lista);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Instalar las librerias
// npm install express body-parser mysql2 cors dotenv morgan