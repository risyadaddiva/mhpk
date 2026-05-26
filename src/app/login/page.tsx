"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/store/AppContext";
import { Mountain, Lock, User, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [nomorAnggota, setNomorAnggota] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useAppContext();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomorAnggota, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal masuk.");
      }

      // Set user session in AppContext
      setUser(data.user);
      setIsLoggedIn(true);
      
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Nomor Anggota atau Password salah.");
    } finally {
      setLoading(false);
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
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Nomor Anggota
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={nomorAnggota}
                  onChange={(e) => setNomorAnggota(e.target.value)}
                  placeholder="Contoh: M2336382CN"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
                <strong>💡 Info Format:</strong> Penggunaan nomor anggota untuk login tanpa titik dan spasi (misal: <code className="font-semibold text-orange-500">M2336382CN</code>).
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Belum memiliki akun pengurus?{" "}
            <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium underline transition-all">
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
