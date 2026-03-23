// NUEVO ARCHIVO: src/hooks/useModificarCita.ts
import { useState, useEffect } from 'react'
import { catalogoService } from '../services/catalogoService'
import { citaService } from '../services/citaService'
import type { PacienteDTO, PsicologoDTO, CubiculoDTO, CitaDTO } from '../types/alleri.types';

const idRecepcionistaLogueado = 1; 
const nombreUsuarioLogueado = "recep1";

// Recibimos la cita actual y su ID como parámetros
export const useModificarCita = (citaActual: CitaDTO, idCita: number, onClose: () => void) => {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([])
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([])
    const [cubiculos, setCubiculos] = useState<CubiculoDTO[]>([])

    // Precargamos los datos dividiendo la fecha y la hora que viene del backend
    const [fecha, setFecha] = useState<string>(citaActual.fechaHoraInicio.split('T')[0] || '')
    const [horaInicio, setHoraInicio] = useState<string>(citaActual.fechaHoraInicio.split('T')[1]?.substring(0, 5) || '9:00')
    const [horaFin, setHoraFin] = useState<string>(citaActual.fechaHoraFin.split('T')[1]?.substring(0, 5) || '10:00')
    const [idCubiculo, setIdCubiculo] = useState<number | ''>(citaActual.cubiculo.id || '')
    const [idPsicologo, setIdPsicologo] = useState<number | ''>(citaActual.psicologo.id || '')
    const [idPaciente, setIdPaciente] = useState<number | ''>(citaActual.paciente.id || '')

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                const [dataPacientes, dataPsicologos, dataCubiculos] = await Promise.all([
                    catalogoService.obtenerPacientes(),
                    catalogoService.obtenerPsicologos(),
                    catalogoService.obtenerCubiculos()
                ])
                setPacientes(dataPacientes)
                setPsicologos(dataPsicologos)
                setCubiculos(dataCubiculos)
            } catch (error) {
                console.error('Error al cargar catálogos: ', error)
            }
        }
        cargarCatalogos()
    }, [])

    const guardarCambios = async () => {
        if (!fecha || !idCubiculo || !idPsicologo || !idPaciente) {
            alert('Favor de llenar todos los campos.')
            return
        }

        setCargando(true)

        const citaModificadaDTO: CitaDTO = {
            fechaHoraInicio: `${fecha}T${horaInicio}:00`,
            fechaHoraFin: `${fecha}T${horaFin}:00`,
            precio: citaActual.precio, 
            cubiculo: { id: Number(idCubiculo), nombre: '' },
            psicologo: { id: Number(idPsicologo) },
            paciente: { id: Number(idPaciente), psicologo: { id: Number(idPsicologo) } },
            recepcionista: { id: idRecepcionistaLogueado, usuario: nombreUsuarioLogueado }
        }

        try {
            await citaService.modificarCita(idCita, citaModificadaDTO)
            setMostrarConfirmacion(true)
        } catch (error) {
            alert('Error al actualizar la cita');
        } finally {
            setCargando(false)
        }
    }

    return {
        pacientes, psicologos, cubiculos,
        fecha, setFecha, horaInicio, setHoraInicio, horaFin, setHoraFin,
        idCubiculo, setIdCubiculo, idPsicologo, setIdPsicologo, idPaciente, setIdPaciente,
        mostrarConfirmacion, setMostrarConfirmacion, cargando,
        guardarCambios
    }
}