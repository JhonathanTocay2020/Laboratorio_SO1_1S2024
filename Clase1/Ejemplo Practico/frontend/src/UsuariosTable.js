import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap

const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:2024/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <center><h4>Tabla de Usuarios</h4></center>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosTable;

