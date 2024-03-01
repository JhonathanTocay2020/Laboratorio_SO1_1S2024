import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuariosTable = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({
    nombre: '',
    carnet: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlumno({ ...nuevoAlumno, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://34.85.236.58:2024/Registrar', {
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
    fetch('http://34.85.236.58:2024/Estudiantes')
      .then(response => response.json())
      .then(data => setAlumnos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <center>
        
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Insertar Alumno
        </Button>
      </center>
      <br></br>
      <h4>Estudiantes</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(alumno => (
            <tr key={alumno._id}>
              <td>{alumno.carnet}</td>
              <td>{alumno.nombre}</td>
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