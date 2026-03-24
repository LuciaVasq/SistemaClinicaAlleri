// llamada al controller de citas
import { API_BASE_URL } from "./config";
import type { CitaDTO } from '../types/alleri.types';

export const citaService = {

    // conecta con el endpoint de agendar
    agendarCita: async (nuevaCita: CitaDTO): Promise<CitaDTO> => {
        const res = await fetch(`${API_BASE_URL}/citas/agendar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaCita)
        });
        if (!res.ok) throw new Error('Error al agendar la cita')
        return res.json()
    },

    obtenerCitasPorDia: async (dia: string): Promise<CitaDTO[]> => {
        // manda el dia por la url
        const fechaConHora = dia.includes('T') ? dia : `${dia}T00:00:00`
        const res = await fetch(`${API_BASE_URL}/citas/obtener?dia=${fechaConHora}`)
        if (!res.ok) throw new Error('Error al obtener las citas')
        return res.json()
    },
    modificarCita: async (idCita: number, citaModificada: CitaDTO) => {
           const response = await fetch(`${API_BASE_URL}/citas/actualizar/${idCita}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaModificada),
        });

        if (!response.ok) {
            throw new Error('Error al modificar la cita');
        }
        
        return await response.json(); 
    },
    eliminarCita: async (idCita: number) => {
        const res = await fetch(`${API_BASE_URL}/citas/eliminar/${idCita}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            throw new Error('Error al eliminar la cita')
        }

        return res.json();
    }

}