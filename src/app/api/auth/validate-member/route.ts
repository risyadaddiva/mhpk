import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseUrl } from "@/lib/supabase";
import { normalizeNomorAnggota } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, nomorAnggota } = await request.json();

    if (!email || !nomorAnggota) {
      return NextResponse.json(
        { success: false, message: "Email dan Nomor Anggota wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedNo = normalizeNomorAnggota(nomorAnggota);

    // DIAGNOSTIC CHECK: Cek jumlah baris di tabel 'anggota' untuk melacak isu RLS atau tabel kosong
    const { count: memberCount, error: countError } = await supabase
      .from("anggota")
      .select("*", { count: "exact", head: true });
    
    console.log(`\n=== [DIAGNOSTIC LOG] ===`);
    console.log(`Memvalidasi nomor: ${nomorAnggota} -> Ter-normalisasi: ${normalizedNo}`);
    console.log(`Total baris di tabel 'anggota': ${memberCount}`);
    if (countError) {
      console.error(`Error mengambil jumlah baris:`, countError);
    }
    console.log(`========================\n`);

    // 1. Validasi apakah nomor anggota ada di master database 'anggota'
    const { data: member, error: memberError } = await supabase
      .from("anggota")
      .select("nama_anggota, nama_lapangan, nomor_anggota")
      .eq("nomor_anggota_normalized", normalizedNo)
      .maybeSingle();

    if (memberError || !member) {
      console.warn(`Validasi gagal: Nomor anggota '${nomorAnggota}' (${normalizedNo}) tidak ditemukan di master.`);
      
      let dbHost = "unknown";
      try {
        if (supabaseUrl) {
          const url = new URL(supabaseUrl);
          dbHost = url.hostname;
        }
      } catch (e) {}

      return NextResponse.json(
        { 
          success: false, 
          message: "Nomor Anggota tidak terdaftar di database master MAHAPEKA.",
          debug: {
            supabaseUrlHost: dbHost,
            memberCount: memberCount ?? 0,
            countError: countError ? countError.message : null,
            queryError: memberError ? memberError.message : null,
            normalizedInput: normalizedNo
          }
        },
        { status: 404 }
      );
    }

    // 2. Periksa apakah sudah terdaftar dan aktif di 'pengurus_users'
    const { data: existingUser } = await supabase
      .from("pengurus_users")
      .select("email, is_active")
      .eq("nomor_anggota", normalizedNo)
      .maybeSingle();

    if (existingUser && existingUser.is_active) {
      return NextResponse.json(
        { success: false, message: "Nomor Anggota ini sudah terdaftar dan aktif. Silakan login." },
        { status: 400 }
      );
    }

    // Periksa juga apakah email sudah digunakan oleh akun lain yang aktif
    const { data: existingEmailUser } = await supabase
      .from("pengurus_users")
      .select("nomor_anggota, is_active")
      .eq("email", email)
      .maybeSingle();

    if (existingEmailUser && existingEmailUser.is_active) {
      return NextResponse.json(
        { success: false, message: "Alamat email ini sudah digunakan oleh akun lain yang aktif." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      member: {
        nama_anggota: member.nama_anggota,
        nama_lapangan: member.nama_lapangan,
        nomor_anggota: member.nomor_anggota,
        nomor_anggota_normalized: normalizedNo,
      },
    });
  } catch (error: any) {
    console.error("Error pada validasi anggota:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses validasi data." },
      { status: 500 }
    );
  }
}
