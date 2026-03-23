import { useState, useEffect } from 'react'
import { catalogoService } from '../services/catalogoService'
import { citaService } from '../services/citaService.ts'
import type { PacienteDTO, PsicologoDTO, CubiculoDTO, CitaDTO } from '../types/alleri.types';

const idRecepcionistaLogueado = 1; 
const nombreUsuarioLogueado = "recep1";

export const useModificarCita = (citaActual: CitaDTO, idCita: number, onClose: () => void) => {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([])
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([])
    const [cubiculos, setCubiculos] = useState<CubiculoDTO[]>([])

    const [fecha, setFecha] = useState<string>(citaActual.fechaHoraInicio?.split('T')[0] || '')
    const [horaInicio, setHoraInicio] = useState<string>(citaActual.fechaHoraInicio?.split('T')[1]?.substring(0, 5) || '')
    const [horaFin, setHoraFin] = useState<string>(citaActual.fechaHoraFin?.split('T')[1]?.substring(0, 5) || '')
    const [idCubiculo, setIdCubiculo] = useState<number | ''>(citaActual.cubiculo?.id || '')
    const [idPsicologo, setIdPsicologo] = useState<number | ''>(citaActual.psicologo?.id || '')
    const [idPaciente, setIdPaciente] = useState<number | ''>(citaActual.paciente?.id || '')

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
    const [cargando, setCargando] = useState(false)
    
    // NUEVO: Estado para manejar los errores visuales
    const [errores, setErrores] = useState<Record<string, string>>({})

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

    // NUEVO: Función validadora
    const validarFormulario = () => {
        const nuevosErrores: Record<string, string> = {}

        if (!fecha) nuevosErrores.fecha = "Selecciona una fecha"
        if (!horaInicio) nuevosErrores.horaInicio = "Falta la hora"
        if (!horaFin) nuevosErrores.horaFin = "Falta la hora"
        if (!idCubiculo) nuevosErrores.idCubiculo = "Selecciona un cubículo"
        if (!idPsicologo) nuevosErrores.idPsicologo = "Selecciona un psicólogo"
        if (!idPaciente) nuevosErrores.idPaciente = "Selecciona un paciente"

        // Validación extra: La hora de fin debe ser después de la hora de inicio
        if (horaInicio && horaFin && horaInicio >= horaFin) {
            nuevosErrores.horaFin = "La hora fin debe ser mayor"
        }

        setErrores(nuevosErrores)
        // Retorna true si no hay errores (el objeto está vacío)
        return Object.keys(nuevosErrores).length === 0
    }

    const guardarCambios = async () => {
        // Ejecutamos la validación ANTES de hacer nada
        if (!validarFormulario()) {
            return; // Detenemos el guardado si hay errores
        }

        setCargando(true)

        const citaModificadaDTO: CitaDTO = {
            fechaHoraInicio: `${fecha}T${horaInicio}:00`,
            fechaHoraFin: `${fecha}T${horaFin}:00`,
            precio: citaActual.precio || 100.00, 
            cubiculo: { id: Number(idCubiculo), nombre: '' },
            psicologo: { id: Number(idPsicologo) },
            paciente: { id: Number(idPaciente), psicologo: { id: Number(idPsicologo) } },
            recepcionista: { id: idRecepcionistaLogueado, usuario: nombreUsuarioLogueado }
        }

        try {
            await citaService.modificarCita(idCita, citaModificadaDTO)
            setMostrarConfirmacion(true)
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor. Revisa la consola.');
        } finally {
            setCargando(false)
        }
    }

    return {
        pacientes, psicologos, cubiculos,
        fecha, setFecha, horaInicio, setHoraInicio, horaFin, setHoraFin,
        idCubiculo, setIdCubiculo, idPsicologo, setIdPsicologo, idPaciente, setIdPaciente,
        mostrarConfirmacion, setMostrarConfirmacion, cargando,
        guardarCambios,
        errores 
        
    }
}