import { useState } from "react";
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

export default function Reportes() {
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [reporteActivo, setReporteActivo] = useState<"citas" | "cubiculos">(
    "cubiculos",
  );

  // Configuración básica de la gráfica
  const data = {
    labels: ["C1", "C2", "C3", "C4", "C5", "C6"],
    datasets: [
      {
        label: "Citas",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#6B3FA0",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="reportes-container">
      <div className="reportes-wrapper">
        <div className="reportes-title-row">
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
            <button className="btn-nav"><IconPrint /></button>
          </div>
        </div>
        <div className="reportes-filters-container">
          <div className="pc-field reporte-fecha-field">
            <label className="pc-label">DESDE</label>
            <div style={{ width: "100%" }}>
              <Calendar
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.value as Date)}
                dateFormat="dd 'de' MM 'de' yy"
                showIcon
                className="pc-calendar-custom"
                placeholder="Selecciona fecha"
                readOnlyInput
              />
            </div>
          </div>

          <div className="pc-field reporte-fecha-field">
            <label className="pc-label">HASTA</label>
            <div style={{ width: "100%" }}>
              <Calendar
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.value as Date)}
                dateFormat="dd 'de' MM 'de' yy"
                showIcon
                className="pc-calendar-custom"
                placeholder="Selecciona fecha"
                readOnlyInput
              />
            </div>
          </div>
        </div>
        <div className="reportes-content-grid">
          <div className="report-card">
            <Bar
              data={data}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>

          <div className="report-card">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Cubículo</th>
                  <th>Horas Disp.</th>
                  <th>Horas Ocup.</th>
                  <th>% Ocupación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Cubículo 1</strong>
                  </td>
                  <td>40 hrs</td>
                  <td>32 hrs</td>
                  <td>
                    <span className="occupation-badge">80%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
