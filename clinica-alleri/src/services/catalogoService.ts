// llamadas a los controllers springboot

import { API_BASE_URL } from "./config";
import type { PacienteDTO, CubiculoDTO, PsicologoDTO } from "../types/alleri.types";

// obtiene los pacientes , cubiculos y psicologos
export const catalogoService = {

    obtenerPacientes: async (): Promise<PacienteDTO[]> => {
        const res = await fetch(`${API_BASE_URL}/pacientes`)
        if (!res.ok) throw new Error('Error al obtener pacientes')
        return res.json()
    },

    obtenerCubiculos: async (): Promise<CubiculoDTO[]> => {
        const res = await fetch(`${API_BASE_URL}/cubiculos`)
        if (!res.ok) throw new Error('Error al obtener cubículos')
        return res.json()
    },

    obtenerPsicologos: async (): Promise<PsicologoDTO[]> => {
        const res = await fetch(`${API_BASE_URL}/psicologos`)
        if (!res.ok) throw new Error('Error al obtener psicólogos')
        return res.json()
    }

}