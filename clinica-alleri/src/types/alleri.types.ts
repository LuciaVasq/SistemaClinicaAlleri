// Definición de las DTOs
export type EstadoDTO = 'ACTIVO' | 'INACTIVO'
export type MetodoPagoDTO = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA'

export interface CubiculoDTO {
    id: number
    nombre: string

}
export interface PsicologoDTO {
    id?: number
    apellidoPaterno?: string
    apellidoMaterno?: string
    nombre?: string
    correo?: string
    telefono?: string
    estado?: EstadoDTO
    adeudo?: AdeudoDTO
}

export interface PacienteDTO {
    id?: number
    apellidoPaterno?: string
    apellidoMaterno?: string
    nombre?: string
    correo?: string
    telefono?: string
    estado?: EstadoDTO
    psicologo: PsicologoDTO

}


export interface UsuarioDTO {
    id: number
    usuario: string
}

export interface PagoDTO {
  id?: number
  fechaHora: string
  total: number
  concepto: string
  metodoPago: MetodoPagoDTO
  citas: CitaDTO[]      
  psicologo: PsicologoDTO
}

export interface AdeudoDTO {
    id: number
    total: number
    citas: CitaDTO[]
}

export interface CitaDTO {
  id?: number           
  cubiculo: CubiculoDTO
  paciente: PacienteDTO
  psicologo: PsicologoDTO
  fechaHoraInicio: string
  fechaHoraFin: string    
  precio: number        
  recepcionista?: UsuarioDTO
  pago?: PagoDTO           
  adeudo?: AdeudoDTO       
}