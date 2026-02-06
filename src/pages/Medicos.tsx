import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { MedicoResponseDTO } from '../types/medico';

export const Medicos = () => {
  const [medicos, setMedicos] = useState<MedicoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await api.get('/medicos');
        setMedicos(response.data);
      } catch (err: any) {
        setError('Error al cargar el listado de médicos');
        console.error('Error fetching medicos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando médicos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Directorio de Médicos</h1>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Iniciar Sesión
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {medicos.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No hay médicos registrados</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombres</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Apellidos</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Especialidad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Teléfono</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicos.map((medico) => (
                    <tr key={medico.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{medico.nombres}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{medico.apellidos}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {medico.especialidad}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{medico.telefono}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{medico.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
