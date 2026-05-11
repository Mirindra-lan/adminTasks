import { FormEvent, useState } from "react";
import { FaCheckDouble, FaLock, FaShieldAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function RegisterPage() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log({
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            terms
        });
    }

    return (
        <div className="flex min-h-screen bg-white text-slate-900">

            {/* LEFT */}
            <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:w-[550px] xl:w-[650px]">

                <div className="mx-auto w-full max-w-md">

                    {/* Logo */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-600 p-2 text-white">
                            <FaCheckDouble className="text-xl" />
                        </div>
                        <span className="text-2xl font-bold">adminTask</span>
                    </div>

                    <h2 className="text-3xl font-extrabold">
                        Créer un compte
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Rejoignez la plateforme pour gérer vos projets efficacement.
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                        {/* Names */}
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="text-sm font-semibold">Prénom</label>
                                <input
                                    className="mt-1 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold">Nom</label>
                                <input
                                    className="mt-1 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-semibold">Email</label>

                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiMail />
                                </div>

                                <input
                                    type="email"
                                    className="w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    placeholder="nom@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-semibold">Mot de passe</label>

                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FaLock />
                                </div>

                                <input
                                    type="password"
                                    className="w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="text-sm font-semibold">
                                Confirmer le mot de passe
                            </label>

                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FaShieldAlt />
                                </div>

                                <input
                                    type="password"
                                    className="w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">

                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="mt-1 h-4 w-4"
                            />

                            <p className="text-sm text-slate-600">
                                J'accepte les{" "}
                                <a className="text-indigo-600 font-medium">
                                    Conditions d'utilisation
                                </a>{" "}
                                et la{" "}
                                <a className="text-indigo-600 font-medium">
                                    Politique de confidentialité
                                </a>
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                        >
                            Créer mon compte
                        </button>
                    </form>

                    {/* footer */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Déjà membre ?{" "}
                        <a className="font-semibold text-indigo-600">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="relative hidden flex-1 bg-slate-900 lg:block">

                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')] bg-cover opacity-30" />

                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-slate-900/80" />

                <div className="relative flex h-full flex-col justify-end p-16 text-white">

                    <h3 className="mb-4 text-4xl font-bold">
                        Gérez vos équipes comme un pro.
                    </h3>

                    <p className="mb-8 text-slate-300">
                        Centralisez vos tâches et améliorez votre productivité.
                    </p>

                    <div className="flex items-center gap-4">

                        <div className="flex -space-x-3">
                            <img className="h-10 w-10 rounded-full border-2 border-slate-900" src="https://ui-avatars.com/api/?background=6366f1&color=fff" />
                            <img className="h-10 w-10 rounded-full border-2 border-slate-900" src="https://ui-avatars.com/api/?background=ec4899&color=fff" />
                            <img className="h-10 w-10 rounded-full border-2 border-slate-900" src="https://ui-avatars.com/api/?background=10b981&color=fff" />
                        </div>

                        <div>
                            <p className="text-sm font-bold">+500 développeurs</p>
                            <p className="text-xs text-slate-400">utilisent déjà la plateforme</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}