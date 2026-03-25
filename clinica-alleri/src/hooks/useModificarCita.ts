import { useState, useEffect } from 'react'
import { catalogoService } from '../services/catalogoService'
import { citaService } from '../services/citaService.ts'
import type { PacienteDTO, PsicologoDTO, CubiculoDTO, CitaDTO } from '../types/alleri.types';

const idRecepcionistaLogueado = 1;
const nombreUsuarioLogueado = "recep1";

const HORARIOS_CUBICULOS = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

function getFechaHoy(): string {
    const ahora = new Date()
    return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
}

export const useModificarCita = (citaActual: CitaDTO, idCita: number, onClose: () => void) => {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([])
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([])
    const [cubiculos, setCubiculos] = useState<CubiculoDTO[]>([])

    const horaInicioOriginal = citaActual.fechaHoraInicio?.split('T')[1]?.substring(0, 5) || ''
    const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>(HORARIOS_CUBICULOS)

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
    const [errorPopup, setErrorPopup] = useState<string | null>(null)

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

    const recalcularHorarios = async (
        fechaActual: string,
        cubiculoActual: number | '',
        isCancelled: () => boolean = () => false
    ) => {
        if (!fechaActual) return

        let horasDisponiblesFiltradas = [...HORARIOS_CUBICULOS]

        const fechaHoy = getFechaHoy()
        if (fechaActual === fechaHoy) {
            const ahora = new Date()
            const horaAhora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
            horasDisponiblesFiltradas = horasDisponiblesFiltradas.filter(h => h > horaAhora)
        }

        if (cubiculoActual !== '') {
            try {
                const citasDia = await citaService.obtenerCitasPorDia(fechaActual)
                if (isCancelled()) return

                const citasCubiculo = citasDia.filter(c => c.cubiculo?.id === Number(cubiculoActual))
                const horasOcupadas = citasCubiculo
                    .map(c => c.fechaHoraInicio.split('T')[1].substring(0, 5))
                    .filter(h => h !== horaInicioOriginal) // excluye la hora propia de esta cita

                horasDisponiblesFiltradas = horasDisponiblesFiltradas.filter(hora => !horasOcupadas.includes(hora))
            } catch (error) {
                console.error("Error al actualizar horarios: ", error)
                return
            }
        }

        if (isCancelled()) return

        setHorariosDisponibles(horasDisponiblesFiltradas)

        const horaSeleccionadaSigueDisponible = horasDisponiblesFiltradas.includes(horaInicio)
        if (!horaSeleccionadaSigueDisponible) {
            if (horasDisponiblesFiltradas.length === 0) {
                setHoraInicio('')
                setHoraFin('')
            } else {
                const nuevaHora = horasDisponiblesFiltradas[0]
                setHoraInicio(nuevaHora)
                const [h, m] = nuevaHora.split(":").map(Number)
                setHoraFin(`${String((h + 1) % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
            }
        }
    }

    useEffect(() => {
        let cancelado = false
        recalcularHorarios(fecha, idCubiculo, () => cancelado)
        return () => { cancelado = true }
    }, [fecha, idCubiculo])

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
            setErrorPopup('Error al conectar con el servidor. Revisa la consola.');
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
        errores,
        horariosDisponibles, setHorariosDisponibles,
        errorPopup, setErrorPopup
    }
}