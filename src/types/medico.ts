export interface Medico {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  telefono: string;
  email: string;
}

export interface MedicoResponseDTO {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  telefono: string;
  email: string;
}
