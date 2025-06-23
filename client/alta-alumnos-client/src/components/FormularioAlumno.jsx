import { useState } from 'react';
import axios from 'axios';

export default function FormularioAlumno() {
  const [formData, setFormData] = useState({
    nombre: '',
    escuelaId: '',
    padre: {
      nombre: '',
      apellido: '',
    },
    madre: {
      nombre: '',
      apellido: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('padre.') || name.startsWith('madre.')) {
      const [parent, key] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/alumnos', {
        nombre: formData.nombre,
        escuelaId: parseInt(formData.escuelaId),
        padres: {
          nombre_padre: formData.padre.nombre,
          apellido_padre: formData.padre.apellido,
          nombre_madre: formData.madre.nombre,
          apellido_madre: formData.madre.apellido,
        },
      });

      alert('Alumno registrado correctamente');
      setFormData({
        nombre: '',
        escuelaId: '',
        padre: { nombre: '', apellido: '' },
        madre: { nombre: '', apellido: '' },
      });
    } catch (error) {
      console.error('Error al registrar alumno:', error);
      alert('Ocurrió un error al registrar el alumno.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Registrar Alumno</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del alumno"
        value={formData.nombre}
        onChange={handleChange}
        className="input mb-2 w-full"
        required
      />

      <input
        type="number"
        name="escuelaId"
        placeholder="ID de la escuela"
        value={formData.escuelaId}
        onChange={handleChange}
        className="input mb-2 w-full"
        required
      />

      <div className="mb-2">
        <p className="font-semibold">Datos del padre</p>
        <input
          type="text"
          name="padre.nombre"
          placeholder="Nombre del padre"
          value={formData.padre.nombre}
          onChange={handleChange}
          className="input mb-1 w-full"
          required
        />
        <input
          type="text"
          name="padre.apellido"
          placeholder="Apellido del padre"
          value={formData.padre.apellido}
          onChange={handleChange}
          className="input mb-2 w-full"
          required
        />
      </div>

      <div className="mb-2">
        <p className="font-semibold">Datos de la madre</p>
        <input
          type="text"
          name="madre.nombre"
          placeholder="Nombre de la madre"
          value={formData.madre.nombre}
          onChange={handleChange}
          className="input mb-1 w-full"
          required
        />
        <input
          type="text"
          name="madre.apellido"
          placeholder="Apellido de la madre"
          value={formData.madre.apellido}
          onChange={handleChange}
          className="input mb-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Registrar
      </button>
    </form>
  );
}
