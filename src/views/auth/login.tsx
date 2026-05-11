import { FormEvent, useState } from "react";
import {
    FaCheckDouble,
    FaLock
} from "react-icons/fa";

import { FiMail } from "react-icons/fi";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log({
            email,
            password,
            rememberMe
        });
    }

    return (
        <div className="flex min-h-screen bg-white text-slate-900">

            {/* Left Side */}
            <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:w-[500px] xl:w-[600px]">

                <div className="mx-auto w-full max-w-sm">

                    {/* Logo */}
                    <div className="mb-10 flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-600 p-2 text-white">
                            <FaCheckDouble className="text-xl" />
                        </div>

                        <span className="text-2xl font-bold tracking-tight">
                            adminTask
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Bon retour !
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Veuillez entrer vos identifiants pour accéder à votre espace.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700"
                            >
                                Adresse Email
                            </label>

                            <div className="relative mt-1">

                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiMail />
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@exemple.com"
                                    className="
                                        block w-full rounded-xl border border-slate-200
                                        bg-slate-50 py-3 pl-10 pr-3 text-sm
                                        placeholder-slate-400
                                        transition duration-150 ease-in-out
                                        focus:border-indigo-500
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500
                                    "
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>

                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700"
                                >
                                    Mot de passe
                                </label>

                                <a
                                    href="#"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Oublié ?
                                </a>
                            </div>

                            <div className="relative mt-1">

                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FaLock className="text-sm" />
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="
                                        block w-full rounded-xl border border-slate-200
                                        bg-slate-50 py-3 pl-10 pr-3 text-sm
                                        placeholder-slate-400
                                        transition duration-150 ease-in-out
                                        focus:border-indigo-500
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500
                                    "
                                />
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center">

                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="
                                    h-4 w-4 rounded border-slate-300
                                    text-indigo-600
                                    focus:ring-indigo-500
                                "
                            />

                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-slate-600"
                            >
                                Se souvenir de moi
                            </label>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                className="
                                    flex w-full justify-center rounded-xl
                                    border border-transparent bg-indigo-600
                                    px-4 py-3 text-sm font-bold text-white
                                    shadow-sm transition duration-150 ease-in-out
                                    hover:bg-indigo-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                    focus:ring-offset-2
                                "
                            >
                                Se connecter
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-slate-500">

                        Pas encore de compte ?{" "}

                        <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Contactez l'administrateur
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="relative hidden flex-1 bg-slate-900 lg:block">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-center px-12 text-white">

                    <blockquote className="space-y-4">

                        <p className="text-3xl font-light italic leading-relaxed">
                            "La gestion simplifiée des tâches n'est plus un luxe,
                            c'est le moteur de votre productivité quotidienne."
                        </p>

                        <footer className="mt-4">
                            <p className="text-lg font-semibold">
                                L. Mirindra
                            </p>

                            <p className="text-indigo-400">
                                Lead Developer, adminTask
                            </p>
                        </footer>
                    </blockquote>

                    {/* Task Card */}
                    <div
                        className="
                            mt-12 w-80 rounded-2xl border border-white/20
                            bg-white/10 p-6 backdrop-blur-lg
                        "
                    >

                        <div className="mb-4 flex items-center gap-3">

                            <div className="h-2 w-2 rounded-full bg-green-400" />

                            <span
                                className="
                                    text-xs font-bold uppercase tracking-widest
                                    text-slate-300
                                "
                            >
                                Tâche terminée
                            </span>
                        </div>

                        <p className="text-lg font-medium">
                            Déploiement de la version 2.0
                        </p>

                        <div className="mt-4 flex -space-x-2">

                            <img
                                className="h-8 w-8 rounded-full border-2 border-slate-900"
                                src="https://ui-avatars.com/api/?name=User+1&background=random"
                                alt="User 1"
                            />

                            <img
                                className="h-8 w-8 rounded-full border-2 border-slate-900"
                                src="https://ui-avatars.com/api/?name=User+2&background=random"
                                alt="User 2"
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative circles */}
                <div
                    className="
                        absolute right-0 top-0 -mr-20 -mt-20
                        h-64 w-64 rounded-full
                        bg-indigo-500/20 blur-3xl
                    "
                />

                <div
                    className="
                        absolute bottom-0 left-0 -mb-20 -ml-20
                        h-64 w-64 rounded-full
                        bg-blue-500/20 blur-3xl
                    "
                />
            </div>
        </div>
    );
}