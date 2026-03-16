import { useEffect, useState } from "react";
import { addLocale } from 'primereact/api';
import "../styles/ProgramarCita.css";
import "primereact/resources/primereact.min.css";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { useProgramarCita } from "../hooks/useProgramarCita";

const IconClose = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Cctubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar'
})

interface ProgramarCitaProps {
    onClose: () => void
}

const HORAS = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
]

function addHour(time: string): string {
    const [h, m] = time.split(":").map(Number)
    const next = (h + 1) % 24
    return `${String(next).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function ConfirmPopup({ onAccept }: { onAccept: () => void }) {
    return (
        <div className="pc-confirm-overlay" role="dialog" aria-modal aria-labelledby="confirm-title">
            <div className="pc-confirm-card">
                <p id="confirm-title" className="pc-confirm-title">
                    La cita se ha agregado a la agenda correctamente.
                </p>
                <p className="pc-confirm-body">
                    El psicólogo y el paciente han recibido un mensaje de confirmación.
                </p>
                <button className="pc-btn-accept" onClick={onAccept}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default function ProgramarCita({ onClose }: ProgramarCitaProps) {

    const {
        pacientes, psicologos, cubiculos,
        fecha, setFecha,
        horaInicio, setHoraInicio,
        horaFin, setHoraFin,
        idCubiculo, setIdCubiculo,
        idPsicologo, setIdPsicologo,
        idPaciente, setIdPaciente,
        mostrarConfirmacion, setMostrarConfirmacion,
        cargando,
        agendar
    } = useProgramarCita(onClose)


    const handleFechaChange = (e: any) => {
        if (e.value) {
            const d = e.value as Date
            const yyyy = d.getFullYear()
            const mm = String(d.getMonth() + 1).padStart(2, '0')
            const dd = String(d.getDate()).padStart(2, '0')
            setFecha(`${yyyy}-${mm}-${dd}`)
        }
    }
    const fechaCalendario = fecha ? new Date(fecha + "T00:00:00") : null

    const handleHoraInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevaHoraInicio = e.target.value
        setHoraInicio(nuevaHoraInicio)
        setHoraFin(addHour(nuevaHoraInicio))
    }

    useEffect(() => {
    if (!fecha) { 
        const hoy = new Date();
        const yyyy = hoy.getFullYear()
        const mm = String(hoy.getMonth() + 1).padStart(2, '0')
        const dd = String(hoy.getDate()).padStart(2, '0')
        setFecha(`${yyyy}-${mm}-${dd}`)
    }
}, [])

    return (
        <>
            <div className="pc-overlay">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="pc-form-card"
                >
                    {/* Header */}
                    <div className="pc-header">
                        <h2 className="pc-title">Programar cita</h2>
                        <motion.button className="popup__close" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.18 }} onClick={onClose}><IconClose /></motion.button>
                    </div>

                    {/* Fecha */}
                    <div className="pc-field">
                        <label className="pc-label">Día de la cita</label>
                        <Calendar
                            value={fechaCalendario}
                            onChange={handleFechaChange}
                            dateFormat="dd 'de' MM 'de' yy"
                            locale="es"
                            showIcon
                            className="pc-calendar-custom"
                            readOnlyInput
                            disabled={cargando}
                        />
                    </div>

                    {/* Hora inicio / fin */}
                    <div className="pc-field">
                        <label className="pc-label">Hora de inicio</label>
                        <div className="pc-time-row">
                            <select
                                className="pc-time-select"
                                value={horaInicio}
                                onChange={handleHoraInicioChange}
                                disabled={cargando}
                            >
                                {HORAS.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                            <span className="pc-label">Hora fin</span>
                            <span className="pc-time-end">{horaFin}</span>
                        </div>
                    </div>

                    {/* Cubículo (LLENADO DESDE SPRING BOOT) */}
                    <div className="pc-field">
                        <label className="pc-label">Cubículo</label>
                        <select
                            className="pc-select"
                            value={idCubiculo}                         
                            onChange={(e) => setIdCubiculo(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={cargando}
                        >
                            <option value="">Selecciona un cubículo...</option>
                            {cubiculos.map((c) => (
                                <option key={c.id} value={c.id}>Cubículo {c.id}</option>
                            ))}
                        </select>
                    </div>

                    {/* Psicólogo (LLENADO DESDE SPRING BOOT) */}
                    <div className="pc-field">
                        <label className="pc-label">Psicólogo</label>
                        <select
                            className="pc-select"
                            value={idPsicologo}                          
                            onChange={(e) => setIdPsicologo(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={cargando}
                        >
                            <option value="">Selecciona un psicólogo...</option>
                            {psicologos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} {p.apellidoPaterno}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Paciente (LLENADO DESDE SPRING BOOT) */}
                    <div className="pc-field">
                        <label className="pc-label">Paciente</label>
                        <select
                            className="pc-select"
                            value={idPaciente}
                            onChange={(e) => setIdPaciente(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={cargando}
                        >
                            <option value="">Selecciona un paciente...</option>
                            {pacientes.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} {p.apellidoPaterno}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Total */}
                    <div className="pc-total-row">
                        <span className="pc-total-label">Total de Renta:</span>
                        <span className="pc-total-amount">$100.00</span>
                    </div>

                    {/* Submit */}
                    <button
                        className="pc-btn-primary"
                        onClick={agendar}
                        disabled={cargando}
                    >
                        {cargando ? 'Agendando...' : 'Agendar cita'}
                    </button>
                </motion.div>
            </div>

            <AnimatePresence>
                {mostrarConfirmacion && (
                    <ConfirmPopup onAccept={() => {
                        setMostrarConfirmacion(false);
                        onClose();
                    }} />
                )}
            </AnimatePresence>
        </>
    );
}