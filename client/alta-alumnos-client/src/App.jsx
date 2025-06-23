import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormularioAlumno from './components/FormularioAlumno';
import ConsultaAlumnos from './components/ConsultaAlumnos';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/" className="text-blue-500 hover:underline">Alta de Alumnos</Link>
          <Link to="/consulta" className="text-blue-500 hover:underline">Consultar Alumnos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormularioAlumno />} />
          <Route path="/consulta" element={<ConsultaAlumnos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
