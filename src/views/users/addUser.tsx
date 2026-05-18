import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import api from "../api.js";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Fermer la modale avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de l'envoi de l'invitation (API)
    const res = await api.post("/register", {
      name: nom,
      lastname: prenom,
      email: email,
      pwd: "m123456789i"
    });
    if(res.data?.success){
      setLoading(false);
      onClose();
      alert(res.data.success);
    } else if(res.data?.error) {
      setLoading(false);
      alert(res.data.error);
    } else {
      setLoading(false);
      alert("Unknown error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ARRIÈRE-PLAN SOMBRE (OVERLAY) */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* BOITE DE DIALOGUE (POPUP) */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ENTÊTE */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <FaUserPlus className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Inviter un membre</h3>
              <p className="text-xs text-slate-500">Ajoutez un collaborateur à votre équipe</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* NOM & PRÉNOM (SUR UNE LIGNE) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Prénom</label>
              <input
                type="text"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Ex: Jean"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nom</label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Rakoto"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Adresse Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.rakoto@admintask.io"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* ACTIONS (BOUTONS) */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-900/10 transition hover:bg-indigo-700 disabled:opacity-70 min-w-[120px]"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-sm" />
              ) : (
                <>
                  <FaUserPlus className="text-xs" />
                  <span>Inviter</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}