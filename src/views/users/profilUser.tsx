import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { 
  FaBars, 
  FaUser, 
  FaLock, 
  FaCamera, 
  FaSave, 
  FaEnvelope, 
  FaIdCard,
  FaShieldAlt 
} from "react-icons/fa";

interface LayoutContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserProfile() {
  const { setSidebarOpen } = useOutletContext<LayoutContext>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // États du formulaire
  const [prenom, setPrenom] = useState("Lantosoa");
  const [nom, setNom] = useState("Mirindra");
  const [email, setEmail] = useState("mirindra@admintask.io");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Profil mis à jour avec succès !");
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mon Profil</h1>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="p-4 md:p-8 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE : CARTE AVATAR & RÉSUMÉ */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center relative overflow-hidden">
            {/* Bannière décorative en arrière-plan */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-500 to-indigo-600" />
            
            {/* Conteneur Avatar */}
            <div className="relative w-24 h-24 mx-auto mt-8 mb-4 group">
              <img
                src="https://ui-avatars.com/api/?name=Lantosoa+Mirindra&background=6366f1&color=fff"
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              />
              <button 
                type="button"
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                title="Changer de photo"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* Infos textuelles */}
            <h2 className="text-xl font-bold text-slate-800">{prenom} {nom}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{email}</p>
            
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <FaShieldAlt className="text-[10px]" /> Administrateur
            </div>

            <div className="border-t border-slate-100 mt-6 pt-4 text-left">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Membre depuis</span>
                <span className="text-slate-600">Janvier 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRES DE CONFIGURATION */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* SECTION 1 : INFORMATIONS PERSONNELLES */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FaIdCard className="text-indigo-500 text-sm" />
                <h3 className="font-bold text-slate-800">Informations personnelles</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Prénom</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nom</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <FaEnvelope className="text-slate-400 text-xs" /> Adresse Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                />
              </div>
            </div>

            {/* SECTION 2 : SÉCURITÉ / MOT DE PASSE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FaLock className="text-indigo-500 text-sm" />
                <h3 className="font-bold text-slate-800">Sécurité du compte</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Mot de passe actuel</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nouveau mot de passe</label>
                <input
                  type="password"
                  placeholder="Laissez vide pour ne pas modifier"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                />
              </div>
            </div>

            {/* BARRE D'ACTIONS INFERIEURE */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => {navigate("/app")}}
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Annuler
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-900/10 transition hover:bg-indigo-700 disabled:opacity-70 min-w-[160px]"
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <FaSave className="text-xs" />
                    <span>Enregistrer</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}