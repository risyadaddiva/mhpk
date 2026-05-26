"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mountain, Lock, Mail, User, ShieldCheck, AlertCircle, ArrowLeft, Loader2, CheckCircle2, HelpCircle } from "lucide-react";

interface MemberInfo {
  nama_anggota: string;
  nama_lapangan: string | null;
  nomor_anggota: string;
  nomor_anggota_normalized: string;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [nomorAnggota, setNomorAnggota] = useState("");
  const [password, setPassword] = useState("");
  
  // States untuk Step Flow & Verifikasi
  const [step, setStep] = useState(1); // 1 = input data, 2 = konfirmasi identitas, 3 = verifikasi OTP, 4 = sukses
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const router = useRouter();

  // Timer countdown untuk OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // STEP 1: Validasi Nomor Anggota di Database
  const handleValidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDebugInfo(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/validate-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nomorAnggota }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.debug) {
          setDebugInfo(data.debug);
        }
        throw new Error(data.message || "Validasi nomor anggota gagal.");
      }

      setMemberInfo(data.member);
      setStep(2); // Lanjut ke halaman konfirmasi nama anggota
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Konfirmasi Nama & Kirim OTP Resmi Supabase
  const handleConfirmAndSendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nomorAnggota, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirimkan kode OTP.");
      }

      setSuccessMsg(data.message);
      setStep(3); // Lanjut ke verifikasi kode OTP
      setCountdown(60); // Batasi resend 1 menit
    } catch (err: any) {
      setError(err.message || "Gagal memproses registrasi awal.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Verifikasi Kode OTP dari Email
  const handleOtpVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nomorAnggota, otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verifikasi kode OTP gagal.");
      }

      setSuccessMsg(data.message);
      setStep(4); // Lanjut ke halaman sukses
    } catch (err: any) {
      setError(err.message || "Gagal memverifikasi OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP resmi melalui auth Supabase
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nomorAnggota, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim kembali OTP.");
      }

      setSuccessMsg("Kode OTP baru berhasil dikirimkan ke email Anda.");
      setCountdown(60);
    } catch (err: any) {
      setError(err.message || "Gagal memproses pengiriman ulang OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[85vh] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8 transition-all duration-300">
          
          {/* STEP 1: Registration Input Form */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Mountain className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Registrasi Pengurus</h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Daftarkan akun Anda dengan data kepengurusan resmi.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                  {debugInfo && (
                    <div className="mt-2 pt-2 border-t border-red-200/50 dark:border-red-800/50 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                      <div>Host DB: <span className="text-red-700 dark:text-red-300 font-bold">{debugInfo.supabaseUrlHost}</span></div>
                      <div>Total Baris di Master: <span className="text-red-700 dark:text-red-300 font-bold">{debugInfo.memberCount}</span></div>
                      {debugInfo.countError && <div className="text-amber-600">Error Count: {debugInfo.countError}</div>}
                      {debugInfo.queryError && <div className="text-amber-600">Error Query: {debugInfo.queryError}</div>}
                      <div>Input Normalisasi: <span className="text-red-700 dark:text-red-300 font-bold">"{debugInfo.normalizedInput}"</span></div>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleValidateSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="pengurus@mahapeka.org"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Nomor Anggota
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      value={nomorAnggota}
                      onChange={(e) => setNomorAnggota(e.target.value)}
                      placeholder="M. 23 36 045 .CE"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-neutral-500">
                    Masukkan nomor anggota lengkap Anda sesuai database (dapat menggunakan spasi dan titik).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                  Mulai Pendaftaran
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                Sudah memiliki akun pengurus?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium underline transition-all">
                  Masuk di sini
                </Link>
              </div>
            </>
          )}

          {/* STEP 2: Identity Confirmation Screen */}
          {step === 2 && memberInfo && (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Ubah Data
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Konfirmasi Data</h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Untuk menghindari kesalahan penginputan Nomor Anggota, mohon konfirmasi identitas Anda di bawah ini.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-4 mb-6">
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">Nama Anggota</span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">{memberInfo.nama_anggota}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">Nama Lapangan</span>
                  <span className="text-lg font-bold text-orange-500">{memberInfo.nama_lapangan || "-"}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">Nomor Anggota Resmi</span>
                  <span className="text-sm font-mono text-neutral-600 dark:text-neutral-300">{memberInfo.nomor_anggota}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmAndSendOtp}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                  Ya, Benar. Kirim OTP ke Email
                </button>

                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="w-full bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Bukan Data Saya, Ganti Nomor
                </button>
              </div>
            </>
          )}

          {/* STEP 3: OTP Verification Form */}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Konfirmasi
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <ShieldCheck className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Verifikasi OTP</h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Masukkan 6 digit kode OTP resmi yang telah dikirimkan ke <strong className="text-neutral-900 dark:text-white">{email}</strong>.
                </p>
              </div>

              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleOtpVerifySubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 text-center">
                    Kode OTP Supabase
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full text-center px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white text-3xl font-mono tracking-[0.5em] focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                  Verifikasi Akun Saya
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                Tidak menerima kode OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || loading}
                  className={`font-semibold underline transition-all ${
                    countdown > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-orange-500 hover:text-orange-600 cursor-pointer"
                  }`}
                >
                  {countdown > 0 ? `Kirim Ulang OTP (${countdown}s)` : "Kirim Ulang OTP"}
                </button>
              </div>
            </>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Aktivasi Sukses!</h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                Akun pengurus Anda berhasil diaktifkan secara resmi. Sekarang Anda dapat masuk untuk mengelola portal operasional.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Masuk ke Portal Pengurus
              </button>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
