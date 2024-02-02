import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuariosTable = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({
    carnet: '',
    nombre: '',
    apellido: '',
    edad: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlumno({ ...nuevoAlumno, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:2024/InsertAlumno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoAlumno)
    })
      .then(response => response.json())
      .then(data => {
        setAlumnos([...alumnos, data]);
        setShowModal(false);
      })
      .catch(error => console.error('Error al insertar alumno:', error));
  };

  useEffect(() => {
    fetch('http://localhost:2024/alumnos')
      .then(response => response.json())
      .then(data => setAlumnos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <center>
        <h4>Tabla de Alumnos</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Insertar Alumno
        </Button>
      </center>

      <table className="table">
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(alumno => (
            <tr key={alumno._id}>
              <td>{alumno.carnet}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 
          Modal para insertar un nuevo alumno 
      */}
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Form.Group controlId="formCarnet">
              <Form.Label>Carnet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el carnet"
                name="carnet"
                value={nuevoAlumno.carnet}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                value={nuevoAlumno.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido"
                name="apellido"
                value={nuevoAlumno.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEdad">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el edad"
                name="edad"
                value={nuevoAlumno.edad}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsuariosTable;