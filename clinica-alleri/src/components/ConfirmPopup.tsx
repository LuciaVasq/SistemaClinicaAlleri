import { motion } from "framer-motion";
import "../styles/ConfirmPopup.css"; 

interface ConfirmPopupProps {
    onAccept: () => void;
}

export default function ConfirmPopup({ onAccept }: ConfirmPopupProps) {
    return (
        <div className="pc-confirm-overlay">
            <motion.div
                className="pc-confirm-card"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Ícono en blanco para que resalte sobre el fondo magenta */}
                <div className="pc-confirm-icon">
                    <i className="pi pi-check-circle" style={{ fontSize: '4rem', color: 'var(--alleri-white, #fff)' }}></i>
                </div>
                
                <h2 className="pc-confirm-title">¡Éxito!</h2>
                <p className="pc-confirm-body">La cita ha sido agendada correctamente.</p>
                
                <button className="pc-btn-accept" onClick={onAccept}>
                    Aceptar
                </button>
            </motion.div>
        </div>
    );
}