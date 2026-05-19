import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import InviteMemberModal from "./addUser.js";
import { format } from "date-fns";

import {
  FaUserPlus,
  FaArrowDownWideShort,
  FaPenToSquare,
  FaUserSlash
} from "react-icons/fa6";

import { FaSearch, FaBars } from "react-icons/fa";
import api from "../api.js";

interface User {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  role: string;
  status?: "Actif" | "En pause";
  lastActivity?: string;
  avatar?: string;
  online?: boolean;
  lastupdatedat?: Date | null;
  createdat?: string;
}

interface LayoutContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UsersPage() {
  const { setSidebarOpen } = useOutletContext<LayoutContext>();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ===== FILTER STATES =====
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Tous les rôles");
  const [sortAsc, setSortAsc] = useState(true);

  // ===== LOAD USERS =====
  useEffect(() => {
    async function loadUsers() {
      try {
        const results = await api.get("/users");

        if (results.data?.success) {
          const data = results.data.success as User[];

          let dat = data.map((usr) => ({
            ...usr,
            lastActivity: usr.lastupdatedat
              ? format(new Date(usr.lastupdatedat), "dd MMMM yyyy")
              : "",
            status: "Actif",
            avatar: `https://ui-avatars.com/api/?name=${usr.name}+${usr.lastname}&background=random`
          })) as User[];
          dat = dat.filter(usr => {
            if(usr.email != localStorage.getItem("token")) {
              return usr;
            }
          })
          // IMPORTANT FIX (pas de spread users)
          setUsers(dat);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // ===== FILTER LOGIC =====
  const filteredUsers = users
    .filter((user) => {
      const s = search.toLowerCase();

      const matchSearch =
        user.name.toLowerCase().includes(s) ||
        user.email.toLowerCase().includes(s) ||
        user.role.toLowerCase().includes(s);

      const matchRole =
        role === "Tous les rôles" || user.role === role;

      return matchSearch && matchRole;
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      return sortAsc
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">

      {/* HEADER (UNCHANGED) */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-3 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg md:p-2 hover:bg-slate-100 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            <h1 className="text-lg font-bold text-slate-800">
              Membres de l'équipe
            </h1>
          </div>

          <span className="hidden md:block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
            {filteredUsers.length} au total
          </span>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <FaUserPlus className="text-xs" />
          <span className="hidden md:block">Inviter un membre</span>
        </button>
      </header>

      <div className="p-8">

        {/* FILTERS (UNCHANGED UI) */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un nom, email ou rôle..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* FILTER ROLE */}
          <div className="flex items-center gap-3">

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Tous les rôles</option>
              <option value="admin">Admin</option>
              <option value="user">Développeur</option>
              <option value="designer">Designer</option>
            </select>

            {/* SORT */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50"
            >
              <FaArrowDownWideShort />
            </button>

          </div>
        </div>

        {/* TABLE (UNCHANGED DESIGN) */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">

              <thead className="border-b border-slate-100 bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Utilisateur
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dernière activité
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>

            </table>
          </div>

          {/* PAGINATION (UNCHANGED) */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-6 py-4">

            <p className="text-sm text-slate-500">
              Affichage de 1 à 10 sur {filteredUsers.length} utilisateurs
            </p>

            <div className="flex items-center gap-2">

              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Précédent
              </button>

              <button className="rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Suivant
              </button>

            </div>
          </div>

        </div>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </main>
  );
}

/* ================= USER ROW (UNCHANGED DESIGN) ================= */

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const isActive = user.status === "Actif";

  return (
    <tr className="transition hover:bg-slate-50/80">

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            {user.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>

          <div>
            <p className="font-bold text-slate-800">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

        </div>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />

          {user.status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {user.lastActivity}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <FaPenToSquare className="text-slate-400 hover:text-indigo-600" />
          <FaUserSlash className="text-slate-400 hover:text-red-500" />
        </div>
      </td>

    </tr>
  );
};