import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import type { CitaResponseDTO } from '../../types/cita';

export const MisCitas = () => {
  const [citas, setCitas] = useState<CitaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();

  const fetchCitas = async () => {
    if (!user?.username) return;
    
    try {
      setLoading(true);
      const response = await api.get(`/citas/paciente/${user.username}`);
      setCitas(response.data);
      setError('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Error al cargar las citas';
      setError(errorMsg);
      console.error('Error fetching citas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [user?.username]);

  const handleCancelar = async (citaId: number) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      return;
    }

    try {
      await api.put(`/citas/cancelar/${citaId}`);
      alert('Cita cancelada exitosamente');
      fetchCitas(); // Reload the list
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Error al cancelar la cita';
      alert(errorMsg);
      console.error('Error canceling cita:', err);
    }
  };

  const getEstadoBadgeClass = (estado: string) => {
    const classes: Record<string, string> = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      CONFIRMADA: 'bg-green-100 text-green-800',
      CANCELADA: 'bg-red-100 text-red-800',
      FINALIZADA: 'bg-gray-100 text-gray-800'
    };
    return classes[estado] || 'bg-gray-100 text-gray-800';
  };

  const canCancel = (estado: string) => {
    return estado !== 'FINALIZADA' && estado !== 'CANCELADA';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando citas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Citas</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {citas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No tienes citas programadas</p>
              <a
                href="/agendar"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Agendar una cita
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hora</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Médico</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Duración</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Motivo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {citas.map((cita) => (
                    <tr key={cita.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{cita.fecha}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{cita.hora}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {cita.medicoNombre || `ID: ${cita.medicoId}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{cita.duracionMinutos} min</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadgeClass(cita.estado)}`}>
                          {cita.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {cita.motivo || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {canCancel(cita.estado) ? (
                          <button
                            onClick={() => handleCancelar(cita.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                          >
                            Cancelar
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
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
