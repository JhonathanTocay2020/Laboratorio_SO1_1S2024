const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 2024;

app.use(morgan('dev'));
app.use(cors());

const usuarios = [
  { carnet: 1, name: 'Usuario 1' },
  { carnet: 2, name: 'Usuario 2' },
  { carnet: 3, name: 'Usuario 3' },
  { carnet: 4, name: 'Usuario 4' },
  { carnet: 5, name: 'Usuario 5' },
];

// Configuración para poder recibir y parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido API NODEJS',
  });
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuario/:carnet', (req, res) => {
  const userCarnet = parseInt(req.params.carnet);
  const usuario = usuarios.find((user) => user.carnet === userCarnet);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    res.json(usuario);
  }
});

// Ruta para insertar un nuevo usuario
app.post('/InsertartUsuario', (req, res) => {
  const { carnet, name } = req.body;

  if (!carnet || !name) {
    return res.status(400).json({ error: 'Se requiere carnet y nombre para agregar un nuevo usuario' });
  }

  if (usuarios.some((user) => user.carnet === carnet)) {
    return res.status(400).json({ error: 'El carnet ya está en uso' });
  }

  const nuevoUsuario = { carnet, name };
  usuarios.push(nuevoUsuario);

  res.json({ mensaje: 'Usuario agregado exitosamente', usuario: nuevoUsuario });
});

// Escuchando en el puerto especificado
app.listen(port, () => {
  console.log(`El Servidor está corriendo en http://localhost:${port}`);
});
