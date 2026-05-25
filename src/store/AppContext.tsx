"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Berita {
  id: string;
  judul: string;
  kategori: string;
  isi: string;
  penulis: string;
  tanggal: string;
  gambar?: string;
}

export interface Alat {
  id: string;
  nama: string;
  merk: string;
  jumlah: number;
  kondisi: "Layak" | "Tidak Layak";
  keterangan: string;
}

export interface Peminjaman {
  id: string;
  peminjam: string;
  alatId: string;
  jumlah: number;
  waktuPinjam: string;
  status: "Dipinjam" | "Dikembalikan";
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  berita: Berita[];
  addBerita: (b: Omit<Berita, "id" | "tanggal">) => void;
  editBerita: (id: string, updated: Omit<Berita, "id" | "tanggal">) => void;
  deleteBerita: (id: string) => void;
  alat: Alat[];
  addAlat: (a: Omit<Alat, "id">) => void;
  pinjamAlat: (p: Omit<Peminjaman, "id" | "waktuPinjam" | "status">) => void;
  kembalikanAlat: (peminjamanId: string) => void;
  peminjaman: Peminjaman[];
  categories: string[];
  addCategory: (c: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Dummy Data
const initialBerita: Berita[] = [
  {
    id: "1",
    judul: "Ekspedisi Puncak Cartenz 2026",
    kategori: "Ekspedisi",
    isi: "Anggota MAHAPEKA berhasil mencapai puncak Cartenz setelah 14 hari perjalanan menembus rintangan cuaca ekstrem. Kegiatan ekspedisi ini dipersiapkan selama enam bulan penuh untuk memastikan ketangguhan fisik dan kesiapan mental setiap pendaki...",
    penulis: "Divisi Gunung Hutan",
    tanggal: "2026-05-10",
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
  },
  {
    id: "2",
    judul: "Penanaman 1000 Pohon di Kawasan Kars Citatah",
    kategori: "Konservasi",
    isi: "Sebagai bentuk kepedulian nyata terhadap kelestarian lingkungan dan ekosistem kars, MAHAPEKA mengadakan kegiatan penanaman pohon bersama masyarakat lokal guna menghijaukan kembali area lahan kritis di kawasan Citatah...",
    penulis: "Divisi Susur Goa",
    tanggal: "2026-05-15",
    gambar: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800",
  },
  {
    id: "3",
    judul: "Pelatihan Dasar Anggota Muda",
    kategori: "Kegiatan",
    isi: "Kegiatan rutin tahunan ini dirancang khusus untuk melatih kekuatan fisik, disiplin mental, navigasi darat, serta kekompakan tim bagi calon anggota baru MAHAPEKA agar siap berkiprah di alam bebas...",
    penulis: "Pengurus",
    tanggal: "2026-05-20",
    gambar: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800",
  },
];

const initialAlat: Alat[] = [
  { id: "1", nama: "Tenda Doom", merk: "Eiger", jumlah: 5, kondisi: "Layak", keterangan: "Kapasitas 4 orang" },
  { id: "2", nama: "Carrier 60L", merk: "Consina", jumlah: 10, kondisi: "Layak", keterangan: "Warna campur" },
  { id: "3", nama: "Tali Karmantel", merk: "Beal", jumlah: 3, kondisi: "Layak", keterangan: "Panjang 50m" },
  { id: "4", nama: "Perahu Karet", merk: "Zodiac", jumlah: 1, kondisi: "Tidak Layak", keterangan: "Bocor halus di bagian kiri" },
];

const initialPeminjaman: Peminjaman[] = [
  {
    id: "1",
    peminjam: "Budi (Anggota)",
    alatId: "1",
    jumlah: 1,
    waktuPinjam: "2026-05-20T10:00:00Z",
    status: "Dipinjam",
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [berita, setBerita] = useState<Berita[]>(initialBerita);
  const [alat, setAlat] = useState<Alat[]>(initialAlat);
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>(initialPeminjaman);
  const [categories, setCategories] = useState<string[]>(["Kegiatan", "Ekspedisi", "Konservasi"]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBerita = localStorage.getItem("mhpk_berita");
      const storedAlat = localStorage.getItem("mhpk_alat");
      const storedPeminjaman = localStorage.getItem("mhpk_peminjaman");
      const storedCategories = localStorage.getItem("mhpk_categories");

      if (storedBerita) {
        try {
          setBerita(JSON.parse(storedBerita));
        } catch (e) {
          console.error("Error parsing stored berita:", e);
        }
      }
      if (storedAlat) {
        try {
          setAlat(JSON.parse(storedAlat));
        } catch (e) {
          console.error("Error parsing stored alat:", e);
        }
      }
      if (storedPeminjaman) {
        try {
          setPeminjaman(JSON.parse(storedPeminjaman));
        } catch (e) {
          console.error("Error parsing stored peminjaman:", e);
        }
      }
      if (storedCategories) {
        try {
          setCategories(JSON.parse(storedCategories));
        } catch (e) {
          console.error("Error parsing stored categories:", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mhpk_berita", JSON.stringify(berita));
    }
  }, [berita, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mhpk_alat", JSON.stringify(alat));
    }
  }, [alat, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mhpk_peminjaman", JSON.stringify(peminjaman));
    }
  }, [peminjaman, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mhpk_categories", JSON.stringify(categories));
    }
  }, [categories, isLoaded]);

  const addCategory = (c: string) => {
    const trimmed = c.trim();
    if (trimmed && !categories.some(cat => cat.toLowerCase() === trimmed.toLowerCase())) {
      setCategories([...categories, trimmed]);
    }
  };

  const addBerita = (b: Omit<Berita, "id" | "tanggal">) => {
    const newBerita: Berita = {
      ...b,
      id: Date.now().toString(),
      tanggal: new Date().toISOString().split("T")[0],
    };
    setBerita([newBerita, ...berita]);
  };

  const editBerita = (id: string, updated: Omit<Berita, "id" | "tanggal">) => {
    setBerita(
      berita.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      )
    );
  };

  const deleteBerita = (id: string) => {
    setBerita(berita.filter((item) => item.id !== id));
  };

  const addAlat = (a: Omit<Alat, "id">) => {
    const newAlat: Alat = { ...a, id: Date.now().toString() };
    setAlat([...alat, newAlat]);
  };

  const pinjamAlat = (p: Omit<Peminjaman, "id" | "waktuPinjam" | "status">) => {
    const newPeminjaman: Peminjaman = {
      ...p,
      id: Date.now().toString(),
      waktuPinjam: new Date().toISOString(),
      status: "Dipinjam",
    };

    // Kurangi stok alat
    setAlat(
      alat.map((item) =>
        item.id === p.alatId
          ? { ...item, jumlah: item.jumlah - p.jumlah }
          : item
      )
    );

    setPeminjaman([newPeminjaman, ...peminjaman]);
  };

  const kembalikanAlat = (peminjamanId: string) => {
    const p = peminjaman.find((item) => item.id === peminjamanId);
    if (!p || p.status === "Dikembalikan") return;

    // Tambah stok alat
    setAlat(
      alat.map((item) =>
        item.id === p.alatId
          ? { ...item, jumlah: item.jumlah + p.jumlah }
          : item
      )
    );

    // Update status peminjaman
    setPeminjaman(
      peminjaman.map((item) =>
        item.id === peminjamanId ? { ...item, status: "Dikembalikan" } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        berita,
        addBerita,
        editBerita,
        deleteBerita,
        alat,
        addAlat,
        pinjamAlat,
        kembalikanAlat,
        peminjaman,
        categories,
        addCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
