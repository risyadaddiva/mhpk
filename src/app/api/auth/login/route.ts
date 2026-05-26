import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeNomorAnggota } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { nomorAnggota, password } = await request.json();

    if (!nomorAnggota || !password) {
      return NextResponse.json(
        { success: false, message: "Nomor Anggota dan Password wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedNo = normalizeNomorAnggota(nomorAnggota);

    // 1. Ambil email user dari mapping 'pengurus_users'
    const { data: user, error: userError } = await supabase
      .from("pengurus_users")
      .select("id, email, is_active")
      .eq("nomor_anggota", normalizedNo)
      .maybeSingle();

    if (userError || !user) {
      console.warn(`Login gagal: Nomor anggota '${nomorAnggota}' (${normalizedNo}) tidak terdaftar di pengurus.`);
      return NextResponse.json(
        { success: false, message: "Nomor Anggota atau Password salah." },
        { status: 401 }
      );
    }

    // 2. Cek apakah akun pengurus sudah diaktifkan/verifikasi OTP
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: "Akun Anda belum terverifikasi secara resmi. Silakan daftarkan kembali untuk menerima kode OTP email.", isNotActive: true },
        { status: 403 }
      );
    }

    // 3. Masuk dengan Supabase Auth menggunakan email dan password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: password,
    });

    if (authError) {
      console.error("Supabase Auth SignIn Error:", authError);
      return NextResponse.json(
        { success: false, message: "Nomor Anggota atau Password salah." },
        { status: 401 }
      );
    }

    // 4. Ambil profil lengkap dari master 'anggota' untuk di-render di UI
    const { data: member } = await supabase
      .from("anggota")
      .select("nama_anggota, nama_lapangan, nomor_anggota")
      .eq("nomor_anggota_normalized", normalizedNo)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      message: "Login berhasil! Selamat datang kembali.",
      user: {
        id: user.id,
        email: user.email,
        nomor_anggota: member?.nomor_anggota || normalizedNo,
        nomor_anggota_normalized: normalizedNo,
        nama_anggota: member?.nama_anggota || "Pengurus MAHAPEKA",
        nama_lapangan: member?.nama_lapangan || "",
      },
    });
  } catch (error: any) {
    console.error("Error pada login backend:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses login." },
      { status: 500 }
    );
  }
}
