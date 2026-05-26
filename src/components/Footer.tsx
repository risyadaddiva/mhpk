import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/images/MHPK logo tok.png" alt="Logo MAHAPEKA" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white">
                MAHAPEKA<span className="text-orange-500">BDG</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6">
              Mahasiswa Pencinta Alam Kelestarian Bandung. "Biarkan kami berkiprah dengan cara kami sendiri".
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/mahapekabandung" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100089888239266" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@mahapekauinsgdbandung1547"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-orange-500 transition-colors"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.98 4 12 4 12 4s-6.98 0-8.6.64a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12c0 1.76.3 3.44.86 5a2.78 2.78 0 0 0 1.94 2c1.62.64 8.6.64 8.6.64s6.98 0 8.6-.64a2.78 2.78 0 0 0 1.94-2c.56-1.56.86-3.24.86-5a29 29 0 0 0-.86-5Z"/>
                  <polygon points="10 15 16 12 10 9 10 15"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@mahapekabandung"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-orange-500 transition-colors"
                aria-label="Tiktok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Divisi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/divisi" className="hover:text-orange-500 transition-colors">Gunung Hutan</Link></li>
              <li><Link href="/divisi" className="hover:text-orange-500 transition-colors">Susur Goa</Link></li>
              <li><Link href="/divisi" className="hover:text-orange-500 transition-colors">Panjat Tebing</Link></li>
              <li><Link href="/divisi" className="hover:text-orange-500 transition-colors">ORAD</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profil" className="hover:text-orange-500 transition-colors">Sejarah</Link></li>
              <li><Link href="/berita" className="hover:text-orange-500 transition-colors">Berita Terkini</Link></li>
              <li><Link href="/login" className="hover:text-orange-500 transition-colors">Portal Pengurus</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
                <span>
                  <a href="https://maps.app.goo.gl/JvfQ8b6mf4AX2JKi8" className="hover:text-orange-500 transition-colors">Sekretariat MAHAPEKA, Gedung Student Center Lt. 2, UIN SGD Bandung, Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung, Jawa Barat 40614</a>
                  </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <a href="https://wa.me/6283876318926" className="hover:text-orange-500 transition-colors">0838-7631-8926</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <a href="mailto:mahapekabandung@gmail.com" className="hover:text-orange-500 transition-colors">mahapekabandung@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} MAHAPEKA Bandung. Hak Cipta Dilindungi.</p>
          <p className="text-xs text-neutral-500">
            Made with passion by <span className="text-orange-500 italic font-semibold">Wanderlust</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
