import { useState, useEffect } from 'react'
import { catalogoService } from '../services/catalogoService'
import { citaService } from '../services/citaService'
import type { PacienteDTO, PsicologoDTO, CubiculoDTO, CitaDTO } from '../types/alleri.types';

const idRecepcionistaLogueado = 1; 
const nombreUsuarioLogueado = "recep1";

export const useProgramarCita = (onClose: () => void) => {
    // estados para los catalogos que vienen del back
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([])
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([])
    const [cubiculos, setCubiculos] = useState<CubiculoDTO[]>([])

    // estados para el formulario de registrar cita (campos que el usuario llena o elige)
    const [fecha, setFecha] = useState<string>('')
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
                    catalogoService.obtenerPacientes(),
                    catalogoService.obtenerPsicologos(),
                    catalogoService.obtenerCubiculos()
                ])

                setPacientes(dataPacientes)
                setPsicologos(dataPsicologos)
                setCubiculos(dataCubiculos)

            } catch (error) {
                console.error('Error al cargar los catálogos: ', error)
            }

        }

        cargarCatalogos()
    }, [])

    // guarda una nueva cita
    const agendar = async () => {
        // validar que no faltan datos
        if (!fecha || !idCubiculo || !idPsicologo || !idPaciente) {
            alert('Favor de llenar todos los campos.')
            return
        }
    

    setCargando(true)

    // armar DTO
    const nuevaCitaDTO: CitaDTO = {
        fechaHoraInicio: `${fecha}T${horaInicio}:00`,
        fechaHoraFin: `${fecha}T${horaFin}:00`,
        precio: 100.00,
        cubiculo: { id: Number(idCubiculo), nombre: '' },
        psicologo: { id: Number(idPsicologo) },
        paciente: { id: Number(idPaciente), psicologo: { id: Number(idPsicologo) } },
       recepcionista: {id:idRecepcionistaLogueado, usuario:nombreUsuarioLogueado}

    }

    try {
        // llamada al servicio
        await citaService.agendarCita(nuevaCitaDTO)
        setMostrarConfirmacion(true)
    } catch (error) {
        alert('Error al agendar cita');
    } finally {
        setCargando(false)
    }

}
    // props que los componentes necesitan
    return {
        // Datos
        pacientes, psicologos, cubiculos,
        // Variables de formulario
        fecha, setFecha,
        horaInicio, setHoraInicio, 
        horaFin, setHoraFin,
        idCubiculo, setIdCubiculo,
        idPsicologo, setIdPsicologo,
        idPaciente, setIdPaciente,
        // Variables de UI
        mostrarConfirmacion, setMostrarConfirmacion,
        cargando,
        // Funciones
        agendar
    }
}

