"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import Modal from "@/components/ui/Modal";
import { useAppContext, Alat } from "@/store/AppContext";
import { Plus, Check, AlertTriangle, CheckCircle2, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminInventarisPage() {
  const { alat, addAlat, editAlat, deleteAlat, peminjaman, kembalikanAlat } = useAppContext();
  
  // MODALS STATE
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<Alat | null>(null);

  // FORM STATES
  const [addFormData, setAddFormData] = useState<Omit<Alat, "id">>({
    nama: "",
    merk: "",
    jumlah: 1,
    kondisi: "Layak",
    keterangan: "",
  });

  const [editFormData, setEditFormData] = useState<Omit<Alat, "id">>({
    nama: "",
    merk: "",
    jumlah: 1,
    kondisi: "Layak",
    keterangan: "",
  });

  // HANDLERS FOR ADDING ALAT
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlat(addFormData);
    setIsAddModalOpen(false);
    setAddFormData({ nama: "", merk: "", jumlah: 1, kondisi: "Layak", keterangan: "" });
  };

  // HANDLERS FOR EDITING ALAT
  const handleOpenEdit = (item: Alat) => {
    setSelectedItem(item);
    setEditFormData({
      nama: item.nama,
      merk: item.merk,
      jumlah: item.jumlah,
      kondisi: item.kondisi,
      keterangan: item.keterangan || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmSaveOpen(true); // Open nested confirmation modal first
  };

  const handleConfirmSave = () => {
    if (selectedItem) {
      editAlat(selectedItem.id, editFormData);
      setIsConfirmSaveOpen(false);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    }
  };

  // HANDLERS FOR DELETING ALAT
  const handleOpenDelete = (item: Alat) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteAlat(selectedItem.id);
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
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
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
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
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">Aksi</th>
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
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-neutral-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors cursor-pointer"
                        title="Edit Data Barang"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(item)}
                        className="p-1.5 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer"
                        title="Hapus Barang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
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

      {/* 1. MODAL TAMBAH BARANG */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Alat Baru">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Barang</label>
              <input
                type="text"
                required
                value={addFormData.nama}
                onChange={(e) => setAddFormData({ ...addFormData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Merk</label>
              <input
                type="text"
                required
                value={addFormData.merk}
                onChange={(e) => setAddFormData({ ...addFormData, merk: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
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
                value={addFormData.jumlah}
                onChange={(e) => setAddFormData({ ...addFormData, jumlah: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kondisi</label>
              <select
                value={addFormData.kondisi}
                onChange={(e) => setAddFormData({ ...addFormData, kondisi: e.target.value as "Layak" | "Tidak Layak" })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
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
              value={addFormData.keterangan}
              onChange={(e) => setAddFormData({ ...addFormData, keterangan: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-colors"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer"
            >
              Simpan Alat
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. MODAL EDIT BARANG */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit Barang: ${selectedItem?.nama}`}>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Barang</label>
              <input
                type="text"
                required
                value={editFormData.nama}
                onChange={(e) => setEditFormData({ ...editFormData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Merk</label>
              <input
                type="text"
                required
                value={editFormData.merk}
                onChange={(e) => setEditFormData({ ...editFormData, merk: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Stok Tersedia</label>
              <input
                type="number"
                min="0"
                required
                value={editFormData.jumlah}
                onChange={(e) => setEditFormData({ ...editFormData, jumlah: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kondisi</label>
              <select
                value={editFormData.kondisi}
                onChange={(e) => setEditFormData({ ...editFormData, kondisi: e.target.value as "Layak" | "Tidak Layak" })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              >
                <option value="Layak">Layak</option>
                <option value="Tidak Layak">Tidak Layak</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Keterangan</label>
            <textarea
              rows={3}
              value={editFormData.keterangan}
              onChange={(e) => setEditFormData({ ...editFormData, keterangan: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-colors"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </Modal>

      {/* 3. MODAL KONFIRMASI SIMPAN PERUBAHAN */}
      <Modal isOpen={isConfirmSaveOpen} onClose={() => setIsConfirmSaveOpen(false)} title="Konfirmasi Perubahan Data">
        <div className="space-y-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-xl text-orange-800 dark:text-orange-400 text-sm leading-relaxed">
            Simpan perubahan data barang <strong className="text-neutral-900 dark:text-white">"{selectedItem?.nama}"</strong>? Pastikan seluruh informasi stok dan kondisi baru sudah diisi dengan benar.
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsConfirmSaveOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmSave}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer font-semibold"
            >
              Ya, Simpan Perubahan
            </button>
          </div>
        </div>
      </Modal>

      {/* 4. MODAL KONFIRMASI HAPUS BARANG */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Hapus Barang">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 animate-pulse">
            <AlertTriangle className="w-5.5 h-5.5 shrink-0 text-red-500 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Peringatan Penghapusan!</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Apakah Anda yakin ingin menghapus barang <strong className="text-neutral-900 dark:text-white">"{selectedItem?.nama}"</strong>? Tindakan ini tidak dapat dibatalkan dan barang akan dihapus permanen dari daftar inventaris MAHAPEKA.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer font-bold shadow-sm shadow-red-500/10"
            >
              Ya, Hapus Permanen
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
