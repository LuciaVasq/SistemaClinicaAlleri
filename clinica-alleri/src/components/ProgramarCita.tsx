import { useState } from "react";
import { addLocale } from 'primereact/api';
import "../styles/ProgramarCita.css";
import "primereact/resources/primereact.min.css";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "primereact/calendar";

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

interface FormData {
    fecha: Date;
    horaInicio: string;
    cubiculo: string;
    psicologo: string;
    paciente: string;
}
interface ProgramarCitaProps {

    onClose: () => void;
    onSubmit?: (data: FormData) => void;
}

const HORAS = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];
const CUBICULOS = ["Cubículo 1", "Cubículo 2", "Cubículo 3", "Cubículo 4"];
const PSICOLOGOS = ["María", "Carlos", "Sofía", "Andrés"];
const PACIENTES = [
    "Marisol Ruiz Pacheco", "Juan Torres López",
    "Elena Vargas", "Roberto Hernández",
];


function addHour(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const next = (h + 1) % 24;
    return `${String(next).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}


function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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


export default function ProgramarCita({ onClose, onSubmit }: ProgramarCitaProps) {
    const [form, setForm] = useState<FormData>({
        fecha: new Date(),
        horaInicio: "15:00",
        cubiculo: "Cubículo 3",
        psicologo: "María",
        paciente: "Marisol Ruiz Pacheco",
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleAgendar = () => {
        onSubmit?.(form);
        setShowConfirm(true);
    };

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
                        <button className="pc-close-btn" onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Fecha con PrimeReact */}
                    <div className="pc-field">
                        <label className="pc-label">Día de la cita</label>
                        <Calendar
                            value={form.fecha}
                            onChange={(e) => setForm({ ...form, fecha: e.value as Date })}
                            dateFormat="dd 'de' MM 'de' yy"
                            locale="es"
                            showIcon
                            className="pc-calendar-custom"
                            readOnlyInput 
                        />
                    </div>

                    {/* Hora inicio / fin */}
                    <div className="pc-field">
                        <label className="pc-label">Hora de inicio</label>
                        <div className="pc-time-row">
                            <select
                                className="pc-time-select"
                                value={form.horaInicio}
                                onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
                            >
                                {HORAS.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                            <span className="pc-time-label">Hora fin</span>
                            <span className="pc-time-end">{addHour(form.horaInicio)}</span>
                        </div>
                    </div>

                    {/* Cubículo */}
                    <div className="pc-field">
                        <label className="pc-label">Cubículo</label>
                        <select
                            className="pc-select"
                            value={form.cubiculo}
                            onChange={(e) => setForm({ ...form, cubiculo: e.target.value })}
                        >
                            {CUBICULOS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Psicólogo */}
                    <div className="pc-field">
                        <label className="pc-label">Psicólogo</label>
                        <select
                            className="pc-select"
                            value={form.psicologo}
                            onChange={(e) => setForm({ ...form, psicologo: e.target.value })}
                        >
                            {PSICOLOGOS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {/* Paciente */}
                    <div className="pc-field">
                        <label className="pc-label">Paciente</label>
                        <select
                            className="pc-select"
                            value={form.paciente}
                            onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                        >
                            {PACIENTES.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {/* Total */}
                    <div className="pc-total-row">
                        <span className="pc-total-label">Total de Renta:</span>
                        <span className="pc-total-amount">$100</span>
                    </div>

                    {/* Submit */}
                    <button className="pc-btn-primary" onClick={handleAgendar}>
                        Agendar cita
                    </button>
                </motion.div>
            </div>

            <AnimatePresence>
                {showConfirm && (
                    <ConfirmPopup onAccept={() => { setShowConfirm(false); onClose(); }} />
                )}
            </AnimatePresence>
        </>
    );
}