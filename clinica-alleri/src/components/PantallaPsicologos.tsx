import { useEffect, useState } from 'react';
import '../styles/Psicologos.css';

import type { PsicologoDTO, EstadoDTO } from '../types/alleri.types';
import { catalogoService } from '../services/catalogoService';

export default function PantallaPsicologos() {
  const [psicologos, setPsicologos] = useState<PsicologoDTO[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const IconPlus = () => (
    <svg 
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const SearchIcon = () => (
    <svg 
        width="20" 
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

  const cargarPsicologos = async () => {
    try {
      const data = await catalogoService.obtenerPsicologos();
      setPsicologos(data);
    } catch (error) {
      alert("Error de conexión al cargar la lista de psicólogos");
      console.error(error);
    }
  };

  const handleToggleEstado = async (psico: PsicologoDTO) => {
    const nuevoEstado: EstadoDTO = psico.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    
    const payload: PsicologoDTO = {
      ...psico,
      estado: nuevoEstado
    };

    try {
      await catalogoService.actualizarPsicologo(psico.id!, payload);
      
      setPsicologos(psicologos.map(p => p.id === psico.id ? { ...p, estado: nuevoEstado } : p));
    } catch (error) {
      alert("No se pudo cambiar el estado del psicólogo en el servidor.");
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPsicologos();
  }, []);

  const psicologosFiltrados = psicologos.filter(p => {
    const nombreCompleto = `${p.nombre || ''} ${p.apellidoPaterno || ''} ${p.apellidoMaterno || ''}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="admin-psico-container">
      <div className="admin-psico-wrapper">
        
        {/* Encabezado */}
        <div className="admin-psico-header">
          <h1>Administrar Psicólogos</h1>
          <button className="btn-add-psico">
            <IconPlus />
          </button>
        </div>

        {/* Buscador */}
        <div className="search-box-container">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Lista de Psicólogos */}
        <div className="psicologos-list">
          {psicologosFiltrados.map((psico: PsicologoDTO) => (
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
                <button className="action-btn">
                  <span className="icon"></span> Adeudo
                </button>

                <button className="action-btn">
                  <span className="icon"></span> Editar
                </button>
                
                <div className="switch-container" title={psico.estado === 'ACTIVO' ? "Desactivar Psicólogo" : "Activar Psicólogo"}>
                  <label className="switch-label">
                    <input 
                      type="checkbox" 
                      checked={psico.estado === 'ACTIVO'} 
                      onChange={() => handleToggleEstado(psico)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="switch-text">
                    {psico.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
            ))}

        </div>
      </div>
    </div>
  );
}