import { FaBars, FaSearch, FaBell, FaPlus, FaClock, FaUsers, FaCheckCircle, FaEllipsisV } from "react-icons/fa"
import { ReactNode, useState } from "react";
import CreateTaskModal from "../tasks/createTasl.js";

import { useOutletContext } from "react-router";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: "orange" | "blue" | "green";
}

interface TaskRowProps {
  title: string;
  id: string;
  user: string;
  priority: string;
  status: string;
  color: "orange" | "green" | "blue";
}

interface LayoutContext {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainPage() {
    const {sidebarOpen, setSidebarOpen} = useOutletContext<LayoutContext>();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Aperçu général</h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative hidden sm:block">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                className="w-64 rounded-xl bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Rechercher..."
              />
            </div>

            <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600">
              <FaBell className="text-xl" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>
          </div>
        </header>

        {/* CONTENU */}
        <div className="p-4 md:p-8">
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Tâches en cours" value="24" icon={<FaClock />} color="orange" />
            <StatCard title="Total utilisateurs" value="1,204" icon={<FaUsers />} color="blue" />
            <StatCard title="Taux de complétion" value="88%" icon={<FaCheckCircle />} color="green" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b p-6 sm:flex-row sm:items-center">
              <h2 className="text-lg font-bold text-slate-800">Tâches récentes</h2>
              <button onClick={() => { setIsCreateModalOpen(true) }} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200">
                <FaPlus /> Nouvelle tâche
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Tâche</th>
                    <th className="px-6 py-4">Assigné</th>
                    <th className="px-6 py-4">Priorité</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <TaskRow title="Mise à jour API Node.js" id="#TK-2093" user="Jean D." priority="Haute" status="En cours" color="orange" />
                  <TaskRow title="Design UI Profil" id="#TK-2094" user="Sara L." priority="Moyenne" status="Terminé" color="green" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => { setIsCreateModalOpen(false) }}/>
      </main>
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`rounded-2xl p-4 text-xl transition-transform group-hover:scale-110 ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const TaskRow: React.FC<TaskRowProps> = ({ title, id, user, priority, status, color }) => {
  const statusColors = {
    orange: "bg-orange-500",
    green: "bg-green-500",
    blue: "bg-blue-500"
  };

  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-4">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-400 font-mono">{id}</p>
      </td>
      <td className="px-6 py-4 text-slate-600 font-medium">{user}</td>
      <td className="px-6 py-4">
        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">
          {priority}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <span className={`h-2 w-2 animate-pulse rounded-full ${statusColors[color]}`} />
          {status}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
          <FaEllipsisV />
        </button>
      </td>
    </tr>
  );
};