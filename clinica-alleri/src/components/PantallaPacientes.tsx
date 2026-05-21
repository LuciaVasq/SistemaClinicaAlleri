import { useEffect, useState } from 'react';
import '../styles/Admin.css';
import type { PacienteDTO, PsicologoDTO, EstadoDTO } from '../types/alleri.types';
import { catalogoService } from '../services/catalogoService';
import { Pencil } from 'lucide-react';
import { AnimatePresence } from "framer-motion";

type ModalTipo = 'registrar' | 'editar' | 'confirmToggle' | 'successToggle' | 'confirmEditar' | 'successEditar' | 'successRegistrar' | null;

const IconPlus = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const FORM_VACIO = { nombre: '', apellidoPaterno: '', apellidoMaterno: '', correo: '', telefono: '', psicologoId: '' };

export default function PantallaPacientes() {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [modal, setModal] = useState<ModalTipo>(null);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<PacienteDTO | null>(null);
    const [form, setForm] = useState(FORM_VACIO);
    const [errorPopup, setErrorPopup] = useState<string | null>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{10}$/;

    const validarFormulario = (
        form: {
            nombre: string;
            apellidoPaterno: string;
            correo: string;
            telefono: string;
        }
    ) => {

        if (!form.nombre.trim()) {
            setErrorPopup('El nombre es obligatorio');
            return false;
        }

        if (!form.apellidoPaterno.trim()) {
            setErrorPopup('El apellido paterno es obligatorio');
            return false;
        }

        if (!form.correo.trim()) {
            setErrorPopup('El correo es obligatorio');
            return false;
        }

        if (!emailRegex.test(form.correo)) {
            setErrorPopup('Ingresa un correo válido');
            return false;
        }

        if (!form.telefono.trim()) {
            setErrorPopup('El teléfono es obligatorio');
            return false;
        }

        if (!telefonoRegex.test(form.telefono)) {
            setErrorPopup('El teléfono debe tener exactamente 10 números');
            return false;
        }

        return true;
    };

    const cargarDatos = async () => {
        try {
            const [pacs, psicos] = await Promise.all([
                catalogoService.obtenerPacientes(),
                catalogoService.obtenerPsicologos()
            ]);
            setPacientes(pacs);
            // Solo psicólogos activos para el dropdown
            setPsicologos(psicos.filter(p => p.estado === 'ACTIVO'));
        } catch {
            setErrorPopup("Error de conexión al cargar datos");
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const pacientesFiltrados = pacientes.filter(p => {
        const nombre = `${p.nombre || ''} ${p.apellidoPaterno || ''} ${p.apellidoMaterno || ''}`.toLowerCase();
        return nombre.includes(busqueda.toLowerCase());
    });

    const abrirConfirmToggle = (pac: PacienteDTO) => {
        setPacienteSeleccionado(pac);
        setModal('confirmToggle');
    };

    const handleConfirmToggle = async () => {
        if (!pacienteSeleccionado) return;
        const nuevoEstado: EstadoDTO = pacienteSeleccionado.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        try {
            await catalogoService.actualizarPaciente(pacienteSeleccionado.id!, { ...pacienteSeleccionado, estado: nuevoEstado });
            setPacientes(pacientes.map(p => p.id === pacienteSeleccionado.id ? { ...p, estado: nuevoEstado } : p));
            setPacienteSeleccionado({ ...pacienteSeleccionado, estado: nuevoEstado });
            setModal('successToggle');
        } catch {
            setErrorPopup("No se pudo cambiar el estado.");
        }
    };

    const abrirRegistrar = () => {
        setForm(FORM_VACIO);
        setModal('registrar');
    };

    const handleRegistrar = async () => {
        const psico = psicologos.find(p => p.id === Number(form.psicologoId)) || null;
        if (!validarFormulario(form)) return;
        try {
            const nuevo = await catalogoService.crearPaciente({
                nombre: form.nombre,
                apellidoPaterno: form.apellidoPaterno,
                apellidoMaterno: form.apellidoMaterno,
                correo: form.correo,
                telefono: form.telefono,
                estado: 'ACTIVO',
                psicologo: psico
            } as PacienteDTO);
            setPacientes([...pacientes, nuevo]);
            setModal('successRegistrar');
        } catch {
            setErrorPopup("No se pudo registrar el paciente.");
        }
    };

    const abrirEditar = (pac: PacienteDTO) => {
        setPacienteSeleccionado(pac);
        setForm({
            nombre: pac.nombre || '',
            apellidoPaterno: pac.apellidoPaterno || '',
            apellidoMaterno: pac.apellidoMaterno || '',
            correo: pac.correo || '',
            telefono: pac.telefono || '',
            psicologoId: pac.psicologo?.id?.toString() || '',
        });
        setModal('editar');
    };

    const handleConfirmEditar = async () => {
        if (!pacienteSeleccionado) return;
        if (!validarFormulario(form)) return;
        const psico = psicologos.find(p => p.id === Number(form.psicologoId)) || pacienteSeleccionado.psicologo;
        const actualizado: PacienteDTO = {
            ...pacienteSeleccionado,
            nombre: form.nombre,
            apellidoPaterno: form.apellidoPaterno,
            apellidoMaterno: form.apellidoMaterno,
            correo: form.correo,
            telefono: form.telefono,
            psicologo: psico
        };
        try {
            await catalogoService.actualizarPaciente(pacienteSeleccionado.id!, actualizado);
            setPacientes(pacientes.map(p => p.id === pacienteSeleccionado.id ? actualizado : p));
            setModal('successEditar');
        } catch {
            setErrorPopup("No se pudo actualizar el paciente.");
        }
    };

    const cerrarModal = () => { setModal(null); setPacienteSeleccionado(null); };

    const nombreCompleto = (p: PacienteDTO | null) =>
        p ? `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}` : '';

    const psicologoNombre = (psico: PsicologoDTO | null | undefined) =>
        psico ? `${psico.nombre} ${psico.apellidoPaterno}` : 'Sin psicólogo';

    return (
        <div className="admin-exp-container">
            <div className="admin-exp-wrapper">

                <div className="admin-exp-header">
                    <h1>Administrar Pacientes</h1>
                    <button className="btn-add-exp" onClick={abrirRegistrar}><IconPlus /></button>
                </div>

                <div className="search-box-container">
                    <span className="search-icon"><SearchIcon /></span>
                    <input type="text" placeholder="Buscar..." value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} className="search-input" />
                </div>

                <div className="pacientes-list">
                    {pacientesFiltrados.map((pac) => (
                        <div key={pac.id} className="pac-card">
                            <div className="pac-card-left">
                                <span className={`status-dot ${pac.estado === 'ACTIVO' ? 'active' : 'inactive'}`}></span>
                                <div className="pac-info">
                                    <h3>{pac.nombre} {pac.apellidoPaterno} {pac.apellidoMaterno}</h3>
                                    <div className="pac-subtext">
                                        <p>{pac.correo || 'Sin correo'}</p>
                                        <p>{pac.telefono || 'Sin teléfono'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pac-card-actions">
                                <button className="action-btn" onClick={() => abrirEditar(pac)}>
                                    <Pencil size={18} strokeWidth={2} />
                                    Editar
                                </button>
                                <div className="switch-container" title={pac.estado === 'ACTIVO' ? "Desactivar" : "Activar"}>
                                    <label className="switch-label">
                                        <input type="checkbox" checked={pac.estado === 'ACTIVO'}
                                            onChange={() => abrirConfirmToggle(pac)} />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="switch-text">{pac.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modal === 'registrar' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={cerrarModal}><CloseIcon /></button>
                        <h2>Registrar Paciente</h2>
                        <div className="modal-form">
                            {(['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'telefono'] as const).map(campo => (
                                <div className="form-field-grid" key={campo}>
                                    <label>{labelCampo(campo)}</label>
                                    <input
                                        type={
                                            campo === 'correo'
                                                ? 'email'
                                                : campo === 'telefono'
                                                    ? 'tel'
                                                    : 'text'
                                        }
                                        maxLength={campo === 'telefono' ? 10 : 100}
                                        value={form[campo]}
                                        onChange={e => {

                                            let value = e.target.value;

                                            if (campo === 'telefono') {
                                                value = value.replace(/\D/g, '');
                                            }

                                            setForm({ ...form, [campo]: value });
                                        }}
                                    />
                                </div>
                            ))}
                            <div className="form-field-grid">
                                <label>Psicólogo</label>
                                <select value={form.psicologoId} onChange={e => setForm({ ...form, psicologoId: e.target.value })}
                                    className="form-select">
                                    <option value="">Sin asignar</option>
                                    {psicologos.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre} {p.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn secondary" onClick={cerrarModal}>Cancelar</button>
                            <button className="modal-btn primary" onClick={handleRegistrar}>Guardar</button>
                        </div>
                    </div>
                </div>
            )}

            {modal === 'editar' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={cerrarModal}><CloseIcon /></button>
                        <div className="modal-header-row">
                            <h2>Datos del Paciente</h2>
                            <button className="btn-desactivar" onClick={() => abrirConfirmToggle(pacienteSeleccionado!)}>
                                {pacienteSeleccionado?.estado === 'ACTIVO' ? 'Desactivar Paciente' : 'Activar Paciente'}
                            </button>
                        </div>
                        <div className="modal-form">
                            {(['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'telefono'] as const).map(campo => (
                                <div className="form-field-grid" key={campo}>
                                    <label>{labelCampo(campo)}</label>
                                    <input
                                        type={
                                            campo === 'correo'
                                                ? 'email'
                                                : campo === 'telefono'
                                                    ? 'tel'
                                                    : 'text'
                                        }
                                        maxLength={campo === 'telefono' ? 10 : 100}
                                        value={form[campo]}
                                        onChange={e => {

                                            let value = e.target.value;

                                            if (campo === 'telefono') {
                                                value = value.replace(/\D/g, '');
                                            }

                                            setForm({ ...form, [campo]: value });
                                        }}
                                    />
                                </div>
                            ))}
                            <div className="form-field-grid">
                                <label>Psicólogo</label>
                                <select value={form.psicologoId} onChange={e => setForm({ ...form, psicologoId: e.target.value })}
                                    className="form-select">
                                    <option value="">Sin asignar</option>
                                    {psicologos.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre} {p.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn secondary" onClick={cerrarModal}>Cancelar</button>
                            <button className="modal-btn primary" onClick={() => setModal('confirmEditar')}>Guardar</button>
                        </div>
                    </div>
                </div>
            )}

            {modal === 'confirmEditar' && (
                <div className="modal-overlay" onClick={() => setModal('editar')}>
                    <div className="modal-box-exp modal-confirm" onClick={e => e.stopPropagation()}>
                        <h2>¿Desea actualizar los datos del paciente?</h2>
                        <div className="confirm-info">
                            <p>{form.nombre} {form.apellidoPaterno} {form.apellidoMaterno}</p>
                            <p>{form.correo}</p>
                            <p>{form.telefono}</p>
                            <p>psicólogo: {psicologoNombre(psicologos.find(p => p.id === Number(form.psicologoId)))}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn secondary" onClick={() => setModal('editar')}>Cancelar cambios</button>
                            <button className="modal-btn primary" onClick={handleConfirmEditar}>Actualizar</button>
                        </div>
                    </div>
                </div>
            )}

            {modal === 'successEditar' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp modal-success" onClick={e => e.stopPropagation()}>
                        <h2>Los datos del paciente fueron actualizados correctamente.</h2>
                        <button className="modal-btn primary" onClick={cerrarModal}>Aceptar</button>
                    </div>
                </div>
            )}

            {modal === 'successRegistrar' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp modal-success" onClick={e => e.stopPropagation()}>
                        <h2>El Paciente ha sido registrado con éxito.</h2>
                        <button className="modal-btn primary" onClick={cerrarModal}>Aceptar</button>
                    </div>
                </div>
            )}

            {modal === 'confirmToggle' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp modal-confirm" onClick={e => e.stopPropagation()}>
                        <h2>¿Desea {pacienteSeleccionado?.estado === 'ACTIVO' ? 'desactivar' : 'activar'} al paciente?</h2>
                        <div className="confirm-info">
                            <p>{nombreCompleto(pacienteSeleccionado)}</p>
                            <p>{pacienteSeleccionado?.correo}</p>
                            <p>{pacienteSeleccionado?.telefono}</p>
                            <p>psicólogo: {psicologoNombre(pacienteSeleccionado?.psicologo)}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn confirm-cancel" onClick={cerrarModal}>Regresar</button>
                            <button className="modal-btn primary" onClick={handleConfirmToggle}>Continuar</button>
                        </div>
                    </div>
                </div>
            )}

            {modal === 'successToggle' && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-box-exp modal-success" onClick={e => e.stopPropagation()}>
                        <h2>El Paciente se ha {pacienteSeleccionado?.estado === 'ACTIVO' ? 'activado' : 'desactivado'}.</h2>
                        {pacienteSeleccionado?.estado === 'INACTIVO' && (
                            <p className="modal-subtext">Puede activar al paciente de nuevo en cualquier momento.</p>
                        )}
                        <button className="modal-btn primary" onClick={cerrarModal}>Aceptar</button>
                    </div>
                </div>
            )}
            <AnimatePresence>
                {errorPopup && (
                    <div className="pc-confirm-overlay" role="dialog" aria-modal>
                        <div className="pc-confirm-card">
                            <p className="pc-confirm-title">Aviso</p>

                            <p className="pc-confirm-body">
                                {errorPopup}
                            </p>

                            <button
                                className="pc-btn-accept"
                                onClick={() => setErrorPopup(null)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function labelCampo(campo: string): string {
    const labels: Record<string, string> = {
        nombre: 'Nombre(s)',
        apellidoPaterno: 'Apellido(s)',
        apellidoMaterno: '',
        correo: 'Correo electrónico',
        telefono: 'Teléfono',
    };
    return labels[campo] ?? campo;
}