import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Bienvenido, {user?.username}
          </h1>
          
          <p className="text-gray-600 mb-6">
            Rol: <span className="font-semibold">{user?.rol}</span>
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {user?.rol === 'PACIENTE' && (
              <>
                <Link
                  to="/mis-citas"
                  className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Mis Citas</h3>
                  <p className="text-gray-600">Ver y gestionar mis citas programadas</p>
                </Link>

                <Link
                  to="/agendar"
                  className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
                >
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Agendar Cita</h3>
                  <p className="text-gray-600">Programar una nueva cita médica</p>
                </Link>
              </>
            )}

            {user?.rol === 'MEDICO' && (
              <>
                <Link
                  to="/agenda"
                  className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Mi Agenda</h3>
                  <p className="text-gray-600">Ver citas programadas</p>
                </Link>

                <div className="block p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximamente</h3>
                  <p className="text-gray-600">Más funcionalidades en desarrollo</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
