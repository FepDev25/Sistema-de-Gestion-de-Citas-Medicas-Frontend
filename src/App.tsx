import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Medicos } from './pages/Medicos';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MisCitas } from './pages/paciente/MisCitas';
import { AgendarCita } from './pages/paciente/AgendarCita';

// Placeholder for doctor routes
const Agenda = () => <div className="p-4">Mi Agenda - En desarrollo</div>;

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600">Página no encontrada</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Patient routes */}
        <Route element={<ProtectedRoute allowedRoles={['PACIENTE']} />}>
          <Route path="/mis-citas" element={<MisCitas />} />
          <Route path="/agendar" element={<AgendarCita />} />
        </Route>

        {/* Doctor routes */}
        <Route element={<ProtectedRoute allowedRoles={['MEDICO']} />}>
          <Route path="/agenda" element={<Agenda />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
