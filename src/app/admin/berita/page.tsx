"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import Modal from "@/components/ui/Modal";
import { useAppContext, Berita } from "@/store/AppContext";
import { Plus, Edit, Trash2, Image as ImageIcon, Upload, Link as LinkIcon, X, Heading, Bold, Italic } from "lucide-react";
import { useState } from "react";

export default function AdminBeritaPage() {
  const { berita, addBerita, editBerita, deleteBerita, categories, addCategory } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Dynamic Category state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");

  // Form states
  const [formData, setFormData] = useState<Omit<Berita, "id" | "tanggal">>({
    judul: "",
    kategori: "Kegiatan",
    isi: "",
    penulis: "Admin",
    gambar: "",
  });

  // Image source mode: "upload" | "url"
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");

  const resetForm = () => {
    setFormData({
      judul: "",
      kategori: categories[0] || "Kegiatan",
      isi: "",
      penulis: "Admin",
      gambar: "",
    });
    setEditingId(null);
    setIsAddingCategory(false);
    setNewCatInput("");
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Berita) => {
    setEditingId(item.id);
    setFormData({
      judul: item.judul,
      kategori: item.kategori,
      isi: item.isi,
      penulis: item.penulis,
      gambar: item.gambar || "",
    });
    // Detect if image is Base64 data URL or typical web URL
    if (item.gambar && (item.gambar.startsWith("http://") || item.gambar.startsWith("https://"))) {
      setImageMode("url");
    } else {
      setImageMode("upload");
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, judul: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus berita "${judul}"?`)) {
      deleteBerita(id);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, gambar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed) return;
    addCategory(trimmed);
    setFormData((prev) => ({ ...prev, kategori: trimmed }));
    setNewCatInput("");
    setIsAddingCategory(false);
  };

  const insertFormat = (formatType: "sub" | "bold" | "italic") => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = "";
    if (formatType === "sub") {
      replacement = `\n### ${selectedText || "Subjudul"}\n`;
    } else if (formatType === "bold") {
      replacement = `**${selectedText || "Tebal"}**`;
    } else if (formatType === "italic") {
      replacement = `*${selectedText || "Miring"}*`;
    }

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setFormData((prev) => ({ ...prev, isi: newValue }));

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      editBerita(editingId, formData);
    } else {
      addBerita(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Kelola Berita & Artikel</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Manajemen konten berita, ekspedisi, dan pengumuman.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Berita
        </button>
      </div>

      {/* Tabel Berita */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Gambar</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Judul Artikel</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Kategori</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Penulis</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Tanggal</th>
                <th className="py-4 px-6 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {berita.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                      {item.gambar ? (
                        <img src={item.gambar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">{item.judul}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-500/20">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">{item.penulis}</td>
                  <td className="py-4 px-6 text-sm text-neutral-600 dark:text-neutral-400">
                    {new Date(item.tanggal).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-neutral-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="Edit Berita"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.judul)}
                        className="p-1.5 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {berita.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
                    Belum ada berita yang diterbitkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah/Edit Berita */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Edit Berita/Artikel" : "Tambah Berita Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Judul Berita</label>
            <input
              type="text"
              required
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              placeholder="Contoh: Ekspedisi Gunung Slamet"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kategori</label>
              <div className="flex gap-2">
                {!isAddingCategory ? (
                  <>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(true)}
                      className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm transition-colors border border-neutral-200 dark:border-neutral-700"
                      title="Tambah Kategori Baru"
                    >
                      + Baru
                    </button>
                  </>
                ) : (
                  <div className="flex gap-1.5 flex-1 items-center">
                    <input
                      type="text"
                      value={newCatInput}
                      onChange={(e) => setNewCatInput(e.target.value)}
                      placeholder="Nama Kategori"
                      className="flex-1 px-2.5 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(false)}
                      className="p-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Penulis */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Penulis</label>
              <input
                type="text"
                required
                value={formData.penulis}
                onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
          </div>

          {/* Media Gambar */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-neutral-950/20">
            <div className="flex items-center justify-between mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Gambar Cover</span>
              <div className="flex gap-1.5 p-0.5 bg-neutral-200 dark:bg-neutral-900 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    imageMode === "upload"
                      ? "bg-white dark:bg-neutral-800 text-orange-500 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <Upload className="w-3 h-3 inline mr-1" /> Unggah
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    imageMode === "url"
                      ? "bg-white dark:bg-neutral-800 text-orange-500 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <LinkIcon className="w-3 h-3 inline mr-1" /> Link URL
                </button>
              </div>
            </div>

            {imageMode === "upload" ? (
              <div>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload className="w-6 h-6 text-neutral-400 mb-1" />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Pilih berkas gambar local</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={formData.gambar}
                  onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none text-xs transition-colors"
                />
              </div>
            )}

            {/* Preview Gambar */}
            {formData.gambar && (
              <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <img src={formData.gambar} alt="Cover Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gambar: "" })}
                  className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                  title="Hapus Gambar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Isi Artikel</label>
              <div className="flex gap-1.5 bg-neutral-100 dark:bg-neutral-950 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => insertFormat("sub")}
                  className="p-1.5 hover:bg-white dark:hover:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                  title="Subjudul (###)"
                >
                  <Heading className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("bold")}
                  className="p-1.5 hover:bg-white dark:hover:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                  title="Teks Tebal (**teks**)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("italic")}
                  className="p-1.5 hover:bg-white dark:hover:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                  title="Teks Miring (*teks*)"
                >
                  <Italic className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              id="content-textarea"
              required
              rows={8}
              value={formData.isi}
              onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-colors font-sans text-sm leading-relaxed"
              placeholder="Tulis detail artikel/berita di sini... Gunakan tombol di atas untuk menyisipkan Subjudul, Tebal, atau Miring."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
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
              {editingId ? "Simpan Perubahan" : "Simpan Berita"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
