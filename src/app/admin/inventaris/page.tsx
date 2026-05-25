"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import Modal from "@/components/ui/Modal";
import { useAppContext, Alat } from "@/store/AppContext";
import { Plus, Check, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AdminInventarisPage() {
  const { alat, addAlat, peminjaman, kembalikanAlat } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Alat, "id">>({
    nama: "",
    merk: "",
    jumlah: 1,
    kondisi: "Layak",
    keterangan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlat(formData);
    setIsModalOpen(false);
    setFormData({ nama: "", merk: "", jumlah: 1, kondisi: "Layak", keterangan: "" });
  };

  const activePeminjaman = peminjaman.filter((p) => p.status === "Dipinjam");

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Inventaris Alat</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Manajemen data peralatan dan perlengkapan.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Alat
        </button>
      </div>

      {/* Tabel Inventaris */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Nama Barang</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Merk</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Stok Tersedia</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Kondisi</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {alat.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{item.nama}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">{item.merk}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{item.jumlah}</span>
                  </td>
                  <td className="py-4 px-6">
                    {item.kondisi === "Layak" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        <Check className="w-3.5 h-3.5" /> Layak
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5" /> Tidak Layak
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">
                    {item.keterangan || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seksi Peminjaman Terbuka */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Daftar Barang Sedang Dipinjam</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">Daftar peminjaman aktif yang belum dikembalikan.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Peminjam</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Nama Barang</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Jumlah</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Waktu Pinjam</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {activePeminjaman.map((p) => {
                const itemAlat = alat.find((a) => a.id === p.alatId);
                return (
                  <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">
                          {p.peminjam.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">{p.peminjam}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">
                      {itemAlat ? itemAlat.nama : "Alat Dihapus"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{p.jumlah}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">
                      {new Date(p.waktuPinjam).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Konfirmasi pengembalian ${p.jumlah} unit ${itemAlat?.nama || 'alat'} oleh ${p.peminjam}?`)) {
                            kembalikanAlat(p.id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kembalikan
                      </button>
                    </td>
                  </tr>
                );
              })}
              {activePeminjaman.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
                    Tidak ada barang yang sedang dipinjam saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Alat */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Alat Baru">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Barang</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Merk</label>
              <input
                type="text"
                required
                value={formData.merk}
                onChange={(e) => setFormData({ ...formData, merk: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Jumlah</label>
              <input
                type="number"
                min="1"
                required
                value={formData.jumlah}
                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kondisi</label>
              <select
                value={formData.kondisi}
                onChange={(e) => setFormData({ ...formData, kondisi: e.target.value as "Layak" | "Tidak Layak" })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="Layak">Layak</option>
                <option value="Tidak Layak">Tidak Layak</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Keterangan (Opsional)</label>
            <textarea
              rows={3}
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
            >
              Simpan Alat
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
