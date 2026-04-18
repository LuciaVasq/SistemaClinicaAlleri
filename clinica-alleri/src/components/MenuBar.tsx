import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/NavBar.css"
import iconAlleri from "../assets/alleri-icon.png";


interface NavItem {
  label: string;
  href:  string;
  icon:  JSX.Element;
}

//iconos 
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="0" y1="2"  x2="22" y2="2"/>
    <line x1="0" y1="9"  x2="22" y2="9"/>
    <line x1="0" y1="16" x2="22" y2="16"/>
  </svg>
);
const IconAvatarFull = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

//datos del menu 
const NAV_ITEMS: NavItem[] = [
  { label: "Citas Programadas", href: "#citas",      icon: <IconCalendar /> },
  { label: "Pacientes",         href: "#pacientes",  icon: <IconUsers />    },
  { label: "Psicólogos",        href: "#psicologos", icon: <IconUser />     },
  { label: "Reportes",          href: "#reportes",   icon: <IconChart />    }
];


function Overlay({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <motion.div
      key="overlay"
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
    />
  );
}

//side bar
interface SidebarProps {
  activeItem: string;
  onSelect:   (href: string) => void;
  onClose:    () => void;
}

function Sidebar({ activeItem, onSelect, onClose }: SidebarProps): JSX.Element {
  return (
    <motion.aside
      key="sidebar"
      className="sidebar"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      {/* Header */}
      <div className="sidebar__header">
        <div>
          <img src ={iconAlleri} height="100px" width="145 px"/>
        </div>

        <motion.button
          className="sidebar__close-btn"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <IconClose />
        </motion.button>
      </div>

      {/* Perfil */}
      <div className="sidebar__profile">
        <div className="sidebar__profile-avatar">
          <IconAvatarFull />
        </div>
        <div>
          <p className="sidebar__profile-name">María García</p>
          <p className="sidebar__profile-role">Administrador</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeItem === item.href;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              className={`sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                onSelect(item.href);
                onClose();
              }}
            >
              <span className="sidebar__nav-item__icon">{item.icon}</span>
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="sidebar__nav-item__dot"
                />
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <motion.button
          className="sidebar__logout-btn"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconLogout />
          Cerrar sesión
        </motion.button>
      </div>
    </motion.aside>
  );
}

// navbar
export function MenuBar() {
  const [menuOpen, setMenuOpen]     = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("#citas");

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Logo */}
        <div className="navbar__logo">
         <img src={iconAlleri} height="90px" width="135 px"/>
        </div>

        {/* Right */}
        <div className="navbar__right">
          <span className="navbar__username">María García</span>

          <motion.div
            className="navbar__avatar"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <IconAvatarFull />
          </motion.div>

          <motion.button
            className="navbar__hamburger"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <Overlay onClick={() => setMenuOpen(false)} />
            <Sidebar
              activeItem={activeItem}
              onSelect={setActiveItem}
              onClose={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

