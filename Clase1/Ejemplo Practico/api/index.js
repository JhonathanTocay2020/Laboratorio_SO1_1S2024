const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

const app = express();
const port = 2024;

app.use(morgan('dev'));
app.use(cors());

const usuarios = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
    { id: 3, name: 'Usuario 3' },
    { id: 4, name: 'Usuario 4' },
    { id: 5, name: 'Usuario 5' },
];

// Configuración para poder recibir y parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: "Bienvenido API NODEJS"
  })
});

app.get('/data',(req,res)=>{
    res.json({
        id: 0,
        nombre: "Nombre estudiante"
    })
})

app.get('/usuarios',(req,res)=>{
    res.json(usuarios)
})

app.get('/usuario/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find((user) => user.id === userId);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(usuario);
    }
  });
  
// Escuchando en el puerto especificado
app.listen(port, () => {
  console.log(`El Servidor esta corriendo en http://localhost:${port}`);
});