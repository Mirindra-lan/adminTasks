import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { 
  FaBars, 
  FaSlidersH, 
  FaBell, 
  FaCog, 
  FaChevronDown, 
  FaGlobe, 
  FaSlack, 
  FaGithub,
  FaSave,
  FaSpinner,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";

interface LayoutContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Liste des sections de l'accordéon
type SectionType = "general" | "notifications" | "integrations" | null;

export default function SettingsPage() {
  const { setSidebarOpen } = useOutletContext<LayoutContext>();
  
  // Définit la section ouverte par défaut (ici, 'general')
  const [activeSection, setActiveSection] = useState<SectionType>("general");
  const [loadingSection, setLoadingSection] = useState<SectionType>(null);

  // --- ÉTATS DES PARAMÈTRES (Données) ---
  const [appName, setAppName] = useState("adminTask");
  const [language, setLanguage] = useState("fr");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [slackConnected, setSlackConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);

  // Gère l'ouverture/fermeture au clic sur l'en-tête
  const toggleSection = (section: SectionType) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Soumission du formulaire d'une section spécifique
  const handleSave = (e: React.FormEvent, section: SectionType) => {
    e.preventDefault();
    setLoadingSection(section);
    setTimeout(() => {
      alert(`Section "${section}" mise à jour avec succès !`);
      setLoadingSection(null);
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
          <h1 className="text-lg font-bold text-slate-800">Paramètres de l'application</h1>
        </div>
      </header>

      {/* CONTENU : ACCORDÉON */}
      <div className="p-4 md:p-8 max-w-3xl w-full mx-auto space-y-4">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Configuration</h2>
          <p className="text-sm text-slate-500">Cliquez sur une section pour l'ouvrir et modifier ses configurations.</p>
        </div>

        {/* ================= SECTION 1 : GÉNÉRAL ================= */}
        <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-200 ${
          activeSection === "general" ? "border-indigo-500 ring-4 ring-indigo-500/5" : "border-slate-200"
        }`}>
          {/* L'en-tête cliquable */}
          <button
            type="button"
            onClick={() => toggleSection("general")}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer hover:bg-slate-50/40"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl transition ${activeSection === "general" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>
                <FaSlidersH className="text-base" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Configuration générale</h3>
                {/* Résumé masqué quand la section s'ouvre */}
                {activeSection !== "general" && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-3 animate-in fade-in duration-200">
                    <span>Nom : <strong className="text-slate-700">{appName}</strong></span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1"><FaGlobe className="text-slate-400" /> {language === "fr" ? "Français" : "English"}</span>
                  </p>
                )}
              </div>
            </div>
            <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-200 ${activeSection === "general" ? "rotate-180 text-indigo-600" : ""}`} />
          </button>

          {/* Corps de la section (Formulaire) */}
          {activeSection === "general" && (
            <form onSubmit={(e) => handleSave(e, "general")} className="border-t border-slate-100 p-6 bg-slate-50/30 space-y-4 animate-in slide-in-from-top-4 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nom de l'application</label>
                  <input
                    type="text"
                    required
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Langue</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 text-slate-700 cursor-pointer"
                  >
                    <option value="fr">Français (FR)</option>
                    <option value="en">English (EN)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loadingSection === "general"}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-70"
                >
                  {loadingSection === "general" ? <FaSpinner className="animate-spin" /> : <><FaSave className="text-xs" /> Enregistrer</>}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ================= SECTION 2 : NOTIFICATIONS ================= */}
        <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-200 ${
          activeSection === "notifications" ? "border-indigo-500 ring-4 ring-indigo-500/5" : "border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => toggleSection("notifications")}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer hover:bg-slate-50/40"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl transition ${activeSection === "notifications" ? "bg-indigo-600 text-white" : "bg-amber-50 text-amber-600"}`}>
                <FaBell className="text-base" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Préférences de notifications</h3>
                {activeSection !== "notifications" && (
                  <p className="text-xs text-slate-500 mt-1 flex gap-2 animate-in fade-in duration-200">
                    <span className={`px-2 py-0.5 rounded ${emailNotif ? "bg-emerald-50 text-emerald-700 font-medium" : "bg-slate-100"}`}>Emails : {emailNotif ? "On" : "Off"}</span>
                    <span className={`px-2 py-0.5 rounded ${pushNotif ? "bg-emerald-50 text-emerald-700 font-medium" : "bg-slate-100"}`}>Push : {pushNotif ? "On" : "Off"}</span>
                  </p>
                )}
              </div>
            </div>
            <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-200 ${activeSection === "notifications" ? "rotate-180 text-indigo-600" : ""}`} />
          </button>

          {activeSection === "notifications" && (
            <form onSubmit={(e) => handleSave(e, "notifications")} className="border-t border-slate-100 p-6 bg-slate-50/30 space-y-4 animate-in slide-in-from-top-4 duration-200">
              <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-xl px-4">
                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Alertes par Email</p>
                    <p className="text-xs text-slate-500">Recevoir des récapitulatifs quotidiens d'activités.</p>
                  </div>
                  <button type="button" onClick={() => setEmailNotif(!emailNotif)} className={`text-2xl cursor-pointer transition ${emailNotif ? "text-indigo-600" : "text-slate-300"}`}>
                    {emailNotif ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Notifications Push</p>
                    <p className="text-xs text-slate-500">Alertes sonores et visuelles instantanées sur l'écran.</p>
                  </div>
                  <button type="button" onClick={() => setPushNotif(!pushNotif)} className={`text-2xl cursor-pointer transition ${pushNotif ? "text-indigo-600" : "text-slate-300"}`}>
                    {pushNotif ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loadingSection === "notifications"}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
                >
                  {loadingSection === "notifications" ? <FaSpinner className="animate-spin" /> : <><FaSave className="text-xs" /> Enregistrer</>}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ================= SECTION 3 : INTÉGRATIONS ================= */}
        <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-200 ${
          activeSection === "integrations" ? "border-indigo-500 ring-4 ring-indigo-500/5" : "border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => toggleSection("integrations")}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer hover:bg-slate-50/40"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl transition ${activeSection === "integrations" ? "bg-indigo-600 text-white" : "bg-purple-50 text-purple-600"}`}>
                <FaCog className="text-base" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Applications connectées</h3>
                {activeSection !== "integrations" && (
                  <p className="text-xs text-slate-500 mt-1 flex gap-3 animate-in fade-in duration-200">
                    <span className={`flex items-center gap-1 ${slackConnected ? "text-slate-700 font-medium" : "opacity-40"}`}><FaSlack className="text-[#ECB22E]" /> Slack</span>
                    <span className={`flex items-center gap-1 ${githubConnected ? "text-slate-700 font-medium" : "opacity-40"}`}><FaGithub className="text-slate-900" /> GitHub</span>
                  </p>
                )}
              </div>
            </div>
            <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-200 ${activeSection === "integrations" ? "rotate-180 text-indigo-600" : ""}`} />
          </button>

          {activeSection === "integrations" && (
            <form onSubmit={(e) => handleSave(e, "integrations")} className="border-t border-slate-100 p-6 bg-slate-50/30 space-y-3 animate-in slide-in-from-top-4 duration-200">
              <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl bg-white">
                <div className="flex items-center gap-2.5">
                  <FaSlack className="text-[#ECB22E] text-lg" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Slack Connection</span>
                    <span className="text-xs text-slate-400">Envoi de notifications dans vos canaux.</span>
                  </div>
                </div>
                <button type="button" onClick={() => setSlackConnected(!slackConnected)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${slackConnected ? "border-red-200 text-red-600 hover:bg-red-50 bg-white" : "border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-white"}`}>
                  {slackConnected ? "Désactiver" : "Activer"}
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl bg-white">
                <div className="flex items-center gap-2.5">
                  <FaGithub className="text-slate-900 text-lg" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">GitHub Webhook</span>
                    <span className="text-xs text-slate-400">Synchroniser vos commits d'équipe.</span>
                  </div>
                </div>
                <button type="button" onClick={() => setGithubConnected(!githubConnected)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${githubConnected ? "border-red-200 text-red-600 hover:bg-red-50 bg-white" : "border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-white"}`}>
                  {githubConnected ? "Désactiver" : "Activer"}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}