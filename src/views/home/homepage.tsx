import { useState } from "react";
import {
    FaBars,
    FaChartPie,
    FaTasks,
    FaUsers,
    FaCog,
    FaCheckDouble,
    FaBell,
    FaClock,
    FaUsers as FaUserGroup,
    FaCheckCircle as FaCircleCheck,
    FaPlus,
    FaEllipsisV,
    FaSearch
} from "react-icons/fa";

export default function Dashboard() {
    const [sidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">

            {/* SIDEBAR */}
            <aside className="hidden w-64 flex-col bg-slate-900 text-white md:flex">

                <div className="flex items-center gap-3 p-6">
                    <div className="rounded-lg bg-indigo-600 p-2">
                        <FaCheckDouble />
                    </div>
                    <span className="text-xl font-bold">adminTask</span>
                </div>

                <nav className="flex-1 space-y-2 px-4 py-4">

                    <a className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3">
                        <FaChartPie /> Tableau de bord
                    </a>

                    <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <FaTasks /> Tâches
                    </a>

                    <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <FaUsers /> Utilisateurs
                    </a>

                    <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <FaCog /> Paramètres
                    </a>
                </nav>

                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-medium">L. Mirindra</p>
                            <p className="text-xs text-slate-500">Administrateur</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="flex flex-1 flex-col overflow-y-auto">

                {/* HEADER */}
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-8">

                    <div className="flex items-center gap-4">
                        <button className="md:hidden">
                            <FaBars />
                        </button>
                        <h1 className="text-lg font-semibold">
                            Aperçu général
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">

                        <div className="relative hidden sm:block">

                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-64 rounded-full bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Rechercher..."
                            />
                        </div>

                        <button className="relative text-slate-500 hover:text-indigo-600">
                            <FaBell className="text-xl" />
                            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="p-8">

                    {/* STATS */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                        <Card
                            title="Tâches en cours"
                            value="24"
                            icon={<FaClock />}
                            color="orange"
                        />

                        <Card
                            title="Total utilisateurs"
                            value="1,204"
                            icon={<FaUserGroup />}
                            color="blue"
                        />

                        <Card
                            title="Taux de complétion"
                            value="88%"
                            icon={<FaCircleCheck />}
                            color="green"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-2xl border bg-white">

                        <div className="flex items-center justify-between border-b p-6">

                            <h2 className="text-lg font-bold">
                                Tâches récentes
                            </h2>

                            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                                <FaPlus /> Nouvelle tâche
                            </button>
                        </div>

                        <table className="w-full text-left text-sm">

                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                <tr>
                                    <th className="p-4">Tâche</th>
                                    <th className="p-4">Assigné</th>
                                    <th className="p-4">Priorité</th>
                                    <th className="p-4">Statut</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                <TaskRow
                                    title="Mise à jour API Node.js"
                                    id="#TK-2093"
                                    user="Jean D."
                                    priority="Haute"
                                    status="En cours"
                                    statusColor="orange"
                                />

                                <TaskRow
                                    title="Design UI Profil"
                                    id="#TK-2094"
                                    user="Sara L."
                                    priority="Moyenne"
                                    status="Terminé"
                                    statusColor="green"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Card({
    title,
    value,
    icon,
    color
}: any) {
    const bg =
        color === "orange"
            ? "bg-orange-100 text-orange-600"
            : color === "blue"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600";

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex justify-between">

                <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-1 text-3xl font-bold">
                        {value}
                    </h3>
                </div>

                <div className={`rounded-xl p-3 ${bg}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function TaskRow({
    title,
    id,
    user,
    priority,
    status,
    statusColor
}: any) {
    const color =
        statusColor === "orange"
            ? "text-orange-500 bg-orange-500"
            : "text-green-500 bg-green-500";

    return (
        <tr className="border-t hover:bg-slate-50">

            <td className="p-4">
                <p className="font-medium">{title}</p>
                <p className="text-xs text-slate-400">{id}</p>
            </td>

            <td className="p-4">{user}</td>

            <td className="p-4">
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                    {priority}
                </span>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${color}`} />
                    {status}
                </div>
            </td>

            <td className="p-4">
                <FaEllipsisV className="text-slate-400" />
            </td>
        </tr>
    );
}