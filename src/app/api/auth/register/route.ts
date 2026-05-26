import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeNomorAnggota } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, nomorAnggota, password } = await request.json();

    if (!email || !nomorAnggota || !password) {
      return NextResponse.json(
        { success: false, message: "Semua data (Email, Nomor Anggota, Password) wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedNo = normalizeNomorAnggota(nomorAnggota);

    // 1. Daftarkan user ke Supabase Auth
    // Ini secara otomatis memicu pengiriman email konfirmasi/OTP dari Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/login`,
        data: {
          nomor_anggota: normalizedNo,
        },
      },
    });

    if (authError) {
      console.error("Supabase Auth SignUp error:", authError);
      return NextResponse.json(
        { success: false, message: authError.message || "Gagal mendaftarkan akun di sistem otentikasi." },
        { status: 400 }
      );
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Sistem gagal mengalokasikan ID pengguna baru." },
        { status: 500 }
      );
    }

    // 2. Catat/Upsert mapping Nomor Anggota ke tabel pengurus_users
    const { error: dbError } = await supabase
      .from("pengurus_users")
      .upsert(
        {
          id: userId,
          email: email,
          nomor_anggota: normalizedNo,
          is_active: false, // Menunggu konfirmasi OTP/Email
          updated_at: new Date().toISOString(),
        },
        { onConflict: "nomor_anggota" }
      );

    if (dbError) {
      console.error("Gagal menyimpan data ke pengurus_users:", dbError);
      return NextResponse.json(
        { success: false, message: "Gagal menyimpan detail profil kepengurusan di database." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pendaftaran awal sukses! Kode verifikasi OTP telah dikirimkan ke email Anda dari Supabase.",
    });
  } catch (error: any) {
    console.error("Error pada registrasi backend:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat mendaftarkan akun." },
      { status: 500 }
    );
  }
}
