"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { useAppContext } from "@/store/AppContext";
import { FileText, Package, RefreshCw, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { berita, alat, peminjaman } = useAppContext();

  const totalBerita = berita.length;
  const totalAlat = alat.reduce((sum, item) => sum + item.jumlah, 0);
  const totalDipinjam = peminjaman.filter((p) => p.status === "Dipinjam").length;
  const alatRusak = alat.filter((item) => item.kondisi === "Tidak Layak").length;

  const stats = [
    { label: "Total Artikel", value: totalBerita, icon: FileText, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Total Inventaris", value: totalAlat, icon: Package, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Sedang Dipinjam", value: totalDipinjam, icon: RefreshCw, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { label: "Alat Tidak Layak", value: alatRusak, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Ringkasan data operasional MAHAPEKA Bandung.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Kustomisasi / Quick Actions Placeholder */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Pengaturan Website (Demo)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Teks Sambutan Beranda
            </label>
            <input
              type="text"
              disabled
              defaultValue="Biarkan kami berkiprah dengan cara kami sendiri."
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed"
            />
            <p className="mt-2 text-xs text-neutral-500">Form ini hanya sebagai ilustrasi UI untuk CMS.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
