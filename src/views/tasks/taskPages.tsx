import React, {useEffect, useState} from "react";
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

const TaskManagement: React.FC = () => {
  const {sidebarOpen, setSidebarOpen} = useOutletContext<LayoutContext>();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    async function getTask() {
      const result = await api.get("/tasks");
      if(result.data?.tasks) {
        const data = result.data.tasks as Task[];
        setTasks([...tasks, ...data]);
      }
    }
    getTask();
  }, [])
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
                        {/* Due Date */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <FaCalendarAlt />
                          <span>Échéance: {task.end_time}</span>
                        </div>

                        {/* Priority */}
                        <div
                          className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${priorityStyle.text} ${priorityStyle.bg}`}
                        >
                          {priorityStyle.icon}
                          <span>Priorité {task.priority}</span>
                        </div>

                        {/* Category */}
                        <div
                          className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                            categoryStyles[task.category]
                          }`}
                        >
                          {task.category === "Backend" ? (
                            <FaTag />
                          ) : (
                            <FaDatabase />
                          )}

                          <span>{task.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    {/* Avatars */}
                    {/* <div className="flex -space-x-2">
                      {task.assignedTo.slice(0, 1).map((user) => (
                        <img
                          key={user}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user
                          )}&background=6366f1&color=fff`}
                          alt={user}
                        />
                      ))}

                      {task.assignedTo.length > 1 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +{task.assignedTo.length - 1}
                        </div>
                      )}
                    </div> */}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Modifier"
                      >
                        <FaUserPlus />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>

                      <button
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

            <h3 className="text-lg font-bold text-slate-800">
              Aucune tâche trouvée
            </h3>

            <p className="text-slate-500 max-w-xs">
              Il semble que vous n&apos;ayez aucune tâche correspondant à ces
              critères.
            </p>
          </div>
        )}
      </div>
			<CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </main>
  );
};

export default TaskManagement;