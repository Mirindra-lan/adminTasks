import React, { useEffect, useState, useRef } from "react";
import CreateTaskModal from "./createTasl.js";
import {
  FaBars,
  FaPlus,
  FaCheck,
  FaBolt,
  FaTag,
  FaCalendarAlt,
  FaEdit,
  FaTrashAlt,
  FaDatabase,
  FaCircle,
  FaFilter,
  FaUserPlus,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useOutletContext } from "react-router";
import api from "../api.js";

type Priority = "high" | "mid" | "low";

interface Task {
  id: number;
  state: string;
  title: string;
  category: string;
  description: string;
  user_id: string;
  contributor: string;
  priority: Priority;
  end_time?: string;
  createdat: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: "Actif" | "En pause";
  lastActivity?: string;
  avatar?: string;
  online?: boolean;
  lastupdatedat?: Date | null;
  createdat?: string;
  avatarColor?: string;
}

interface LayoutContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const priorityStyles: Record<
  Priority,
  {
    text: string;
    bg: string;
    icon: React.ReactNode;
  }
> = {
  high: {
    text: "text-red-500",
    bg: "bg-red-50",
    icon: <FaBolt className="text-xs" />,
  },
  mid: {
    text: "text-blue-500",
    bg: "bg-blue-50",
    icon: <FaCircle className="text-[8px]" />,
  },
  low: {
    text: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: <FaCircle className="text-[8px]" />,
  },
};

const categoryStyles: Record<string, string> = {
  Backend: "text-indigo-600 bg-indigo-50",
  Database: "text-emerald-600 bg-emerald-50",
};

const getRandomColorFromId = (id: string): string => {
  const colors = [
    "bg-indigo-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-cyan-500"
  ];
  
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const TaskManagement: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext<LayoutContext>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  // ÉTAT POUR LA SUPPRESSION
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // ÉTATS POUR L'ASSIGNATION
  const [activeAssignTaskId, setActiveAssignTaskId] = useState<number | null>(null);
  const [searchUser, setSearchUser] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveAssignTaskId(null);
        setSearchUser("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        const results = await api.get("/users");
        if (results.data?.users) {
          const fetchedUsers = results.data.users as User[];
          const usersWithColors = fetchedUsers.map(user => ({
            ...user,
            avatarColor: user.avatarColor || getRandomColorFromId(user.id)
          }));
          setUsers(usersWithColors);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
      }
    }

    async function getTask() {
      try {
        const result = await api.get("/tasks");
        if (result.data?.tasks) {
          setTasks(result.data.tasks as Task[]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des tâches", error);
      }
    }

    loadUsers();
    getTask();
  }, []);

  const handleAssignUser = async (taskId: number, userId: string) => {
    try {
      const resu = await api.put("/task", {task_id: taskId, contr_id: userId})
      if(resu.data?.success) {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, contributor: userId } : t));
        setActiveAssignTaskId(null);
        setSearchUser("");
      }
    } catch (error) {
      console.error("Erreur lors de l'assignation", error);
    }
  };

  // Action de validation de la suppression
  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      const res = await api.delete(`/task/${taskToDelete.id}`);
      if(res.data?.task) {
        setTasks(tasks.filter(t => t.id !== res.data.task.id));
      }
      setTaskToDelete(null); // Ferme la pop-up
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Gestion des tâches</h1>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsCreateModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-sm">
            <FaPlus />
            Créer une tâche
          </button>
        </div>
      </header>

      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition">
              Toutes
            </button>
            <button className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-bold">
              À faire
            </button>
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition">
              En cours
            </button>
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition">
              Terminées
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <select className="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
                <option>Priorité: Toutes</option>
                <option>Haute</option>
                <option>Moyenne</option>
                <option>Basse</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task) => {
            const priorityStyle = priorityStyles[task.priority];
            const assignedUser = users.find(u => u.id === task.contributor);

            return (
              <div
                key={task.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left */}
                  <div className="flex items-start gap-4 flex-1">
                    <button className="mt-1 w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-indigo-500 group-hover:bg-slate-50 transition">
                      <FaCheck className="text-[10px] text-white group-hover:text-slate-300" />
                    </button>

                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition">
                        {task.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <FaCalendarAlt />
                          <span>Échéance: {task.end_time || "Non définie"}</span>
                        </div>

                        <div
                          className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${priorityStyle?.text || ""} ${priorityStyle?.bg || ""}`}
                        >
                          {priorityStyle?.icon}
                          <span>Priorité {task.priority}</span>
                        </div>

                        <div
                          className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${categoryStyles[task.category] || "text-slate-600 bg-slate-50"}`}
                        >
                          {task.category === "Backend" ? <FaTag /> : <FaDatabase />}
                          <span>{task.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className="flex items-center">
                      {assignedUser ? (
                        <div 
                          className={`w-8 h-8 rounded-full ${assignedUser.avatarColor} text-white flex items-center justify-center text-xs font-bold shadow-inner`}
                          title={`Assigné à ${assignedUser.name}`}
                        >
                          {assignedUser.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-medium bg-slate-200/50" title="Aucun contributeur">
                          --
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 relative">
                      <button
                        onClick={() => setActiveAssignTaskId(activeAssignTaskId === task.id ? null : task.id)}
                        className={`p-2 rounded-lg transition ${activeAssignTaskId === task.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                        title="Assigner un contributeur"
                      >
                        <FaUserPlus />
                      </button>

                      {activeAssignTaskId === task.id && (
                        <div 
                          ref={popoverRef}
                          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl z-20 p-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
                        >
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Assigner à...
                          </h4>
                          
                          <div className="relative mb-3">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input 
                              type="text" 
                              placeholder="Rechercher un membre..."
                              value={searchUser}
                              onChange={(e) => setSearchUser(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                            />
                          </div>

                          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                            {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => {
                                const isCurrent = task.contributor === user.id;
                                return (
                                  <button
                                    key={user.id}
                                    onClick={() => handleAssignUser(task.id, user.id)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition text-left text-xs ${isCurrent ? 'bg-indigo-50/80' : 'hover:bg-slate-50'}`}
                                  >
                                    <div className={`w-7 h-7 rounded-full ${user.avatarColor} text-white flex items-center justify-center font-bold text-[10px]`}>
                                      {user.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className={`font-semibold truncate ${isCurrent ? 'text-indigo-600' : 'text-slate-700'}`}>
                                        {user.name}
                                      </p>
                                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                    </div>
                                    {isCurrent && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                                    )}
                                  </button>
                                );
                              })
                            ) : (
                              <p className="text-center text-xs text-slate-400 py-4">Aucun membre trouvé</p>
                            )}
                          </div>
                        </div>
                      )}

                      <button
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>

                      {/* Bouton Supprimer modifié */}
                      <button
                        onClick={() => setTaskToDelete(task)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <FaDatabase className="text-4xl text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Aucune tâche trouvée</h3>
            <p className="text-slate-500 max-w-xs">
              Il semble que vous n&apos;ayez aucune tâche correspondant à ces critères.
            </p>
          </div>
        )}
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* POPUP MODALE DE CONFIRMATION DE SUPPRESSION */}
      {taskToDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-500 shrink-0">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-800">
                  Supprimer la tâche ?
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Êtes-vous sûr de vouloir supprimer la tâche <span className="font-semibold text-slate-700">"{taskToDelete.title}"</span> ? Cette action est irréversible.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TaskManagement;