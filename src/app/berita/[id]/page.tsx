"use client";

import React, { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { useAppContext } from "@/store/AppContext";
import { Calendar, User, BookOpen, ArrowLeft, Share2, Check, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BeritaDetailPage({ params }: PageProps) {
  const { id } = React.use(params);
  const { berita } = useAppContext();
  const [copied, setCopied] = useState(false);

  // Find current news article
  const item = berita.find((b) => b.id === id);

  if (!item) {
    return notFound();
  }

  // Get other recent news (excluding current one)
  const recentBerita = berita
    .filter((b) => b.id !== id)
    .slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Safe dynamic React renderer for our markdown headings/bold/italic syntax
  const parseContent = (content: string) => {
    if (!content) return null;
    
    // Split by double newlines to split paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    
    return paragraphs.map((para, pIdx) => {
      const trimmedPara = para.trim();
      if (!trimmedPara) return null;

      // Check if it's an H3 heading
      if (trimmedPara.startsWith("###")) {
        const headingText = trimmedPara.replace(/^###\s*/, "").trim();
        return (
          <h3 key={pIdx} className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mt-8 mb-4 tracking-tight">
            {parseInline(headingText)}
          </h3>
        );
      }
      
      // Standard Paragraph
      return (
        <p key={pIdx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg mb-6 text-justify">
          {parseInline(trimmedPara)}
        </p>
      );
    });
  };

  const parseInline = (text: string) => {
    let parts: React.ReactNode[] = [text];
    
    // Parse Bold (**text**)
    let newParts: React.ReactNode[] = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const regex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(part)) !== null) {
          const before = part.substring(lastIndex, match.index);
          if (before) newParts.push(before);
          newParts.push(
            <strong key={`b-${match.index}`} className="font-extrabold text-neutral-900 dark:text-white">
              {match[1]}
            </strong>
          );
          lastIndex = regex.lastIndex;
        }
        const after = part.substring(lastIndex);
        if (after) newParts.push(after);
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
    
    // Parse Italic (*text*)
    newParts = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const regex = /\*(.*?)\*/g;
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(part)) !== null) {
          const before = part.substring(lastIndex, match.index);
          if (before) newParts.push(before);
          newParts.push(
            <em key={`i-${match.index}`} className="italic text-neutral-800 dark:text-neutral-200">
              {match[1]}
            </em>
          );
          lastIndex = regex.lastIndex;
        }
        const after = part.substring(lastIndex);
        if (after) newParts.push(after);
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
    
    // Replace \n within paragraph with <br />
    newParts = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const lines = part.split('\n');
        lines.forEach((line, lIdx) => {
          if (lIdx > 0) newParts.push(<br key={`br-${lIdx}`} />);
          newParts.push(line);
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
    
    return parts;
  };

  return (
    <PublicLayout>
      <div className="bg-neutral-50 dark:bg-neutral-950 py-12 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/berita" 
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <article className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-300">
              
              {/* Cover Image */}
              <div className="h-64 md:h-[400px] w-full relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                {item.gambar ? (
                  <img 
                    src={item.gambar} 
                    alt={item.judul} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
                    <BookOpen className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" />
                    <span className="text-sm font-semibold">MAHAPEKA</span>
                  </div>
                )}
                <div className="absolute top-6 left-6 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-orange-400/25 shadow-sm">
                  {item.kategori}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6 leading-tight">
                  {item.judul}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 pb-6 mb-8 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-500 flex items-center justify-center font-bold text-sm">
                        {item.penulis.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.penulis}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Share Action */}
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 py-1.5 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 text-xs">Link Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs">Bagikan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Article Body */}
                <div className="prose dark:prose-invert max-w-none">
                  {parseContent(item.isi)}
                </div>
              </div>
            </article>

            {/* Sidebar Widget (Other recent news) */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <Clock className="w-4 h-4 text-orange-500" /> Berita Terbaru Lainnya
                </h3>

                {recentBerita.length > 0 ? (
                  <div className="space-y-6">
                    {recentBerita.map((item) => (
                      <Link 
                        key={item.id}
                        href={`/berita/${item.id}`}
                        className="group flex gap-4 items-start"
                      >
                        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
                          {item.gambar ? (
                            <img src={item.gambar} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-50 dark:bg-neutral-950">
                              <BookOpen className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block text-[10px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider mb-1">
                            {item.kategori}
                          </span>
                          <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                            {item.judul}
                          </h4>
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                            {new Date(item.tanggal).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4">
                    Belum ada berita lainnya.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
