import { useState } from 'react';
import axios from 'axios';

export default function ConsultaAlumnos() {
  const [busqueda, setBusqueda] = useState('');
  const [alumnos, setAlumnos] = useState([]);

  const handleBuscar = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/alumnos?nombre=${busqueda}`);
      setAlumnos(res.data);
    } catch (error) {
      console.error('Error al buscar alumnos:', error);
      alert('Ocurrió un error al buscar los alumnos.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Buscar alumnos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre"
          className="input w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleBuscar}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Buscar
        </button>
      </div>

      <div className="grid gap-4">
        {alumnos.map((alumno) => (
          <div key={alumno.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{alumno.nombre}</h3>
            <p><strong>Escuela:</strong> {alumno.escuela?.nombre || 'Sin escuela'}</p>
            <p><strong>Padre:</strong> {alumno.padres[0]?.padres?.nombre_padre} {alumno.padres[0]?.padres?.apellido_padre}</p>
            <p><strong>Madre:</strong> {alumno.padres[0]?.padres?.nombre_madre} {alumno.padres[0]?.padres?.apellido_madre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
