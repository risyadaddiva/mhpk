"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        nama: "",
        email: "",
        subjek: "",
        pesan: "",
      });
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1200);
  };

  return (
    <PublicLayout>
      <div className="bg-neutral-50 dark:bg-neutral-950 py-16 transition-colors duration-300 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">Hubungi Kami</h1>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Memiliki pertanyaan mengenai MAHAPEKA Bandung? Hubungi kami langsung melalui kontak di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Info Kontak & Peta */}
            <div className="space-y-8">
              
              {/* Box Info */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Informasi Sekretariat</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-xl shrink-0 mt-1">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">Alamat</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                        Sekretariat MAHAPEKA, Gedung Student Center Lt. 2, UIN Sunan Gunung Djati Bandung, Jl. A.H. Nasution No. 105, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-xl shrink-0 mt-1">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">Telepon / WhatsApp</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <a href="tel:+6282117181984" className="hover:text-orange-500 hover:underline transition-colors font-medium">
                          +62 821-1718-1984
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-xl shrink-0 mt-1">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">E-mail Resmi</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <a href="mailto:mahapekabandung@gmail.com" className="hover:text-orange-500 hover:underline transition-colors font-medium">
                          mahapekabandung@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sosial Media */}
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm mb-3">Sosial Media</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.instagram.com/mahapekabandung" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-all cursor-pointer group"
                    >
                      <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=100089888239266" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-all cursor-pointer group"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                      Facebook
                    </a>
                  </div>
                </div>

              </div>

              {/* Map Iframe */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm h-[320px] relative transition-colors duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5759714856094!2d107.71700687483606!3d-6.94119869305886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c242c2627e77%3A0xb3de4d72af56eddb!2sUIN%20Sunan%20Gunung%20Djati%20Bandung!5e0!3m2!1sid!2sid!4v1716600000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kampus UIN SGD Bandung"
                />
              </div>

            </div>

            {/* Formulir Kontak */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Kirim Pesan</h2>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 rounded-xl flex items-start gap-3 shadow-sm transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Pesan Terkirim!</h4>
                    <p className="text-xs mt-1">Terima kasih telah menghubungi kami. Kami akan merespon pesan Anda secepatnya.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors text-sm"
                    placeholder="Contoh: Muhammad Ricad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors text-sm"
                    placeholder="Contoh: ricad@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Subjek Pesan</label>
                  <input
                    type="text"
                    required
                    value={formData.subjek}
                    onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors text-sm"
                    placeholder="Contoh: Pendaftaran Anggota Baru / Kemitraan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Isi Pesan</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-colors text-sm leading-relaxed"
                    placeholder="Tulis pesan lengkap Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
