export interface Cita {
  id: number;
  pacienteCedula: string;
  medicoId: number;
  fecha: string;
  hora: string;
  duracionMinutos: number;
  estado: EstadoCita;
  motivo?: string;
  medicoNombre?: string;
  pacienteNombre?: string;
}

export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'FINALIZADA';

export interface CitaRequestDTO {
  pacienteCedula: string;
  medicoId: number;
  fecha: string; // formato: yyyy-MM-dd
  hora: string; // formato: HH:mm
  duracionMinutos: number;
  motivo?: string;
}

export interface CitaResponseDTO {
  id: number;
  pacienteCedula: string;
  medicoId: number;
  fecha: string;
  hora: string;
  duracionMinutos: number;
  estado: EstadoCita;
  motivo?: string;
  medicoNombre?: string;
  pacienteNombre?: string;
}
