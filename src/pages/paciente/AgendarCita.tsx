import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import type { MedicoResponseDTO } from '../../types/medico';
import type { CitaRequestDTO } from '../../types/cita';

export const AgendarCita = () => {
  const [medicos, setMedicos] = useState<MedicoResponseDTO[]>([]);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [formData, setFormData] = useState<CitaRequestDTO>({
    pacienteCedula: '',
    medicoId: 0,
    fecha: '',
    hora: '',
    duracionMinutos: 30,
    motivo: ''
  });
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>('');
  const [medicosFiltrados, setMedicosFiltrados] = useState<MedicoResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await api.get('/medicos');
        const medicosData = response.data;
        setMedicos(medicosData);

        // Extract unique specialties
        const specs = Array.from(new Set(medicosData.map((m: MedicoResponseDTO) => m.especialidad)));
        setEspecialidades(specs);
      } catch (err) {
        console.error('Error fetching medicos:', err);
        setError('Error al cargar médicos');
      }
    };

    fetchMedicos();

    // Set patient cedula from user
    if (user?.username) {
      setFormData(prev => ({ ...prev, pacienteCedula: user.username }));
    }
  }, [user?.username]);

  useEffect(() => {
    if (selectedEspecialidad) {
      const filtered = medicos.filter(m => m.especialidad === selectedEspecialidad);
      setMedicosFiltrados(filtered);
    } else {
      setMedicosFiltrados([]);
    }
  }, [selectedEspecialidad, medicos]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    const today = new Date().toISOString().split('T')[0];
    if (formData.fecha < today) {
      setError('La fecha debe ser futura');
      return;
    }

    if (formData.medicoId === 0) {
      setError('Debe seleccionar un médico');
      return;
    }

    if (formData.duracionMinutos < 15 || formData.duracionMinutos > 120) {
      setError('La duración debe estar entre 15 y 120 minutos');
      return;
    }

    setLoading(true);

    try {
      await api.post('/citas/agendar', formData);
      alert('Cita agendada exitosamente');
      navigate('/mis-citas');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Error al agendar la cita';
      setError(errorMsg);
      console.error('Error agendando cita:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Agendar Cita</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especialidad
              </label>
              <select
                value={selectedEspecialidad}
                onChange={(e) => {
                  setSelectedEspecialidad(e.target.value);
                  setFormData({ ...formData, medicoId: 0 }); // Reset medico selection
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>

            {selectedEspecialidad && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Médico
                </label>
                <select
                  value={formData.medicoId}
                  onChange={(e) => setFormData({ ...formData, medicoId: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                >
                  <option value="0">Seleccione un médico</option>
                  {medicosFiltrados.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                      Dr. {medico.nombres} {medico.apellidos}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora
              </label>
              <input
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duracionMinutos}
                onChange={(e) => setFormData({ ...formData, duracionMinutos: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="15"
                max="120"
                step="15"
                required
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">Entre 15 y 120 minutos</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo (opcional)
              </label>
              <textarea
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Agendando...' : 'Agendar Cita'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/mis-citas')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
