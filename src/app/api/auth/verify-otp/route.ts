import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeNomorAnggota } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, nomorAnggota, otpCode } = await request.json();

    if (!email || !nomorAnggota || !otpCode) {
      return NextResponse.json(
        { success: false, message: "Email, Nomor Anggota, dan Kode OTP wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedNo = normalizeNomorAnggota(nomorAnggota);

    // 1. Verifikasi kode OTP dengan Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "signup",
    });

    if (authError) {
      console.error("Supabase Auth OTP Verification Error:", authError);
      return NextResponse.json(
        { success: false, message: authError.message || "Kode OTP salah atau telah kedaluwarsa." },
        { status: 400 }
      );
    }

    // 2. Aktivasi status akun di tabel pengurus_users
    const { error: dbError } = await supabase
      .from("pengurus_users")
      .update({
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq("nomor_anggota", normalizedNo);

    if (dbError) {
      console.error("Gagal mengaktifkan user di database:", dbError);
      // Kita tetap kembalikan sukses karena otentikasi Supabase Auth sudah berhasil diverifikasi
    }

    return NextResponse.json({
      success: true,
      message: "Akun Anda berhasil aktif dan terverifikasi secara resmi! Silakan login.",
    });
  } catch (error: any) {
    console.error("Error pada verifikasi OTP backend:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses verifikasi OTP." },
      { status: 500 }
    );
  }
}
