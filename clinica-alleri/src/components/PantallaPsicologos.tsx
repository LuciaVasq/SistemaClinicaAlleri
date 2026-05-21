import { useEffect, useState } from 'react';
import '../styles/Admin.css';
import type { PsicologoDTO, EstadoDTO } from '../types/alleri.types';
import { catalogoService } from '../services/catalogoService';
import { Pencil } from 'lucide-react';
import { Wallet } from 'lucide-react';
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

const FORM_VACIO = { nombre: '', apellidoPaterno: '', apellidoMaterno: '', correo: '', telefono: '' };

export default function PantallaPsicologos() {
  const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState<ModalTipo>(null);
  const [psicoSeleccionado, setPsicoSeleccionado] = useState<PsicologoDTO | null>(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoRegex = /^[0-9]{10}$/;

  const validarFormulario = (form: {
    nombre: string;
    apellidoPaterno: string;
    correo: string;
    telefono: string;
  }) => {
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
      setErrorPopup('El teléfono debe tener 10 números');
      return false;
    }
    return true;
  };

  const cargarPsicologos = async () => {
    try {
      const data = await catalogoService.obtenerPsicologos();
      setPsicologos(data);
    } catch (error) {
      setErrorPopup("Error de conexión al cargar la lista de psicólogos");
    }
  };

  useEffect(() => { cargarPsicologos(); }, []);

  const psicologosFiltrados = psicologos.filter(p => {
    const nombre = `${p.nombre || ''} ${p.apellidoPaterno || ''} ${p.apellidoMaterno || ''}`.toLowerCase();
    return nombre.includes(busqueda.toLowerCase());
  });

  const abrirConfirmToggle = (psico: PsicologoDTO) => {
    setPsicoSeleccionado(psico);
    setModal('confirmToggle');
  };

  const handleConfirmToggle = async () => {
    if (!psicoSeleccionado) return;
    const nuevoEstado: EstadoDTO = psicoSeleccionado.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    try {
      await catalogoService.actualizarPsicologo(psicoSeleccionado.id!, { ...psicoSeleccionado, estado: nuevoEstado });
      setPsicologos(psicologos.map(p => p.id === psicoSeleccionado.id ? { ...p, estado: nuevoEstado } : p));
      setPsicoSeleccionado({ ...psicoSeleccionado, estado: nuevoEstado });
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
    if (!validarFormulario(form)) return;
    try {
      const nuevo = await catalogoService.crearPsicologo({ ...form, estado: 'ACTIVO' } as PsicologoDTO);
      setPsicologos([...psicologos, nuevo]);
      setModal('successRegistrar');
    } catch {
      setErrorPopup("No se pudo registrar el psicólogo.");
    }
  };

  const abrirEditar = (psico: PsicologoDTO) => {
    setPsicoSeleccionado(psico);
    setForm({
      nombre: psico.nombre || '',
      apellidoPaterno: psico.apellidoPaterno || '',
      apellidoMaterno: psico.apellidoMaterno || '',
      correo: psico.correo || '',
      telefono: psico.telefono || '',
    });
    setModal('editar');
  };

  const abrirConfirmEditar = () => setModal('confirmEditar');

  const handleConfirmEditar = async () => {
    if (!psicoSeleccionado) return;
    if (!validarFormulario(form)) return;
    const actualizado: PsicologoDTO = { ...psicoSeleccionado, ...form };
    try {
      await catalogoService.actualizarPsicologo(psicoSeleccionado.id!, actualizado);
      setPsicologos(psicologos.map(p => p.id === psicoSeleccionado.id ? actualizado : p));
      setModal('successEditar');
    } catch {
      setErrorPopup("No se pudo actualizar el psicólogo.");
    }
  };

  const cerrarModal = () => { setModal(null); setPsicoSeleccionado(null); };

  const nombreCompleto = (p: PsicologoDTO | null) =>
    p ? `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}` : '';

  return (
    <div className="admin-psico-container">
      <div className="admin-psico-wrapper">

        <div className="admin-psico-header">
          <h1>Administrar Psicólogos</h1>
          <button className="btn-add-psico" onClick={abrirRegistrar}><IconPlus /></button>
        </div>

        <div className="search-box-container">
          <span className="search-icon"><SearchIcon /></span>
          <input type="text" placeholder="Buscar..." value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} className="search-input" />
        </div>

        <div className="psicologos-list">
          {psicologosFiltrados.map((psico) => (
            <div key={psico.id} className="psico-card">
              <div className="psico-card-left">
                <span className={`status-dot ${psico.estado === 'ACTIVO' ? 'active' : 'inactive'}`}></span>
                <div className="psico-info">
                  <h3>{psico.nombre} {psico.apellidoPaterno} {psico.apellidoMaterno}</h3>
                  <div className="psico-subtext">
                    <p>{psico.correo || 'Sin correo'}</p>
                    <p>{psico.telefono || 'Sin teléfono'}</p>
                  </div>
                </div>
              </div>
              <div className="psico-card-actions">
                <button className={`action-btn ${psico.adeudo ? 'con-adeudo' : ''}`}>
                  <Wallet size={18} strokeWidth={2} />
                  Adeudo
                </button>
                <button className="action-btn" onClick={() => abrirEditar(psico)}>
                  <Pencil size={18} strokeWidth={2} />
                  Editar
                </button>
                <div className="switch-container" title={psico.estado === 'ACTIVO' ? "Desactivar" : "Activar"}>
                  <label className="switch-label">
                    <input type="checkbox" checked={psico.estado === 'ACTIVO'}
                      onChange={() => abrirConfirmToggle(psico)} />
                    <span className="slider round"></span>
                  </label>
                  <span className="switch-text">{psico.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal === 'registrar' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-box-psico" onClick={e => e.stopPropagation()}>
            <button className="modal-close-x" onClick={cerrarModal}><CloseIcon /></button>
            <h2>Registrar Psicólogo</h2>
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
          <div className="modal-box-psico" onClick={e => e.stopPropagation()}>
            <button className="modal-close-x" onClick={cerrarModal}><CloseIcon /></button>
            <div className="modal-header-row">
              <h2>Editar Datos</h2>
              <button className="btn-desactivar" onClick={() => abrirConfirmToggle(psicoSeleccionado!)}>
                {psicoSeleccionado?.estado === 'ACTIVO' ? 'Desactivar Psicólogo' : 'Activar Psicólogo'}
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
            </div>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={cerrarModal}>Cancelar</button>
              <button className="modal-btn primary" onClick={abrirConfirmEditar}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'confirmEditar' && (
        <div className="modal-overlay" onClick={() => setModal('editar')}>
          <div className="modal-box-psico modal-confirm" onClick={e => e.stopPropagation()}>
            <h2>¿Desea actualizar los datos del psicólogo?</h2>
            <div className="confirm-info">
              <p>{nombreCompleto(psicoSeleccionado)}</p>
              <p>{form.correo}</p>
              <p>{form.telefono}</p>
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
          <div className="modal-box-psico modal-success" onClick={e => e.stopPropagation()}>
            <h2>Los datos del psicólogo fueron actualizados correctamente.</h2>
            <button className="modal-btn primary" onClick={cerrarModal}>Aceptar</button>
          </div>
        </div>
      )}

      {modal === 'successRegistrar' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-box-psico modal-success" onClick={e => e.stopPropagation()}>
            <h2>El Psicólogo ha sido registrado con éxito.</h2>
            <button className="modal-btn primary" onClick={cerrarModal}>Aceptar</button>
          </div>
        </div>
      )}

      {modal === 'confirmToggle' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-box-psico modal-confirm" onClick={e => e.stopPropagation()}>
            <h2>¿Desea {psicoSeleccionado?.estado === 'ACTIVO' ? 'desactivar' : 'activar'} al psicólogo?</h2>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={cerrarModal}>Regresar</button>
              <button className="modal-btn primary" onClick={handleConfirmToggle}>Continuar</button>
            </div>
          </div>
        </div>
      )}
      {modal === 'successToggle' && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-box-psico modal-success" onClick={e => e.stopPropagation()}>
            <h2>El Psicólogo se ha {psicoSeleccionado?.estado === 'ACTIVO' ? 'activado' : 'desactivado'}.</h2>
            {psicoSeleccionado?.estado === 'INACTIVO' && (
              <p className="modal-subtext">Se han desactivado sus pacientes registrados. Puede activar al psicólogo de nuevo en cualquier momento.</p>
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