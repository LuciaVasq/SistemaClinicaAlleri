import { useEffect, useState } from "react";
import { addLocale } from 'primereact/api';

import "../styles/ProgramarCita.css"; 
import "primereact/resources/primereact.min.css";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { useModificarCita } from "../hooks/useModificarCita";
import type { CitaDTO } from '../types/alleri.types';


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
        cargando,
        guardarCambios
    } = useModificarCita(citaActual, idCita, onClose);

    return (
        <>
            <div className="pc-overlay">
                <motion.div
                    className="pc-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {/* Header */}
                    <div className="pc-header">
                        <h2 className="pc-title">Modificar cita</h2>
                        <button className="pc-close-btn" onClick={onClose} disabled={cargando}>
                            <IconClose />
                        </button>
                    </div>

                    {/* Formulario a dos columnas (Igual a ProgramarCita) */}
                    <div className="pc-form-grid">
                        
                        {/* Fecha */}
                        <div className="pc-form-group">
                            <label className="pc-label">Fecha</label>
                            {/* Ajusta el Calendar según cómo lo manejes en tu hook (Date vs string) */}
                            <input 
                                type="date"
                                className="pc-input-date" 
                                value={fecha} 
                                onChange={(e) => setFecha(e.target.value)}
                                disabled={cargando}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        {/* Cubículo */}
                        <div className="pc-form-group">
                            <label className="pc-label">Cubículo</label>
                            <select
                                className="pc-input-select"
                                value={idCubiculo}
                                onChange={(e) => setIdCubiculo(e.target.value === "" ? "" : Number(e.target.value))}
                                disabled={cargando}
                            >
                                <option value="">Selecciona un cubículo...</option>
                                {cubiculos.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Hora Inicio */}
                        <div className="pc-form-group">
                            <label className="pc-label">Hora Inicio</label>
                            <input 
                                type="time"
                                className="pc-input-time"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                                disabled={cargando}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        {/* Psicólogo */}
                        <div className="pc-form-group">
                            <label className="pc-label">Psicólogo</label>
                            <select
                                className="pc-input-select"
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
                        </div>

                        {/* Hora Fin */}
                        <div className="pc-form-group">
                            <label className="pc-label">Hora Fin</label>
                            <input 
                                type="time"
                                className="pc-input-time"
                                value={horaFin}
                                onChange={(e) => setHoraFin(e.target.value)}
                                disabled={cargando}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        {/* Paciente */}
                        <div className="pc-form-group">
                            <label className="pc-label">Paciente</label>
                            <select
                                className="pc-input-select"
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
                    </div>

                    {/* Total */}
                    <div className="pc-total-row">
                        <span className="pc-total-label">Total de Renta:</span>
                        <span className="pc-total-amount">${citaActual.precio ? citaActual.precio.toFixed(2) : "100.00"}</span>
                    </div>

                    {/* Botones de Acción (Basados en tu imagen) */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button
                            onClick={onClose}
                            disabled={cargando}
                            style={{ 
                                padding: '10px 20px', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                backgroundColor: 'transparent', 
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            className="pc-btn-primary"
                            onClick={guardarCambios}
                            disabled={cargando}
                            style={{ width: 'auto', padding: '10px 20px' }}
                        >
                            {cargando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Popup de Confirmación */}
            <AnimatePresence>
                {mostrarConfirmacion && (
                    <div className="pc-overlay" style={{ zIndex: 1000 }}>
                         {/* Si tienes un componente ConfirmPopup úsalo aquí. 
                             Si no, este es un reemplazo rápido para que no te de error */}
                        <motion.div className="pc-modal" style={{ textAlign: 'center', padding: '2rem' }}>
                            <h3>¡Cita modificada con éxito!</h3>
                            <button className="pc-btn-primary" onClick={() => {
                                setMostrarConfirmacion(false);
                                onClose();
                            }}>Aceptar</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}