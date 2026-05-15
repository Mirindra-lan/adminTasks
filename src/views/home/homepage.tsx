import React, { useState, ReactNode } from "react";
import {
  FaChartPie,
  FaTasks,
  FaUsers,
  FaCog,
  FaCheckDouble,
  FaTimes,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

// --- TYPES & INTERFACES ---

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string
  active?: boolean;
}


// --- COMPOSANT PRINCIPAL ---

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      
      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 flex-col bg-slate-900 text-white transition-transform duration-300 md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:flex
      `}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-600 p-2">
              <FaCheckDouble className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">adminTask</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-4">
          <SidebarItem icon={<FaChartPie />} label="Tableau de bord" active href="/app"/>
          <SidebarItem icon={<FaTasks />} label="Tâches" href="/app/tasks"/>
          <SidebarItem icon={<FaUsers />} label="Utilisateurs" href="/app/users"/>
          <SidebarItem icon={<FaCog />} label="Paramètres" href="/app/conf"/>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=L+Mirindra&background=6366f1&color=fff"
              className="h-10 w-10 rounded-full border border-slate-700"
              alt="Avatar de l'utilisateur"
            />
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-white">L. Mirindra</p>
              <p className="text-xs text-slate-500">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ZONE DE CONTENU PRINCIPALE */}
      <Outlet context={{sidebarOpen, setSidebarOpen}}/>
    </div>
  );
}

// --- SOUS-COMPOSANTS TYPÉS ---

// const SidebarItem: React.FC<SidebarItemProps> = ({ icon, href, label, active = false }) => (
//   <Link to={href} className={`
//     flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
//     ${active 
//       ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
//       : "text-slate-400 hover:bg-slate-800 hover:text-white"}
//   `}>
//     <span className="text-lg">{icon}</span>
//     {label}
//   </Link>
//   // <a href="#" >
//   // </a>
// );

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  href,
  label
}) => (
  <NavLink
    to={href}
    end={href === "/app"}
    className={({ isActive }) =>
      `
      flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
      ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }
    `
    }
  >
    <span className="text-lg">
      {icon}
    </span>

    {label}
  </NavLink>
);