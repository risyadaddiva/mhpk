"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { useState } from "react";
import { useAppContext } from "@/store/AppContext";
import { Calendar, User, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BeritaPage() {
  const { berita, categories } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("Semua");

  const tabs = ["Semua", ...categories];
  
  const stripMarkdown = (text: string) => {
    if (!text) return "";
    return text
      .replace(/^###\s*/gm, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\n+/g, " ");
  };

  const filteredBerita = activeTab === "Semua" 
    ? berita 
    : berita.filter(b => b.kategori.toLowerCase() === activeTab.toLowerCase());

  return (
    <PublicLayout>
      <div className="bg-neutral-50 dark:bg-neutral-950 py-16 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">Berita & Artikel</h1>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Kumpulan cerita, kegiatan, dan catatan ekspedisi dari anggota MAHAPEKA Bandung.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex bg-neutral-200 dark:bg-neutral-900 p-1 rounded-xl whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white dark:bg-neutral-800 text-orange-500 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Berita Grid */}
          {filteredBerita.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBerita.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="flex flex-col group cursor-pointer"
                >
                  <article 
                    className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full group"
                  >
                    <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                      {item.gambar ? (
                        <img 
                          src={item.gambar} 
                          alt={item.judul} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
                          <BookOpen className="w-8 h-8 mb-2 text-neutral-300 dark:text-neutral-700" />
                          <span className="text-xs font-medium">MAHAPEKA</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-orange-400/25 shadow-sm">
                        {item.kategori}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                        {item.judul}
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 text-sm flex-1 leading-relaxed">
                        {stripMarkdown(item.isi)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-orange-500/80" />
                          <span>{item.penulis}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <span>{new Date(item.tanggal).toLocaleDateString("id-ID")}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-neutral-500 dark:text-neutral-400">Belum ada artikel untuk kategori ini.</p>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
