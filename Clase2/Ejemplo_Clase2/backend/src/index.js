const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = 2024;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Este middleware permite el análisis del cuerpo de la solicitud como JSON.
//mongodb://MongoDB:27017/clase2
//mongodb://localhost:27017/clase2
mongoose.connect('mongodb://MongoDB:27017/clase2', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

const Alumno = mongoose.model('alumnos', {
  carnet: Number,
  nombre: String,
  apellido: String,
  edad: Number
});

// Obtener todos los alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de alumnos' });
  }
});

// Insertar un nuevo alumno
app.post('/InsertAlumno', async (req, res) => {
  const { carnet, nombre, apellido, edad } = req.body;

  if (!carnet || !nombre || !apellido || !edad) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const nuevoAlumno = new Alumno({ carnet, nombre, apellido, edad });
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar el alumno' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});

