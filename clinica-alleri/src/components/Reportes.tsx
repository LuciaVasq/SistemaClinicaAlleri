import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Reportes.css";
import { citaService } from "../services/citaService.ts";
import type {
  CitaDTO,
  CubiculoDTO,
  PsicologoDTO,
} from "../types/alleri.types.ts";
import { catalogoService } from "../services/catalogoService.ts";
import iconAlleri from "../assets/alleri-icon.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const IconPrint = () => (
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
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

// Función para obtener citas en un rango de fechas
const obtenerCitasRango = async (inicio: Date, fin: Date) => {
  const citasTotales: CitaDTO[] = [];
  let fechaActual = new Date(inicio);

  while (fechaActual <= fin) {
    const isoFecha = fechaActual.toISOString().split("T")[0];
    const citasDia = await citaService.obtenerCitasPorDia(isoFecha);
    citasTotales.push(...citasDia);

    fechaActual.setDate(fechaActual.getDate() + 1);
  }
  return citasTotales;
};

// Función para generar datos de reporte por cubículo
const generarDatosCubiculos = (citas: CitaDTO[],cubiculos: CubiculoDTO[],diasDiferencia: number) => {
  const diasContados = diasDiferencia + 1;
  const HORAS_LABORALES_POR_DIA = 8;

  return cubiculos.map((cub: CubiculoDTO) => {
    const citasEnCub = citas.filter(
      (c) =>
        c.cubiculo.id === cub.id &&
        (c.estado?.toLowerCase() === "atendida" ||
          c.estado?.toLowerCase() === "pagada"),
    );
    const horasOcupadas = citasEnCub.length;
    const horasDisponibles = diasContados * HORAS_LABORALES_POR_DIA - horasOcupadas;
    const porcentaje = horasDisponibles > 0 ? ((horasOcupadas / horasDisponibles) * 100).toFixed(1) : "0";

    return {
      nombre: cub.nombre,
      horasDisponibles: `${horasDisponibles} hrs`,
      horasOcupadas: `${horasOcupadas} hrs`,
      porcentaje: `${porcentaje}%`,
      atendidas: horasOcupadas,
      canceladas: citas.filter( (c) => c.cubiculo.id === cub.id && c.estado?.toLowerCase() === "cancelada").length,
    };
  });
};

// Función para generar datos de reporte por psicólogo
const generarDatosPsicologos = (citas: CitaDTO[], psicologos: PsicologoDTO[]) => {
  return psicologos.map((psico) => {
    const citasPsico = citas.filter((c) => c.psicologo.id === psico.id);

    const atendidas = citasPsico.filter((c) => c.estado?.toLowerCase() === "atendida" || c.estado?.toLowerCase() === "pagada").length;

    const canceladas = citasPsico.filter((c) => c.estado?.toLowerCase() === "cancelada").length;

    return {
      nombre: `${psico.nombre} ${psico.apellidoPaterno}`,
      atendidas: atendidas,
      canceladas: canceladas,
      total: citasPsico.length,
    };
  });
};

