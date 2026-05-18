import React, { useState, useRef, useEffect } from "react";
import { FaSignOutAlt, FaUser, FaEllipsisV, FaChevronUp } from "react-icons/fa";
import api from "../api.js";
import { useNavigate } from "react-router";

// ... à insérer tout en bas de ton composant Dashboard, à la place de l'ancien bloc utilisateur :

export function SidebarUserBlock() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fermer le menu si on clique n'importe où en dehors
  useEffect(() => {
    async function getData() {
      const res = await api.get("/profile");
      if(res.data?.success) {
        const dat = res.data.success;
        setNom(dat.name);
        setPrenom(dat.lastname);
        setRole(dat.role);
      }
    } 
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    getData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const res = await api.get("/logout");
    if(res.data?.success) {
      navigate("/login");
    }
    // Insère ta logique de déconnexion ici (clear token, redirect, etc.)
  };

  return (
    <div className="relative border-t border-slate-800 p-4" ref={menuRef}>
      
      {/* MENU POPUP (S'OUVRE VERS LE HAUT) */}
      {menuOpen && (
        <div className="absolute bottom-20 left-4 right-4 z-40 rounded-xl bg-slate-800 p-1.5 shadow-xl border border-slate-700/50 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            onClick={() => { navigate("/app/profile"); setMenuOpen(false); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <FaUser className="text-xs text-slate-400" />
            <span>Mon profil</span>
          </button>
          
          <div className="my-1 border-t border-slate-700/50" />
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition font-medium"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Déconnexion</span>
          </button>
        </div>
      )}

      {/* BLOC UTILISATEUR CLIQUABLE */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex w-full items-center justify-between rounded-xl p-2 text-left hover:bg-slate-800/60 transition group focus:outline-none"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex-shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${nom.charAt(0)}+${prenom.charAt(0)}&background=6366f1&color=fff`}
              className="h-10 w-10 rounded-full border border-slate-700 object-cover"
              alt="Avatar de l'utilisateur"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500" />
          </div>
          
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-white group-hover:text-indigo-400 transition">
              {nom.charAt(0)+". "+prenom}
            </p>
            <p className="truncate text-xs text-slate-500">
              {role.toLocaleUpperCase()}
            </p>
          </div>
        </div>

        {/* PETITE ICÔNE DE CONTRÔLE */}
        <div className="text-slate-500 group-hover:text-slate-300 transition pl-2">
          <FaChevronUp className={`text-xs transition-transform duration-200 ${menuOpen ? "rotate-180 text-indigo-400" : ""}`} />
        </div>
      </button>

    </div>
  );
}