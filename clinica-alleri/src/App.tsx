
import './App.css'
import { useState } from "react";
import { MenuBar } from './components/MenuBar'
import PantallaCitas from './components/PantallaCitas'
import Reportes from "./components/Reportes";
import PantallaPsicologos from "./components/PantallaPsicologos";

export default function App() {
  const [activeItem, setActiveItem] = useState<string>("#citas");

  return (
    <div className="app-container">
      <MenuBar 
        activeItem={activeItem} 
        onSectionChange={setActiveItem} 
      />

      <main className="main-content">
        {activeItem === "#citas" && (
          <PantallaCitas />
        )}

        {activeItem === "#reportes" && (
          <Reportes />
        )}

        {activeItem === "#psicologos" && (
          <PantallaPsicologos />
        )}

        {/* Mensajes temporales para las otras pantallas */}
        {activeItem === "#pacientes" && <div style={{padding: "100px"}}>Próximamente: Pacientes</div>}
      </main>
    </div>
  );
}

