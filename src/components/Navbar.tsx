import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold">
              Sistema de Citas
            </Link>
            
            {user?.rol === 'PACIENTE' && (
              <div className="flex space-x-4">
                <Link to="/mis-citas" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Mis Citas
                </Link>
                <Link to="/agendar" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Agendar Cita
                </Link>
              </div>
            )}
            
            {user?.rol === 'MEDICO' && (
              <div className="flex space-x-4">
                <Link to="/agenda" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Mi Agenda
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {user?.username} ({user?.rol})
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
