import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner, FaCalendarAlt, FaTag, FaDatabase, FaClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import api from "../api.js";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Priority = "high" | "mid" | "low";

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [dueTimestamptz, setDueTimestamptz] = useState("");
  const [priority, setPriority] = useState<Priority>("mid");
  const [category, setCategory] = useState("Backend");
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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: title,
      description: description,
      category: category,
      end_time: dueDate + "T" + dueTime + ":00",
      priority: priority
    }
    console.log(data)
    const result = await api.post("/task", data);
    if(result.data?.success) {
      alert(result.data.success);
      setLoading(false);
      onClose();
    } else if(result.data?.error) {
      alert(result.data.error);
      setLoading(false);
    } else {
      alert("unknown error");
      setLoading(false);
    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY SOMBRE */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* POPUP CONTAINER */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ENTÊTE */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <FaPlus className="text-sm" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Créer une nouvelle tâche</h3>
              <p className="text-xs text-slate-500">Planifiez et assignez une nouvelle action</p>
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
          
          {/* TITRE DE LA TÂCHE */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Titre de la tâche</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Refactoriser le module d'authentification"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez des détails ou des instructions concernant cette tâche..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          {/* DATE D'ÉCHÉANCE */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FaCalendarAlt className="text-slate-400 text-[11px]" /> Échéance
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-700 cursor-pointer"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FaClock className="text-slate-400 text-[11px]" /> Échéance
            </label>
            <input
              type="time"
              required
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-700 cursor-pointer"
            />
          </div>

          {/* PRIORITÉ & CATÉGORIE (SUR LA MÊME LIGNE) */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* PRIORITÉ */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Priorité</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer text-slate-700"
              >
                <option value="high">🔴 Haute</option>
                <option value="mid">🔵 Moyenne</option>
                <option value="low">🟢 Basse</option>
              </select>
            </div>

            {/* CATÉGORIE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer text-slate-700"
              >
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Frontend">Frontend</option>
                <option value="Design">Design</option>
              </select>
            </div>

          </div>

          {/* BOUTONS ACTIONS */}
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
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-900/10 transition hover:bg-indigo-700 disabled:opacity-70 min-w-[140px]"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-sm" />
              ) : (
                <>
                  <FaPlus className="text-xs" />
                  <span>Créer la tâche</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}