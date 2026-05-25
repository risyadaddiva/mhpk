"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { useAppContext } from "@/store/AppContext";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AdminPeminjamanPage() {
  const { alat, peminjaman, pinjamAlat, kembalikanAlat } = useAppContext();
  
  const [formData, setFormData] = useState({
    peminjam: "",
    alatId: "",
    jumlah: 1,
  });

  const alatTersedia = alat.filter((a) => a.kondisi === "Layak" && a.jumlah > 0);

  const handlePinjam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.alatId) {
      alert("Pilih alat terlebih dahulu");
      return;
    }

    const selectedAlat = alat.find((a) => a.id === formData.alatId);
    if (selectedAlat && formData.jumlah > selectedAlat.jumlah) {
      alert("Jumlah pinjam melebihi stok yang tersedia");
      return;
    }

    pinjamAlat(formData);
    setFormData({ peminjam: "", alatId: "", jumlah: 1 });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Peminjaman & Pengembalian</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Kelola sirkulasi peminjaman peralatan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Peminjaman */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Form Pinjam Alat</h2>
            <form onSubmit={handlePinjam} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama / Organisasi Peminjam
                </label>
                <input
                  type="text"
                  required
                  value={formData.peminjam}
                  onChange={(e) => setFormData({ ...formData, peminjam: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Misal: UKM Pecinta Alam XYZ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Pilih Alat
                </label>
                <select
                  required
                  value={formData.alatId}
                  onChange={(e) => setFormData({ ...formData, alatId: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="" disabled>-- Pilih Alat Tersedia --</option>
                  {alatTersedia.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama} - {item.merk} (Stok: {item.jumlah})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Jumlah
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.jumlah}
                  onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Send className="w-4 h-4" />
                Proses Pinjam
              </button>
            </form>
          </div>
        </div>

        {/* Tabel Daftar Peminjaman */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Daftar Peminjaman Berjalan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Peminjam</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Alat</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Jumlah</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {peminjaman.map((p) => {
                    const alatInfo = alat.find(a => a.id === p.alatId);
                    return (
                      <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-neutral-900 dark:text-white font-medium">{p.peminjam}</td>
                        <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">
                          {alatInfo ? alatInfo.nama : "Alat Dihapus"}
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">{p.jumlah}</td>
                        <td className="py-3 px-4">
                          {p.status === "Dipinjam" ? (
                            <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                              Sedang Dipinjam
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                              Dikembalikan
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {p.status === "Dipinjam" && (
                            <button
                              onClick={() => kembalikanAlat(p.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Kembalikan
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {peminjaman.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
                        Belum ada riwayat peminjaman.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
