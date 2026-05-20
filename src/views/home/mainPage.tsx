import { 
  FaBars, FaSearch, FaBell, FaPlus, FaClock, FaUsers, 
  FaCheckCircle, FaEllipsisV, FaCheck, FaExclamationTriangle, 
  FaInfoCircle, FaEdit, FaTrashAlt, FaArchive, FaExchangeAlt 
} from "react-icons/fa"
import { ReactNode, useState, useRef, useEffect } from "react";
import CreateTaskModal from "../tasks/createTasl.js";

import { useNavigate, useOutletContext } from "react-router";
import api from "../api.js";

type TaskType = {
  id: string,
  title: string,
  user_id: string,
  priority: string,
  state: string,
  color: "orange" | "blue" | "green" 
}
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  href?: string;
  color: "orange" | "blue" | "green";
}

interface TaskRowProps {
  title: string;
  id: string;
  user: string;
  priority: string;
  status: string;
  color: "orange" | "green" | "blue";
  activeDropdownId: string | null;
  setActiveDropdownId: (id: string | null) => void;
}

interface LayoutContext {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationItem {
  id: number;
  text: string;
  time: string;
  type: "success" | "warning" | "info";
  unread: boolean;
}

export default function MainPage() {
    const { sidebarOpen, setSidebarOpen } = useOutletContext<LayoutContext>();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [tasks, setTasks] = useState<TaskType[]>([]);
    
    // État pour savoir quel dropdown de ligne est ouvert (stocke l'ID de la tâche)
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
    
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    
    const [notifications, setNotifications] = useState<NotificationItem[]>([
      { id: 1, text: "Sara L. a terminé la tâche 'Design UI Profil'", time: "Il y a 5 min", type: "success", unread: true },
      { id: 2, text: "La tâche 'Mise à jour API Node.js' approche de sa deadline", time: "Il y a 1h", type: "warning", unread: true },
      { id: 3, text: "Nouvel utilisateur inscrit sur la plateforme", time: "Il y a 2h", type: "info", unread: false }
    ]);

    const hasUnread = notifications.some(n => n.unread);

    // Fermer les menus si on clique ailleurs sur l'écran
    useEffect(() => {
      async function getTasks() {
        const resTasks = await api.get("/tasks");
        if(resTasks.data?.tasks) {
          let data = resTasks.data.tasks as TaskType[];
          data = data.map((value) => {
            let pr: string;
            let stat: string;
            let col: "blue" | "green" | "orange";
            if(value.state == "created") {
              stat = "A faire";
              col = "blue";
            } else if(value.state == "loading") {
              stat = "En cours";
              col = "orange";
            } else {
              stat = "Terminée";
              col = "green";
            }
            if(value.priority == "high") {
              pr = "Urgent"
            } else if (value.priority == "low") {
              pr = "Basse"
            } else {
              pr = "Moyenne"
            }
            const dat = {
              ...value,
              priority: pr,
              state: stat,
              color: col
            }
            return dat
          })
          setTasks([...data])
        }
      }
      function handleClickOutside(event: MouseEvent) {
        if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
          setNotifOpen(false);
        }
        // Si on clique en dehors d'un bouton d'action, on ferme le menu de la ligne
        const target = event.target as HTMLElement;
        if (!target.closest(".action-dropdown-container")) {
          setActiveDropdownId(null);
        }
      }
      getTasks();
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return <main className="flex flex-1 flex-col overflow-y-auto bg-slate-50">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:px-8">
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

            {/* BLOC NOTIFICATIONS */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className={`relative rounded-full p-2 transition-colors focus:outline-none ${
                  notifOpen ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                }`}
              >
                <FaBell className="text-xl" />
                {hasUnread && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 animate-pulse" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="font-bold text-slate-800 text-sm">Notifications</span>
                    {hasUnread && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
                      >
                        <FaCheck className="text-[10px]" /> Tout marquer lu
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-400">Aucune notification</div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`flex gap-3 items-start p-2.5 rounded-xl transition ${
                            notif.unread ? "bg-indigo-50/40" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className={`p-2 rounded-lg text-sm mt-0.5 shrink-0 ${
                            notif.type === "success" ? "bg-emerald-50 text-emerald-600" :
                            notif.type === "warning" ? "bg-amber-50 text-amber-600" :
                            "bg-blue-50 text-blue-600"
                          }`}>
                            {notif.type === "success" && <FaCheckCircle />}
                            {notif.type === "warning" && <FaExclamationTriangle />}
                            {notif.type === "info" && <FaInfoCircle />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-xs text-slate-700 leading-relaxed ${notif.unread ? "font-semibold" : "font-normal"}`}>
                              {notif.text}
                            </p>
                            <span className="text-[10px] text-slate-400 block mt-1">{notif.time}</span>
                          </div>

                          {notif.unread && (
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENU */}
        <div className="p-4 md:p-8">
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Tâches en cours" value="24" icon={<FaClock />} color="orange" href="/tasks"/>
            <StatCard title="Total utilisateurs" value="1,204" icon={<FaUsers />} color="blue" href="/users" />
            <StatCard title="Taux de complétion" value="88%" icon={<FaCheckCircle />} color="green" />
          </div>

          <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b p-6 sm:flex-row sm:items-center">
              <h2 className="text-lg font-bold text-slate-800">Tâches récentes</h2>
              <button onClick={() => { setIsCreateModalOpen(true) }} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200">
                <FaPlus /> Nouvelle tâche
              </button>
            </div>

            <div className="overflow-x-auto overflow-y-visible">
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
                  {tasks.map(value => {
                    return <TaskRow
                      title={value.title} id={value.id} user={value.user_id} priority={value.priority} status={value.state} color={value.color || "green"}
                      activeDropdownId={activeDropdownId} setActiveDropdownId={setActiveDropdownId}
                    />
                  })}
                  {/* <TaskRow 
                    title="Mise à jour API Node.js" id="#TK-2093" user="Jean D." priority="Haute" status="En cours" color="orange"
                    activeDropdownId={activeDropdownId} setActiveDropdownId={setActiveDropdownId}
                  />
                  <TaskRow 
                    title="Design UI Profil" id="#TK-2094" user="Sara L." priority="Moyenne" status="Terminé" color="green"
                    activeDropdownId={activeDropdownId} setActiveDropdownId={setActiveDropdownId}
                  /> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => { setIsCreateModalOpen(false) }}/>
      </main>
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, href}) => {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };
  const navigate = useNavigate()

  const handleClick = () => {
    if(href) {
      navigate(href)
    }
  }

  return (
    <div onClick={handleClick} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
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

// COMPOSANT ROW MODIFIÉ AVEC MENU D'ACTIONS DROPDOWN
const TaskRow: React.FC<TaskRowProps> = ({ title, id, user, priority, status, color, activeDropdownId, setActiveDropdownId }) => {
  const statusColors = {
    orange: "bg-orange-500",
    green: "bg-green-500",
    blue: "bg-blue-500"
  };

  const isDropdownOpen = activeDropdownId === id;

  const handleActionClick = (actionName: string) => {
    alert(`Action exécutée : ${actionName} sur la tâche ${id}`);
    setActiveDropdownId(null); // Referme le menu après action
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
      
      {/* CASE DE L'ACTION INTERACTIVE */}
      <td className="px-6 py-4 text-center overflow-visible">
        <div className="action-dropdown-container relative inline-block text-left">
          <button 
            onClick={() => setActiveDropdownId(isDropdownOpen ? null : id)}
            className={`rounded-lg p-2 transition-colors focus:outline-none ${
              isDropdownOpen ? "bg-slate-200 text-slate-700" : "text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            }`}
          >
            <FaEllipsisV />
          </button>

          {/* CODE DU DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 z-30 w-44 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-100">
              <button
                onClick={() => handleActionClick("Update")}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <FaEdit className="text-slate-400 text-sm" /> Modifier
              </button>
              
              <button
                onClick={() => handleActionClick("ChangeState")}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <FaExchangeAlt className="text-slate-400 text-sm" /> Changer statut
              </button>

              <button
                onClick={() => handleActionClick("Archive")}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <FaArchive className="text-slate-400 text-sm" /> Archiver
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={() => handleActionClick("Delete")}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaTrashAlt className="text-red-400 text-sm" /> Supprimer
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};