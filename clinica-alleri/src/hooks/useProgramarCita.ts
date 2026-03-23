import { useState, useEffect, useRef } from 'react'
import { catalogoService } from '../services/catalogoService'
import { citaService } from '../services/citaService.ts'
import type { PacienteDTO, PsicologoDTO, CubiculoDTO, CitaDTO } from '../types/alleri.types';

// MOCK: LUEGO ACTUALIZAR CON USUARIO E ID LOGGEADOS EN EL SISTEMA 
const idRecepcionistaLogueado = 1;
const nombreUsuarioLogueado = "recep1";

// horarios disponibles para cada cubículo ( al agendar una cita se elimina, y al cambiar de fecha se reestablecen)
const HORARIOS_CUBICULOS = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

function getFechaHoy(): string {
    const ahora = new Date()
    return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
}


export const useProgramarCita = (onClose: () => void, fechaInicial?: string) => {

    // estados para los catalogos que vienen del back
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([])
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([])
    const [cubiculos, setCubiculos] = useState<CubiculoDTO[]>([])

    // estado para manejar la disponibilidad de horario de cada cubículo
    const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>(HORARIOS_CUBICULOS)

    // estados para el formulario de registrar cita (campos que el usuario llena o elige)
    const [fecha, setFecha] = useState<string>(fechaInicial ?? getFechaHoy())
    const [horaInicio, setHoraInicio] = useState<string>('9:00')
    const [horaFin, setHoraFin] = useState<string>('10:00')
    const [idCubiculo, setIdCubiculo] = useState<number | ''>('')
    const [idPsicologo, setIdPsicologo] = useState<number | ''>('')
    const [idPaciente, setIdPaciente] = useState<number | ''>('')

    // estados para mostrar popups
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
    const [cargando, setCargando] = useState(false)


    // recupera los datos del back al abrir el formulario de registro de cita
    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                const [dataPacientes, dataPsicologos, dataCubiculos] = await Promise.all([
                    catalogoService.obtenerPacientes(), // obtiene pacientes
                    catalogoService.obtenerPsicologos(), // obtiene psicologos
                    catalogoService.obtenerCubiculos() // obtiene cubiculos
                ])

                // actualiza estados para que el formulario pueda leerlos
                setPacientes(dataPacientes)
                setPsicologos(dataPsicologos)
                setCubiculos(dataCubiculos)

            } catch (error) {
                console.error('Error al cargar los catálogos: ', error)
            }

        }

        cargarCatalogos()
    }, []) // obtiene los datos solamente cuando renderiza el formulario de registro



    const recalcularHorarios = async (
        fechaActual: string,
        cubiculoActual: number | '',
        isCancelled: () => boolean = () => false
    ) => {
        if (!fechaActual) return

        let horasDisponiblesFiltradas = [...HORARIOS_CUBICULOS]

        // Solo filtra horas pasadas si la fecha es HOY
        const fechaHoy = getFechaHoy()
        if (fechaActual === fechaHoy) {
            const ahora = new Date()
            const horaAhora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
            horasDisponiblesFiltradas = horasDisponiblesFiltradas.filter(h => h > horaAhora)
        }

        // Filtra horas ocupadas del cubículo
        if (cubiculoActual !== '') {
            try {
                const citasDia = await citaService.obtenerCitasPorDia(fechaActual)
                if (isCancelled()) return
                const citasCubiculo = citasDia.filter(c => c.cubiculo?.id === Number(cubiculoActual))
                const horasOcupadas = citasCubiculo.map(c => c.fechaHoraInicio.split('T')[1].substring(0, 5))
                horasDisponiblesFiltradas = horasDisponiblesFiltradas.filter(hora => !horasOcupadas.includes(hora))
            } catch (error) {
                console.error("Error al actualizar horarios: ", error)
                return
            }
        }

        if (isCancelled()) return

        setHorariosDisponibles(horasDisponiblesFiltradas)

        // Siempre pone la primera hora disponible al recalcular
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

    useEffect(() => {
        let cancelado = false
        recalcularHorarios(fecha, idCubiculo, () => cancelado)
        return () => { cancelado = true }
    }, [fecha, idCubiculo])

    const agendar = async () => {
        if (!fecha || !idCubiculo || !idPsicologo || !idPaciente || !horaInicio) {
            alert('Favor de llenar todos los campos.')
            return
        }
        setCargando(true)

        try {
            const citasDia = await citaService.obtenerCitasPorDia(fecha)
            const citasCubiculo = citasDia.filter(c => c.cubiculo?.id === Number(idCubiculo))
            const horasOcupadas = citasCubiculo.map(c => c.fechaHoraInicio.split('T')[1].substring(0, 5))

            if (horasOcupadas.includes(horaInicio)) {
                alert('Ese horario ya fue ocupado en este cubículo. Por favor, selecciona otra hora.')
                setHorariosDisponibles(prev => prev.filter(h => h !== horaInicio))
                setHoraInicio('')
                setHoraFin('')
                setCargando(false)
                return
            }

            const nuevaCitaDTO: CitaDTO = {
                fechaHoraInicio: `${fecha}T${horaInicio}:00`,
                fechaHoraFin: `${fecha}T${horaFin}:00`,
                precio: 100.00,
                cubiculo: { id: Number(idCubiculo), nombre: '' },
                psicologo: { id: Number(idPsicologo) },
                paciente: { id: Number(idPaciente), psicologo: { id: Number(idPsicologo) } },
                recepcionista: { id: idRecepcionistaLogueado, usuario: nombreUsuarioLogueado }
            }

            await citaService.agendarCita(nuevaCitaDTO)
            await recalcularHorarios(fecha, idCubiculo)
            setMostrarConfirmacion(true)
        } catch (error) {
            alert('Error al agendar cita')
        } finally {
            setCargando(false)
        }
    }
    // props que los componentes necesitan
    return {
        // listas de DTOs
        pacientes, psicologos, cubiculos,
        // Variables de formulario y setters
        fecha, setFecha,
        horaInicio, setHoraInicio,
        horaFin, setHoraFin,
        idCubiculo, setIdCubiculo,
        idPsicologo, setIdPsicologo,
        idPaciente, setIdPaciente,
        // estados para mostrar componentes / popups
        mostrarConfirmacion, setMostrarConfirmacion,
        cargando,
        // Funciones que llaman al back
        agendar,
        //Estados de horarios
        horariosDisponibles, setHorariosDisponibles

    }
}

