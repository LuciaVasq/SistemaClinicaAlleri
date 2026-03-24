import { motion } from "framer-motion";
import "../styles/ConfirmPopup.css";

interface ConfirmDeletePopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDeletePopup({ onConfirm, onCancel }: ConfirmDeletePopupProps) {
    return (
        <div className="pc-confirm-overlay" onClick={onCancel}>
            <motion.div
                className="pc-confirm-card"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pc-confirm-icon">
                    <i
                        className="pi pi-exclamation-triangle"
                        style={{ fontSize: '4rem', color: 'var(--alleri-white, #fff)' }}
                    ></i>
                </div>

                <h2 className="pc-confirm-title">Cancelar cita</h2>
                <p className="pc-confirm-body">
                    ¿Seguro que deseas cancelar esta cita?
                </p>

                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button className="pc-btn-cancel" onClick={onCancel}>
                        No
                    </button>

                    <button className="pc-btn-accept" onClick={onConfirm}>
                        Cancelar
                    </button>
                </div>
            </motion.div>
        </div>
    );
}