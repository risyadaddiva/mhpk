"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/store/AppContext";
import { Mountain, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAppContext();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simulasi Login (menerima input apa saja asalkan tidak kosong)
    if (email && password) {
      setIsLoggedIn(true);
      router.push("/admin");
    } else {
      setError("Email dan Password harus diisi.");
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mountain className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Portal Pengurus</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Silakan login untuk mengakses halaman admin.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mahapeka.org"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20"
            >
              <Lock className="w-5 h-5" />
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <p><strong>Catatan Demo:</strong> Masukkan email dan password apa saja untuk simulasi login.</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
