
import './App.css'
import { useState } from "react";
import { MenuBar } from './components/MenuBar'
import PantallaCitas from './components/PantallaCitas'
import Reportes from "./components/Reportes";
import PantallaPsicologos from "./components/PantallaPsicologos";
import PantallaPacientes from './components/PantallaPacientes';

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

        {activeItem === "#pacientes" && (
          <PantallaPacientes />
        )}
      </main>
    </div>
  );
}

