import { AnimatePresence, motion } from "framer-motion";
import "../styles/ProgramarCita.css";
import "primereact/resources/primereact.min.css";
import { useModificarCita } from "../hooks/useModificarCita";
import type { CitaDTO } from '../types/alleri.types';
import ConfirmPopup from "./ConfirmPopup";
import { Calendar } from "primereact/calendar";

interface Props {
    citaActual: CitaDTO;
    idCita: number;
    onClose: () => void;
}

const IconClose = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

function addHour(time: string): string {
    if (!time) return "--:--";
    const [h, m] = time.split(":").map(Number)
    const next = (h + 1) % 24
    return `${String(next).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}


export default function ModificarCita({ citaActual, idCita, onClose }: Props) {
    const {
        pacientes, psicologos, cubiculos,
        fecha, setFecha,
        horaInicio, setHoraInicio,
        horaFin, setHoraFin,
        idCubiculo, setIdCubiculo,
        idPsicologo, setIdPsicologo,
        idPaciente, setIdPaciente,
        mostrarConfirmacion, setMostrarConfirmacion,
        cargando, guardarCambios,
        errores,
        horariosDisponibles,
        errorPopup, setErrorPopup
    } = useModificarCita(citaActual, idCita, onClose);

    // Manejador idéntico al de ProgramarCita para calcular la hora de fin
    const handleHoraInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevaHoraInicio = e.target.value;
        setHoraInicio(nuevaHoraInicio);
        setHoraFin(addHour(nuevaHoraInicio));
    };

    const fechaDate = fecha ? new Date(fecha + 'T00:00:00') : null;

    const handleFechaChange = (e: any) => {
        if (e.value) {
            // Extraemos año, mes y día del objeto Date de PrimeReact
            const year = e.value.getFullYear();
            const month = String(e.value.getMonth() + 1).padStart(2, '0');
            const day = String(e.value.getDate()).padStart(2, '0');

            // Lo guardamos como string "YYYY-MM-DD" para tu hook
            setFecha(`${year}-${month}-${day}`);
        } else {
            setFecha(''); // Por si borran la fecha
        }
    };

    return (
        <>
            <div className="pc-overlay">
                <motion.div
                    className="pc-form-card"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div className="pc-header">
                        <h2 className="pc-title">Modificar cita</h2>
                        <button className="pc-close-btn" onClick={onClose} disabled={cargando}>
                            <IconClose />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                        {/* Fecha */}
                        <div className="pc-field">
                            <label className="pc-label">Fecha</label>
                            <div style={{ width: '100%' }}>
                                <Calendar
                                    value={fechaDate}
                                    onChange={handleFechaChange}
                                    dateFormat="dd 'de' MM 'de' yy"
                                    locale="es"
                                    showIcon
                                    className={`pc-calendar-custom ${errores.fecha ? 'p-invalid' : ''}`}
                                    readOnlyInput
                                    disabled={cargando}
                                    style={{ width: '100%' }}
                                />
                                {errores.fecha && <span className="pc-error-text">{errores.fecha}</span>}
                            </div>
                        </div>

                        {/* Hora inicio / fin adaptada */}
                        <div className="pc-field">
                            <label className="pc-label">Hora de inicio</label>
                            <div style={{ width: '100%' }}>
                                <div className="pc-time-row">
                                    <select
                                        className={`pc-time-select ${errores.horaInicio ? 'pc-input-error' : ''}`}
                                        value={horaInicio}
                                        onChange={handleHoraInicioChange}
                                        disabled={cargando}
                                    >
                                        <option value="">Selecciona...</option>
                                        {horariosDisponibles.map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                    <span className="pc-label" style={{ marginLeft: '10px' }}>Hora fin</span>
                                    <span className="pc-time-end">{horaFin || '--:--'}</span>
                                </div>
                                {errores.horaInicio && <span className="pc-error-text">{errores.horaInicio}</span>}
                            </div>
                        </div>

                        {/* Cubículo */}
                        <div className="pc-field">
                            <label className="pc-label">Cubículo</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    className={`pc-select ${errores.idCubiculo ? 'pc-input-error' : ''}`}
                                    value={idCubiculo}
                                    onChange={(e) => setIdCubiculo(e.target.value === "" ? "" : Number(e.target.value))}
                                    disabled={cargando}
                                >
                                    <option value="">Selecciona un cubículo...</option>
                                    {cubiculos.map((c) => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))}
                                </select>
                                {errores.idCubiculo && <span className="pc-error-text">{errores.idCubiculo}</span>}
                            </div>
                        </div>

                        {/* Psicólogo */}
                        <div className="pc-field">
                            <label className="pc-label">Psicólogo</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    className={`pc-select ${errores.idPsicologo ? 'pc-input-error' : ''}`}
                                    value={idPsicologo}
                                    onChange={(e) => setIdPsicologo(e.target.value === "" ? "" : Number(e.target.value))}
                                    disabled={cargando}
                                >
                                    <option value="">Selecciona un psicólogo...</option>
                                    {psicologos.map((psi) => (
                                        <option key={psi.id} value={psi.id}>
                                            {psi.nombre} {psi.apellidoPaterno}
                                        </option>
                                    ))}
                                </select>
                                {errores.idPsicologo && <span className="pc-error-text">{errores.idPsicologo}</span>}
                            </div>
                        </div>

                        {/* Paciente */}
                        <div className="pc-field">
                            <label className="pc-label">Paciente</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    className={`pc-select ${errores.idPaciente ? 'pc-input-error' : ''}`}
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
                                {errores.idPaciente && <span className="pc-error-text">{errores.idPaciente}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="pc-total-row" style={{ marginTop: '20px' }}>
                        <span className="pc-total-label">Total de Renta:</span>
                        <span className="pc-total-amount">${citaActual.precio ? citaActual.precio.toFixed(2) : "100.00"}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            onClick={onClose}
                            disabled={cargando}
                            style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '1px solid #ccc', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Cancelar
                        </button>
                        <button
                            className="pc-btn-primary"
                            onClick={guardarCambios}
                            disabled={cargando}
                            style={{ flex: 1 }}
                        >
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
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
            <AnimatePresence>
                {errorPopup && (
                    <div className="pc-confirm-overlay" role="dialog" aria-modal>
                        <div className="pc-confirm-card">
                            <p className="pc-confirm-title">Aviso</p>
                            <p className="pc-confirm-body">{errorPopup}</p>
                            <button className="pc-btn-accept" onClick={() => setErrorPopup(null)}>
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}