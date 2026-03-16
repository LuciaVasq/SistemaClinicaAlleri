import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const fechaActual = "Sábado 14 de Marzo de 2026"
import "../styles/Citas.css"
import ProgramarCita from "./ProgramarCita";



// mocks de citas
const Mocks: Appointment[] = [
    {
        cubiculo: "Cubículo 1", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Marisol Ruiz Pacheco",
        horaInicio: "09:00", horaFin: "10:00", status: "Pagado", totalRenta: 100,
    },
    {
        cubiculo: "Cubículo 2", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Victoria Isabel Villalba Beltrán",
        horaInicio: "10:00", horaFin: "11:00", status: "Cancelado", totalRenta: 100,
    },
    {
        cubiculo: "Cubículo 3", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Marisol Ruiz Pacheco",
        horaInicio: "17:00", horaFin: "18:00", status: "Pendiente", totalRenta: 100,
    },
    {
        cubiculo: "Cubículo 1", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Marisol Ruiz Pacheco",
        horaInicio: "09:00", horaFin: "10:00", status: "Pagado", totalRenta: 100,
    },
    {
        cubiculo: "Cubículo 2", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Marisol Ruiz Pacheco",
        horaInicio: "10:00", horaFin: "11:00", status: "Cancelado", totalRenta: 100,
    },
    {
        cubiculo: "Cubículo 3", fecha: "14 de Febrero de 2026",
        psicologo: "María", paciente: "Marisol Ruiz Pacheco",
        horaInicio: "17:00", horaFin: "18:00", status: "Pendiente", totalRenta: 100,
    },
];

// estado de la cita
export type AppointmentStatus = "Pagado" | "Cancelado" | "Pendiente";

export interface Appointment {
    cubiculo: string;
    fecha: string;
    psicologo: string;
    paciente: string;
    horaInicio: string;
    horaFin: string;
    status: AppointmentStatus;
    totalRenta?: number;
}

//iconos
const IconArrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const IconClose = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const IconCalendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const IconClock = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
    </svg>
);

const IconPerson = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

// estado de la cita
const badgeClass: Record<AppointmentStatus, string> = {
    Pagado: "badge badge--pagado",
    Cancelado: "badge badge--cancelado",
    Pendiente: "badge badge--pendiente",
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
    return <span className={badgeClass[status]}>{status}</span>;
}

// popup de detalle
interface DetailPopupProps {
    apt: Appointment;
    onClose: () => void;
}

function DetailPopup({ apt, onClose }: DetailPopupProps) {
    return (
        <motion.div
            className="popup-overlay"
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div
                className="popup"
                key="popup"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <motion.button
                    className="popup__close"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    onClick={onClose}
                >
                    <IconClose />
                </motion.button>

                {/* Header */}
                <div className="popup__header">
                    <h2 className="popup__cubiculo">{apt.cubiculo}</h2>
                    <div className="popup__date">
                        <IconCalendar />
                        <span>{apt.fecha}</span>

                    </div>
                </div>

                {/* Body */}
                <div className="popup__body">
                    <aside className="popup-body-left">
                        <div className="popup__field">
                            <span className="popup__field-label">Psicólogo</span>
                            <span className="popup__field-value">
                                <span className="popup__field-icon"><IconPerson /></span>
                                {apt.psicologo}
                            </span>
                        </div>

                        <div className="popup__field">
                            <span className="popup__field-label">Paciente</span>
                            <span className="popup__field-value">
                                <span className="popup__field-icon"><IconPerson /></span>
                                {apt.paciente}
                            </span>
                        </div>


                    </aside>

                    <aside className="popup-body-right">



                        <div className="popup__field">
                            <span className="popup__field-label">Hora inicio</span>
                            <span className="popup__field-value-hour">
                                <span className="popup__field-icon"><IconClock /></span>
                                {apt.horaInicio}
                            </span>
                        </div>

                        <div className="popup__field">
                            <span className="popup__field-label">Hora fin</span>
                            <span className="popup__field-value-hour">
                                <span className="popup__field-icon"><IconClock /></span>
                                {apt.horaFin}
                            </span>
                        </div>
                    </aside>

                </div>

                {/* Total */}
                {apt.totalRenta !== undefined && (
                    <div className="popup__total">
                        <span className="popup__total-label">Total de renta</span>
                        <span className="popup__total-amount">${apt.totalRenta}</span>
                    </div>
                )}

                {/* Acciones */}
                <div className="popup__actions">
                    <motion.button
                        className="popup__btn popup__btn--cancel"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                    >
                        Cancelar cita
                    </motion.button>
                    <motion.button
                        className="popup__btn popup__btn--edit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Editar
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// card de cita
interface AppointmentCardProps {
    apt: Appointment;
}

export function CitaCard({ apt }: AppointmentCardProps) {
    const [open, setOpen] = useState<boolean>(false);
    const isCancelled = apt.status === "Cancelado";

    return (
        <>
            <motion.div
                className={`apt-card${isCancelled ? " apt-card--cancelled" : ""}`}
                whileHover={{ y: -4, boxShadow: "var(--alleri-card-shadow-hover)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                onClick={() => setOpen(true)}
            >
                {/* Header */}
                <div className="apt-card__header">
                    <h3 className="apt-card__title">{apt.cubiculo}</h3>
                    <motion.button
                        className="apt-card__arrow-btn"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                    >
                        <IconArrow />
                    </motion.button>
                </div>

                {/* Info */}
                <div className="apt-card__info">
                    <div className="apt-card__info-row">
                        <span className="apt-card__label">Psicólogo</span>
                        <p className="apt-card__value">{apt.psicologo}</p>
                    </div>
                    <div className="apt-card__info-row">
                        <span className="apt-card__label">Paciente</span>
                        <p className="apt-card__value">{apt.paciente}</p>
                    </div>
                </div>

                <hr className="apt-card__divider" />

                {/* Footer */}
                <div className="apt-card__footer">
                    <p className="apt-card__time">{apt.horaInicio} – {apt.horaFin}</p>
                    <StatusBadge status={apt.status} />
                </div>
            </motion.div>

            {/* Popup */}
            <AnimatePresence>
                {open && (
                    <DetailPopup apt={apt} onClose={() => setOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

export default function PantallaCitas() {
    const [showProgramar, setShowProgramar] = useState(false);
    return (
        <>
            <div className="citas-programadas-header">
                <article className="header">
                    <span>Citas Programadas</span>
                    <p>{fechaActual}</p>
                </article>

                <motion.button
                    onClick={() => setShowProgramar(true)}
                    className="btn-programar-cita"
                    whileHover={{ scale: 1.01 }}
                >
                    <p> Programar cita </p>
                </motion.button>
                <AnimatePresence>
                    {showProgramar && (
                        <ProgramarCita
                            onClose={() => setShowProgramar(false)}
                            onSubmit={(data) => console.log("Nueva cita:", data)}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="citas-programadas">
                {Mocks.map((cita, i) => (
                    <CitaCard key={i} apt={cita} />
                ))}
            </div>
        </>
    )
}