export default function Reportes() {
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [reporteActivo, setReporteActivo] = useState<"citas" | "cubiculos"> ("cubiculos");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarPopupPDF, setMostrarPopupPDF] = useState(false);
  const [datosFinales, setDatosFinales] = useState<any[]>([]);

  const fetchReportes = async () => {
    if (!fechaDesde || !fechaHasta) return;

    if (fechaDesde > fechaHasta) {
        setDatosFinales([]); 
        setMostrarPopup(true); 
        return;
    }

    try {
      const [citas, cubiculos, psicologos] = await Promise.all([
        obtenerCitasRango(fechaDesde, fechaHasta),
        catalogoService.obtenerCubiculos(),
        catalogoService.obtenerPsicologos(),
      ]);

      const diffTime = Math.abs(fechaHasta.getTime() - fechaDesde.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (reporteActivo === "cubiculos") {
        setDatosFinales(generarDatosCubiculos(citas, cubiculos, diffDays));
      } else {
        setDatosFinales(generarDatosPsicologos(citas, psicologos));
      }
    } catch (error) {
      console.error("Error al generar reporte:", error);
    } finally {
      
    }
  };

  const handlePrint = () => {
  if (datosFinales.length === 0) {
    alert("No hay datos para imprimir.");
    return;
  }
  const originalTitle = document.title;
  const hoy = new Date().toISOString().split('T')[0];
  const ahora = new Date();
  const timestamp = `${ahora.getHours()}-${ahora.getMinutes()}`;
  const nombreReporte = reporteActivo === "cubiculos" ? "Cubiculos" : "Psicologos";
  document.title = `Reporte_${nombreReporte}_${hoy}_${timestamp}`;
  window.print();
  document.title = originalTitle;
};

  useEffect(() => {
    fetchReportes();
  }, [fechaDesde, fechaHasta, reporteActivo]);

  const dataChart = {
    labels: datosFinales.map((d) => d.nombre),
    datasets: [
      {
        label:
          reporteActivo === "cubiculos" ? "Horas Ocupadas" : "Citas Atendidas",
        data: datosFinales.map((d) => d.atendidas),
        backgroundColor: "#6B3FA0",
        borderRadius: 8,
      },
      ...(reporteActivo === "citas" ? [{
          label: "Citas Canceladas",
          data: datosFinales.map((d) => d.canceladas),
          backgroundColor: "#DAC5ED",
          borderRadius: 8,
        }] 
      : [])
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        callback: function(value: any) {
          if (Math.floor(value) === value) {
            return value;
            }
          },
        },
      },
    },
  };

  return (
    <div className="reportes-container">
      <div className="reportes-wrapper">
        <div className="reportes-title-row">
          <div className="only-print header-pdf">
            <div className="header-pdf-left">
              <img src={iconAlleri} alt="Logo Alleri" className="pdf-logo" />
              <div className="header-pdf-info">
                {reporteActivo === "cubiculos" ? (
                  <h2>Reporte de Ocupación de Cubículos</h2>
                ) : (
                  <h2>Reporte de Citas por Psicólogo</h2>
                )}
                <span>Periodo: {fechaDesde?.toLocaleDateString()} - {fechaHasta?.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="header-pdf-right">
              <h1 className="pdf-main-title">Reportes</h1>
            </div>
          </div>

          <h1>Reportes</h1>
          <div className="reportes-nav-buttons">
            <button
              className={`btn-reporte ${reporteActivo === "citas" ? "active" : "inactive"}`}
              onClick={() => setReporteActivo("citas")}
            >
              Reporte de citas
            </button>
            <button
              className={`btn-reporte ${reporteActivo === "cubiculos" ? "active" : "inactive"}`}
              onClick={() => setReporteActivo("cubiculos")}
            >
              Reporte de cubículos
            </button>
            <button className="btn-nav" onClick={() => {
              if (datosFinales.length === 0) {
                setMostrarPopupPDF(true);
              } else {
                handlePrint();
              }
            }}
            >
              <IconPrint />
            </button>
          </div>
        </div>

        <div className="reportes-filters-container">
          <div className="pc-field reporte-fecha-field">
            <label className="pc-label">DESDE</label>
            <Calendar
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.value as Date)}
              dateFormat="dd 'de' MM 'de' yy"
              showIcon
              className="pc-calendar-custom"
              readOnlyInput
            />
          </div>

          <div className="pc-field reporte-fecha-field">
            <label className="pc-label">HASTA</label>
            <Calendar
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.value as Date)}
              dateFormat="dd 'de' MM 'de' yy"
              showIcon
              className="pc-calendar-custom"
              readOnlyInput
            />
          </div>
        </div>

        <div className="reportes-content-grid">
          <div className="report-card">
            {reporteActivo && datosFinales.length > 0 ? (
            <Bar data={dataChart} options={options} />
            ) : (
            <div className="mensaje-espera">
              <p>Esperando selección de fechas...</p>
            </div>
            )}
          </div>

          <div className="report-card">
            <table className="report-table">
              <thead>
                <tr>
                  <th>
                    {reporteActivo === "cubiculos" ? "Cubículo" : "Psicólogo"}
                  </th>
                  <th>
                    {reporteActivo === "cubiculos" ? "Horas Disp." : "Atendidas"}
                  </th>
                  <th>
                    {reporteActivo === "cubiculos" ? "Horas Ocup." : "Canceladas"}
                  </th>
                  <th>
                    {reporteActivo === "cubiculos" ? "% Ocupación" : null}
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosFinales.map((fila, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{fila.nombre}</strong>
                    </td>
                    {reporteActivo === "cubiculos" ? (
                      <>
                        <td>{fila.horasDisponibles}</td>
                        <td>{fila.horasOcupadas}</td>
                        <td>
                          <span className="occupation-badge">
                            {fila.porcentaje}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{fila.atendidas}</td>
                        <td>{fila.canceladas}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {mostrarPopup && (
        <div className="reportes-modal-overlay">
          <div className="reportes-modal-box brand-modal">
            <h2>Aviso</h2>
            <p>
              La fecha <strong>"DESDE"</strong> no puede ser posterior a la fecha <strong>"HASTA"</strong>.
            </p>
            <button className="btn-modal-aceptar" onClick={() => {
              setMostrarPopup(false); 
              setFechaDesde(null);   
              setFechaHasta(null);    
            }}>
            Aceptar
          </button>
          </div>
        </div>
      )}
      {mostrarPopupPDF && (
        <div className="reportes-modal-overlay">
          <div className="reportes-modal-box brand-modal">
            <h2>Aviso</h2>
            <p>
              No hay datos para imprimir. Por favor, selecciona un rango de fechas válido.
            </p>
            <button className="btn-modal-aceptar" onClick={() => setMostrarPopupPDF(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
